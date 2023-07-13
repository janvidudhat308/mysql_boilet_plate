const validate = require("../validation/contactValidation");
const { Contact } = require("../models/contact_model");
let today = new Date().toISOString().slice(0, 10);
const con=require('../startup/db');
const { error, log } = require('winston');
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const logger = require('../loggers/logger');

//Add contact
module.exports.addcontact=async(req,res,next)=>{
    const {error}=validate.contactValidation(req.body,next);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    con.query(`SELECT * FROM contact WHERE email=?`,[req.body.email],async(error,result)=>{
        if(result.length>0)
        {
            await next(
                new GeneralError(
                    "Email already exists...",
                    undefined,
                )
            );
        }
        if(result.length==0)
        {
            const name=req.body.name;
            const phone=req.body.phone;
            const email=req.body.email;
            const message=req.body.message;
            const insert_query=`INSERT INTO contact (name,email,phone,message,date) VALUES ("${name}","${email}","${phone}","${message}","${today}")`;
            con.query(insert_query,async(error,result) => {
                if (error) {
                    await next(
                        new GeneralError(
                            "Contact not added...",
                            undefined,
                        )
                    );
                } else {
                    
                    await next(
                        new GeneralResponse(
                            " contact added ....",
                            undefined,
                            config.HTTP_ACCEPTED
                        )
                    );
                }
            });
        
        }
    });
   }

//update Contact
module.exports.updatecontact=async(req,res,next)=>{
    
    let id=req.params.id;
    const {error}=validate.contactValidation(req.body);
        if(error) 
        {
            return res.status(400).send(error.details[0].message);
        }
        else
        {
            const name=req.body.name;
            const phone=req.body.phone;
            const email=req.body.email;
            const message=req.body.message;
            const updatecontact_query=`UPDATE contact SET name=?,phone=?,email=?,message=?,date=? WHERE id=?`;
            con.query(updatecontact_query,[name,phone,email,message,today,id],async(error,result) => {
                if (error) {
                    await next(
                        new GeneralError(
                            "Contact not updated...",
                            undefined,
                        )
                    );
                } else {
                    
                    await next(
                        new GeneralResponse(
                            " contact updated ....",
                            undefined,
                            config.HTTP_ACCEPTED
                        )
                    );
                }
            });
        }
}

//delete Contact
module.exports.deletecontact=async(req,res,next)=>{
    let id=req.params.id;
    con.query('DELETE FROM contact WHERE id=?',[id], async(err, result) => {
        if(result){
            await next(
                new GeneralResponse(
                    " contact deleted successfully ....",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
        else{
            await next(
                new GeneralError(
                    "Contact not deleted...",
                    undefined,
                )
            );
        }
    });
}

//delete multiple
module.exports.deletemultiplecontact=async(req,res,next)=>{
    let id=req.body.id;
    for(let i=0;i<id.length;i++)
    {
        const deletecontact_query=`DELETE  FROM contact WHERE id=?`;
        con.query(deletecontact_query,[id[i]],async(error,result)=>{
        if(error)
        {
            await next(
                new GeneralError(
                    "Contact not added...",
                    undefined,
                )
            );
        }
    });
           
    } 
    await next(
        new GeneralResponse(
            " contact deleted ....",
            undefined,
            config.HTTP_ACCEPTED
        )
    );
}
//view contact
module.exports.viewcontact=async(req,res,next)=>{
    
    let id=req.params.id;
    con.query('SELECT * FROM contact WHERE id=? ',[id], async(err,result) => {
        if(result.length>0){
            
            res.send(result)
        }
        else{
            await next(
                new GeneralError(
                    "Contact not found...",
                    undefined,
                )
            );
        }
    });
}


