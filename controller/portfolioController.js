const express = require("express");
const upload = require("../helper/upload");
const router = express.Router();
const validate = require("../validation/portfolioValidation");
let today = new Date().toISOString().slice(0, 10);
const con = require("../startup/db");
//Add Portfolio
module.exports.add = async (req, res,next) => {
  const { error } = validate.portfolioValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (req.files.length != 4) {
    return res.send("4 images are required..");
  }
  con.query(
    `SELECT * FROM portfolio WHERE name=?`,
    [req.body.name],
    async(error, result) => {
      if (result.length > 0) {
        await next(
          new GeneralError(
              "portfolio already exists...",
              undefined,
          )
      );
      }
    }
  );
  const name = req.body.name;
  const title = req.body.title;
  const description = req.body.description;
  const id = req.body.category_id;
  const image = req.files.map((image) => image.filename);

  const insert_query = `INSERT INTO portfolio (name,image,title,description,category_id,date) VALUES ("${name}","${image}","${title}","${description}","${id}","${today}")`;
  con.query(insert_query, async(error, result) => {
    if (error) {
      await next(
        new GeneralError(
            "portfolio not added...",
            undefined,
        )
    );
    } else {
      await next(
        new GeneralResponse(
            "Portfolio added....",
            undefined,
            config.HTTP_CREATED
        )
    );
    }
  });
};
//Update Portfolio
module.exports.update = async (req, res,next) => {
  
  const { error } = validate.updateportfolioValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  if (req.files.length != 4) {
    return res.send("4 images are required..");
  }
  
  const name = req.body.name;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.files.map((image) => image.filename);
  const id=req.params.id;
  console.log(image);
  const update_query=`UPDATE portfolio SET name='${name}',title='${title}',description='${description}',image='${image}' where id='${id}'`;
        console.log(update_query);
        con.query(update_query,async(err,result)=>{
            if(error)
            {
              await next(
                new GeneralError(
                    "Portfolio not updated...",
                    undefined,
                )
            );
            }
            else
            {
              await next(
                new GeneralResponse(
                    "Portfolio updated....",
                    undefined,
                    config.HTTP_CREATED
                )
            );
            }
        });
  
};

//delete portfolio
module.exports.delete = async (req, res,next) => {

    var id = req.params.id;
    const del=`DELETE FROM portfolio WHERE id='${id}'`;
    console.log(del);
    con.query(del, async(err, result) => {
        if(result){
          await next(
            new GeneralResponse(
                "Portfolio updated ....",
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


//delete multiple portfolio
module.exports.deleteMultiple = async (req, res,next) => {

    var id = req.body.id;
    for(let i=0;i<id.length;i++)
    {
        const delete_query=`DELETE  FROM portfolio WHERE id=?`;
        con.query(delete_query,[id[i]],async(error,result)=>{
        if (error) {
          await next(
            new GeneralError(
                "Data not found",
                undefined,
            )
        );
           
        } 
    });
           
    } 
    await next(
      new GeneralResponse(
          "Portfolio deleted....",
          undefined,
          config.HTTP_CREATED
      )
  ); 
};
//view portfolio
module.exports.view = async (req, res,next) => {
    
    const id=req.params.id;
    const getdata=`SELECT  portfolio.*, category_id AS category_info FROM 
                    portfolio JOIN category ON portfolio.category_id=category.id 
                    WHERE portfolio.id='${id}'` ;
    
    con.query(getdata, async(err, result) => {
        if(result){
            res.send(result);
        }
        else{
          await next(
            new GeneralError(
                "Data not found...",
                undefined,
            )
        );
        }
    });       
}
