const config=require('config');
const con=require('../startup/db');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const express=require('express');
const _=require('lodash');
const  router=express.Router();
const genrateToken=require('../helper/auth');
const validation=require('../validation/registrationValidation');
const {OTPsend}=require('../helper/sendEmail');
const { error, log } = require('winston');
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config2 = require("../utils/config");
const logger = require('../loggers/logger');
let otp =Math.floor(Math.random() *100000+1);


//Registration
module.exports.registration=async (req,res,next)=>{
    const {error}=validation.registrationValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    if(!req.file)
    {
        return res.status(400).send('profile pic is require..');
    }
    try
    {
    con.query(`SELECT * FROM registration WHERE email=?`,[req.body.email],async(error,result)=>{
        if(result.length>0)
        {
            await next(
                new GeneralError(
                    "User email already exist",
                    undefined,
                )
            );
        }
        if(result.length==0)
        {
            const salt=await bcrypt.genSalt(10);
    const name=req.body.name;
    const email=req.body.email;
    const address=req.body.address;
    const hobbies=req.body.hobbies.map((hobbies)=>hobbies);
    const gender=req.body.gender;
    const password=await bcrypt.hash(req.body.password,salt); 
    const image=req.file.filename;
    const insert_query=`INSERT INTO registration (name,profilepic,email,address,hobbies,gender,password) VALUES ("${name}","${image}","${email}","${address}","${hobbies}","${gender}","${password}")`;
    con.query(insert_query,async(error,result) => {
        if (error) {
            res.send("Error",error);
        } else {
            await next(
                new GeneralResponse(
                    req.body.name + " Successfully Registered....",
                    undefined,
                    config.HTTP_CREATED
                )
            );
        }
    });
        }
    });
}
catch(err) {
    logger.error("err", err)
}
}

