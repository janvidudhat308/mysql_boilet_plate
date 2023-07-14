const validate = require("../validation/testinomalValidation");
const express=require('express');
const  router=express.Router();
const jwt=require('jsonwebtoken');
const con=require('../startup/db');
const { error, log } = require('winston');
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const logger = require('../loggers/logger');

//Add testinomal
module.exports.addtestinomal=async(req,res,next)=>{
    
    const {error}=validate.testinomalValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    if(!req.file)
    {
        return res.status(400).send('image  is require..');
    }
    con.query(`SELECT * FROM testinomal WHERE name=?`,[req.body.name],async(error,result)=>{
        if(result.length>0)
        {
            await next(
                new GeneralError(
                    "Testinomal already added..",
                    undefined,
                )
            );
        }
        if(result.length==0)
        {
            const name=req.body.name;
    const description=req.body.description;
    const designation=req.body.designation;
    const image=req.file.filename;
    const insert_query=`INSERT INTO testinomal (name,image,designation,description) VALUES ("${name}","${image}","${designation}","${description}")`;
    con.query(insert_query,async(error,result) => {
        if (error) {
            await next(
                new GeneralError(
                    "Testinomal not added..",
                    undefined,
                )
            );
        } else {
            
            await next(
                new GeneralResponse(
                    " Testinomal added....",
                    undefined,
                    config.HTTP_CREATED
                )
            );
        }
    });
        }
    });
    
}

//Update testinomal
module.exports.updatetestinomal=async(req,res,next)=>{
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
            con.query(updatetestinomal_query,[image,name,designation,description,id],async(error,result) => {
                if (error) {
                    res.send(error);
                } else {
                    
                    await next(
                        new GeneralResponse(
                            " Testinomal updated......",
                            undefined,
                            config.HTTP_CREATED
                        )
                    );
                }
            });
        }
}

//View Testinomal
module.exports.viewtestinomal=async(req,res,next)=>{
    let id=req.params.id;
    con.query('SELECT * FROM testinomal WHERE id=? ',[id], async(err,result) => {
        if(result.length>0){
            res.send(result)
        }
        else{
            await next(
                new GeneralError(
                    "Data not found",
                    undefined,
                )
            );
        }
    });

}

//delete  testinomal
module.exports.deletetestinomal = async (req, res,next) => {

    var id = req.params.id;
    con.query('DELETE FROM testinomal WHERE id=?',[id], async(err, result) => {
        if(result){
            await next(
                new GeneralResponse(
                    " Testinomal deleted....",
                    undefined,
                    config.HTTP_CREATED
                )
            );
        }
        else{
            await next(
                new GeneralError(
                    "Data not found",
                    undefined,
                )
            );
        }
    });
}
//delete multiple testinomal
module.exports.deletetemultiplestinomal = async (req, res,next) => {

    var id = req.body.id;
    if(id.length==0)
    {
      await next(
        new GeneralError(
            "Enter id",
            undefined,
        )
    );
    }
    for(let i=0;i<id.length;i++)
    {
        const deletetestinomal_query=`DELETE  FROM testinomal WHERE id=?`;
        con.query(deletetestinomal_query,[id[i]],async(error,result)=>{
        if(error)
        {
            await next(
                new GeneralError(
                    "testinomal not deleted",
                    undefined,
                )
            );
        }
    });
           
    } 
    await next(
        new GeneralResponse(
            " testinomal deleted....",
            undefined,
            config.HTTP_CREATED
        )
    );
}


