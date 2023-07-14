const validate = require('../validation/categoryValidation');
const con=require('../startup/db');
const { error, log } = require('winston');
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const logger = require('../loggers/logger');

module.exports.addCategory=async(req,res,next)=>{
    const {error}=validate.addCategoryValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    if(!req.file)
    {
        await next(
            new GeneralError(
                "Image is required..",
                undefined,
            )
        );
    }
    con.query(`SELECT * FROM category WHERE category_name=?`,[req.body.categoryname],async(error,result)=>{
        if(result.length>0)
        {
            await next(
                new GeneralError(
                    "category already exists..",
                    undefined,
                )
            );
        }
        if(result.length==0)
        {
            const image=req.file.filename;
    const category_name=req.body.categoryname;
    const insert_query=`INSERT INTO category (category_name,category_image) VALUES ("${category_name}","${image}")`;
    con.query(insert_query,async(error,result) => {
        if (error) {
            res.send("Error",error);
        } else {
            
            await next(
                new GeneralResponse(
                    req.body.categoryname + " category added ....",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
    });
        }
    });
    

}

//view category
module.exports.listAllCategory = async (req, res) => {
    const viewcategory_query=`SELECT * FROM category`;
    con.query(viewcategory_query,async(error,result)=>{
        
        if (result) {
            return res.send(result);
        } else {
            
            await next(
                new GeneralError(
                    "category not found..",
                    undefined,
                )
            );
        }
    });
};

//update category
module.exports.updatecategory=async(req,res,next)=>{
    let id = req.params.id;
   


    const { error } = validate.addCategoryValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    if(!req.file)
    {
        return res.status(400).send('category image  is require..');
    }
    const categoryname=req.body.categoryname;
    const categoryimage=req.file.filename;
    
    const updatecategory_query=`UPDATE category SET category_name=?,category_image=? WHERE id=?`;
    con.query(updatecategory_query,[categoryname,categoryimage,id],async(error,result)=>{
        if (result) {
            await next(
                new GeneralResponse(
                    " category updated ....",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        } else {
            
            await next(
                new GeneralError(
                    "category not updated..",
                    undefined,
                )
            );
        }
    });
}

//delete category
module.exports.deleteMultipleCategory = async (req, res,next) => {
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
        const deletecategory_query=`DELETE  FROM category WHERE id=?`;
        con.query(deletecategory_query,[id[i]],async(error,result)=>{
        if (error) {
            await next(
                new GeneralError(
                    "category not deleted..",
                    undefined,
                )
            );
        } 
    });
           
    } 
            await next(
                new GeneralResponse(
                    " category deleted ....",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
}

//delete single category
module.exports.deleteSingleCategory = async (req, res,next) => {
    var id = req.params.id;

        const deletecategory_query=`DELETE  FROM category WHERE id=?`;
        con.query(deletecategory_query,[id],async(error,result)=>{
        if (result) {
            await next(
                new GeneralResponse(
                    " category deleted ....",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        } 
        else
        {
            await next(
                new GeneralError(
                    "category not deleted..",
                    undefined,
                )
            );
        }
    });
}