//Login
module.exports.login=async(req,res,next)=>{
    const {error}=validation.loginValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    try
    {
    const email=req.body.email;
    const password=req.body.password;
    const login_query=`SELECT * FROM registration WHERE email=?`;
    con.query(login_query,[email],async(error,result)=>{
        if(error)
        {
            await next(
                new GeneralError(
                    "Email and Password Incorrect...",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
        else
        {
            if(result.length==0)
            {
                await next(
                    new GeneralError(
                        "Email and Password Incorrect...",
                        undefined,
                        config.HTTP_ACCEPTED
                    )
                ); 
            }
            if(result.length>0)
            {
                const validPassword=await bcrypt.compare(password,result[0].password);
                if(validPassword)
                {
                    const token=res.middlewareData;
                    res.header('x-auth-token',token).send(token);


                }
                else
                {
                    await next(
                        new GeneralError(
                            "Email and Password Incorrect...",
                            undefined,
                            config.HTTP_ACCEPTED
                        )
                    ); 
                }
            }
            else
            {
                await next(
                    new GeneralError(
                        "Email and Password Incorrect...",
                        undefined,
                        config.HTTP_ACCEPTED
                    )
                );
            }
        }
    });
}
catch(err) {
    logger.error("err", err)
}
}

//Update Profile
module.exports.updateprofile=async(req,res,next)=>{
    const token_email=req.user.email;
    
    con.query(`SELECT * FROM registration WHERE email=?`,[token_email],async(error,result)=>{
        if(result.length>0)
        {
            const {error}=validation.updateProfileValidation(req.body);
            if(error) 
            {
                return res.status(400).send(error.details[0].message);
            }
        
        const name=req.body.name;
        const email=req.body.email;
        const address=req.body.address;
        const hobbies=req.body.hobbies;
        const gender=req.body.gender;
        const image=req.file.filename;
        const update_query=`UPDATE registration SET name=?,address=?,profilepic=?,email=?,hobbies=?,gender=? where email=?`;
        
        con.query(update_query,[name,address,image,email,hobbies,gender,token_email],async(err,result2)=>{
            if(result2)
            {
             
                await next(
                    new GeneralResponse(
                        "User Updated...",
                        undefined,
                        config.HTTP_CREATED
                    )
                );
            }
            else
            {
                await next(
                    new GeneralError(
                        "User not found.....",
                        undefined,
                        config.HTTP_ACCEPTED
                    )
                );
            }
        });
        }
        else
        {
            await next(
                new GeneralError(
                    "User not found.....",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
    });
}

//viewProfile
module.exports.viewprofile=async(req,res,next)=>{
   
    const viewprofile_query=`SELECT * FROM registration WHERE email=?`;
    con.query(viewprofile_query,[req.user.email],async(error,result)=>{
        if (result) {
            return res.send(result);
        } else {
            
            await next(
                new GeneralError(
                    "ViewProfile is Not Showing...",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
    });
}

//Reset password
module.exports.resetpassword=async(req,res,next)=>{
    const token_email=req.user.email;
    const salt=await bcrypt.genSalt(10);
    con.query(`SELECT * FROM registration WHERE email=?`,[token_email],async(error,result)=>{
        if(result.length>0)
        {
            const {error}=validation.resetpasswordValidation(req.body);
            if(error) 
            {
                return res.status(400).send(error.details[0].message);
            }
            const oldpassword=req.body.oldpassword;
            const validPassword=await bcrypt.compare(oldpassword,result[0].password);
            if(validPassword)
            {
                con.query(`SELECT * FROM registration WHERE email=? AND password=?`,[token_email,result[0].password],async(error,result1)=>{
                if(result1.length>0)
                {
                 
                    const newpassword=req.body.newpassword;
                    const new_password=await bcrypt.hash(newpassword,salt); 
                    const update_password=`UPDATE registration SET password='${new_password}' where email='${token_email}'`;
                    con.query(update_password,async(error,result2)=>{

                        if(result2)
                        {
                            
                            await next(
                                new GeneralResponse(
                                    "Your Password has been Reset...",
                                    undefined,
                                    config.HTTP_CREATED
                                )
                            ); 
                        }
                      
                    });

                }
                else
                {
                    await next(
                        new GeneralError(
                            "Current Password is incorrect!",
                            undefined,
                            config.HTTP_ACCEPTED
                        )
                    );
                }
            });
        }
        else{
            await next(
                new GeneralError(
                    "Enter valid Password is incorrect!",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
    }
    });
}

//forgot password
module.exports.forgotpassword=async(req,res,next)=>{
    const {error}=validation.forgotpassword(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const viewprofile_query=`SELECT * FROM registration WHERE email=?`;
    con.query(viewprofile_query,[req.body.email],async(error,result)=>{
        if (result.length>0) {
            const sentMsg=await OTPsend(req.body.email, otp);
            await next(
                new GeneralResponse(
                    "OTP send to ..."+req.body.email,
                    undefined,
                    config.HTTP_CREATED
                )
            );
        } else {
            
            await next(
                new GeneralError(
                    "Email not found..!",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
    });
}

//set new password
module.exports.setnewpassword=async(req,res,next)=>{
    
        const {error}=validation.newPasswordValidation(req.body);
        if(error) 
        {
            return res.status(400).send(error.details[0].message);
        }
        if(req.body.otp==otp)
        {
        if(req.body.newpassword!=req.body.confirmpassword)
        {
            await next(
                new GeneralError(
                    "Password and confirm password should be same..!",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
        else
        {
            const salt=await bcrypt.genSalt(10);
            req.body.newpassword=await bcrypt.hash(req.body.newpassword,salt);
            const set_password_query=`UPDATE registration SET password=? WHERE email=?`;
            con.query(set_password_query,[req.body.newpassword,req.params.email],async(error,result)=>{
        if (result) 
        {
            
            return res.status(200).send('password updated.. ');
        }
        else
        {
            await next(
                new GeneralError(
                    "Password not updated..!",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
            
        }
    });
        }
    }
    else
    {
        await next(
            new GeneralError(
                "Incorrect OTP..!",
                undefined,
                config.HTTP_ACCEPTED
            )
        );
    }
}
