const validate = require("../validation/contactValidation");
const { Contact } = require("../models/contact_model");
let today = new Date().toISOString().slice(0, 10);
const con=require('../startup/db');
//Add contact
module.exports.addcontact=async(req,res)=>{
    const {error}=validate.contactValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    con.query(`SELECT * FROM contact WHERE email=?`,[req.body.email],(error,result)=>{
        if(result.length>0)
        {
            return res.status(400).send('Email already exixts....');
        }
        else
        {
            const name=req.body.name;
            const phone=req.body.phone;
            const email=req.body.email;
            const message=req.body.message;
            const insert_query=`INSERT INTO contact (name,email,phone,message,date) VALUES ("${name}","${email}","${phone}","${message}","${today}")`;
            con.query(insert_query,(error,result) => {
                if (error) {
                    res.send(error);
                } else {
                    
                     res.send('Contact added...');
                }
            });
        
        }
    });
   }

//update Contact
module.exports.updatecontact=async(req,res)=>{
    
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
            con.query(updatecontact_query,[name,phone,email,message,today,id],(error,result) => {
                if (error) {
                    res.send(error);
                } else {
                    
                     res.send('Contact updated...');
                }
            });
        }
}

//delete Contact
module.exports.deletecontact=async(req,res)=>{
    let id=req.params.id;
    con.query('DELETE FROM contact WHERE id=?',[id], async(err, result) => {
        if(result){
            res.send('contact deleted successfully......!');
        }
        else{
            res.status(400).send('data not found');
        }
    });
}

//delete multiple
module.exports.deletemultiplecontact=async(req,res)=>{
    let id=req.body.id;
    for(let i=0;i<id.length;i++)
    {
        const deletecontact_query=`DELETE  FROM contact WHERE id=?`;
        con.query(deletecontact_query,[id[i]],(error,result)=>{
        if(error)
        {
            return res.send('contact not delete..');
        }
    });
           
    } 
            return res.send('contact  deleted..');
}
//view contact
module.exports.viewcontact=async(req,res)=>{
    
    let id=req.params.id;
    con.query('SELECT * FROM contact WHERE id=? ',[id], async(err,result) => {
        if(result){
            res.send(result)
        }
        else{
            res.status(400).send('data not found');
        }
    });
}


