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
const e = require('express');
let otp =Math.floor(Math.random() *100000+1);


//Registration
module.exports.registration=async (req,res)=>{
    let count=0;
    const {error}=validation.registrationValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    if(!req.file)
    {
        return res.status(400).send('profile pic is require..');
    }
    con.query(`SELECT * FROM registration WHERE email=?`,[req.body.email],(error,result)=>{
        if(result.length>0)
        {
            return res.status(400).send('Email already exixts....');
        }
    });
    
    const salt=await bcrypt.genSalt(10);
    const name=req.body.name;
    const email=req.body.email;
    const address=req.body.address;
    const hobbies=req.body.hobbies;
    const gender=req.body.gender;
    const password=await bcrypt.hash(req.body.password,salt); 
    const image=req.file.filename;

    const insert_query=`INSERT INTO registration (name,profilepic,email,address,hobbies,gender,password) VALUES ("${name}","${image}","${email}","${address}","${hobbies}","${gender}","${password}")`;
    con.query(insert_query,(error,result) => {
        if (error) {
            res.send("Error",error);
        } else {
            
             res.send('registration');
        }
    });
}

//Login
module.exports.login=async(req,res)=>{
    
    const {error}=validation.loginValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const email=req.body.email;
    const password=req.body.password;
    const login_query=`SELECT * FROM registration WHERE email=?`;
    con.query(login_query,[email],async(error,result)=>{
        if(error)
        {
            res.status(400).send("Enter valid email or password");
        }
        else
        {
            if(result.length==0)
            {
                res.send("Enter Valid email and password");
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
                    return res.status(400).send('Email and password does not match..');
                }

                
            }
            else
            {
                return res.status(400).send('Email and password does not match..');
            }
        }
    });
}

//Update Profile
module.exports.updateprofile=async(req,res)=>{
    const token_email=req.user.email;

    con.query(`SELECT * FROM registration WHERE email=?`,[token_email],(error,result)=>{
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
        
        con.query(update_query,[name,address,image,email,hobbies,gender,token_email],(err,result)=>{
            if(result)
            {
                res.status(200).send('updated..');
            }
            else
            {
                res.status(400).send('profile not updated..');
            }
        });

            
        }
        else
        {
            res.status(400).send('profile not updated..');
        }
    });
   
    

            
}

//viewProfile
module.exports.viewprofile=async(req,res)=>{
   
    const viewprofile_query=`SELECT * FROM registration WHERE email=?`;
    con.query(viewprofile_query,[req.user.email],(error,result)=>{
        if (result) {
            return res.send(result);
        } else {
            
            return res.send(error);
        }
    });
}

//Reset password
module.exports.resetpassword=async(req,res)=>{
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
            console.log(oldpassword);
            const validPassword=await bcrypt.compare(oldpassword,result[0].password);
            console.log(validPassword);
        if(validPassword)
        {
            con.query(`SELECT * FROM registration WHERE email=? AND password=?`,[token_email,result[0].password],async(error,result1)=>{
                if(result1.length>0)
                {
                    console.log('hi');
                    const newpassword=req.body.newpassword;
                    
                    
                    const new_password=await bcrypt.hash(newpassword,salt); 
                    const update_password=`UPDATE registration SET password='${new_password}' where email='${token_email}'`;
                    console.log(update_password);
                    con.query(update_password,(error,result2)=>{

                        if(result2)
                        {
                            
                            return res.status(200).send('password updated..');  
                        }
                      
                    });

                }
                else
                {
                    return res.status(400).send('Enter correct ord');
                }
            });
        }
        else{
            res.status(400).send('Enter correct oldpassword');
        }
    }
    });
}

//forgot password
module.exports.forgotpassword=async(req,res)=>{
    const {error}=validation.forgotpassword(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const viewprofile_query=`SELECT * FROM registration WHERE email=?`;
    con.query(viewprofile_query,[req.body.email],async(error,result)=>{
        if (result) {
            const sentMsg=await OTPsend(req.body.email, otp);
            return res.status(200).send('OTP send to ');
        } else {
            
            return res.send(error);
        }
    });
}

//set new password
module.exports.setnewpassword=async(req,res)=>{
    
        const {error}=validation.newPasswordValidation(req.body);
        if(error) 
        {
            return res.status(400).send(error.details[0].message);
        }
        if(req.body.otp==otp)
        {
        if(req.body.newpassword!=req.body.confirmpassword)
        {
            return res.send('password and confirm password should be same');
        }
        else
        {
            const salt=await bcrypt.genSalt(10);
            req.body.newpassword=await bcrypt.hash(req.body.newpassword,salt);
            const set_password_query=`UPDATE registration SET password=? WHERE email=?`;
            con.query(set_password_query,[req.body.newpassword,req.params.email],async(error,result)=>{
        if (result) 
        {
            console.log(set_password_query);
            return res.status(200).send('password updated.. ');
        }
        else
        {
            return res.status(400).send('password not updated.. ');
            
        }
    });
        }
    }
    else
    {
        return res.send('Incorrect otp');
    }
}
