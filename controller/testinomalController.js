const validate = require("../validation/testinomalValidation");
const express=require('express');
const  router=express.Router();
const jwt=require('jsonwebtoken');
const con=require('../startup/db');
//Add testinomal
module.exports.addtestinomal=async(req,res)=>{
    
    const {error}=validate.testinomalValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    if(!req.file)
    {
        return res.status(400).send('image  is require..');
    }
    con.query(`SELECT * FROM testinomal WHERE name=?`,[req.body.name],(error,result)=>{
        if(result.length>0)
        {
            return res.status(400).send(' testinomal of this name is already exixts....');
        }
    });
    const name=req.body.name;
    const description=req.body.description;
    const designation=req.body.designation;
    const image=req.file.filename;
    const insert_query=`INSERT INTO testinomal (name,image,designation,description) VALUES ("${name}","${image}","${designation}","${description}")`;
    con.query(insert_query,(error,result) => {
        if (error) {
            res.send("Error",error);
        } else {
            
             res.send('testinomal added');
        }
    });
}

//Update testinomal
module.exports.updatetestinomal=async(req,res)=>{
    let id=req.params.id;
    const {error}=validate.testinomalValidation(req.body);
        if(error) 
        {
            return res.status(400).send(error.details[0].message);
        }
        else
        {
            if(!req.file)
        {
            return res.status(400).send('image  is require..');
        }
            const name=req.body.name;
            const description=req.body.description;
            const designation=req.body.designation;
            const image=req.file.filename;
            const updatetestinomal_query=`UPDATE testinomal SET image=?,name=?,designation=?,description=? WHERE id=?`;
            con.query(updatetestinomal_query,[image,name,designation,description,id],(error,result) => {
                if (error) {
                    res.send(error);
                } else {
                    
                     res.send('testinomal updated...');
                }
            });
        }
}

//View Testinomal
module.exports.viewtestinomal=async(req,res)=>{
    let id=req.params.id;
    con.query('SELECT * FROM testinomal WHERE id=? ',[id], async(err,result) => {
        if(result){
            res.send(result)
        }
        else{
            res.status(400).send('data not found');
        }
    });

}

//delete  testinomal
module.exports.deletetestinomal = async (req, res) => {

    var id = req.params.id;
    con.query('DELETE FROM testinomal WHERE id=?',[id], async(err, result) => {
        if(result){
            res.send('testinomal deleted successfully......!');
        }
        else{
            res.status(400).send('data not found');
        }
    });
}
//delete multiple testinomal
module.exports.deletetemultiplestinomal = async (req, res) => {

    var id = req.body.id;
    for(let i=0;i<id.length;i++)
    {
        const deletetestinomal_query=`DELETE  FROM testinomal WHERE id=?`;
        con.query(deletetestinomal_query,[id[i]],(error,result)=>{
        if(error)
        {
            return res.send('testinomal not delete..');
        }
    });
           
    } 
            return res.send('testinomal  deleted..');
}


