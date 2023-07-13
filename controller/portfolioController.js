const express = require("express");
const upload = require("../helper/upload");
const router = express.Router();
const validate = require("../validation/portfolioValidation");
let today = new Date().toISOString().slice(0, 10);
const con = require("../startup/db");
//Add Portfolio
module.exports.add = async (req, res) => {
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
    (error, result) => {
      if (result.length > 0) {
        return res.status(400).send("portfolio already exixts....");
      }
    }
  );
  const name = req.body.name;
  const title = req.body.title;
  const description = req.body.description;
  const id = req.body.category_id;
  const image = req.files.map((image) => image.filename);

  const insert_query = `INSERT INTO portfolio (name,image,title,description,category_id,date) VALUES ("${name}","${image}","${title}","${description}","${id}","${today}")`;
  con.query(insert_query, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send("portfolio added...");
    }
  });
};
//Update Portfolio
module.exports.update = async (req, res) => {
  
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
        con.query(update_query,(err,result)=>{
            if(error)
            {
                res.status(400).send('portfolio not updated..');
            }
            else
            {
                res.status(200).send('portfolio  updated..');
            }
        });
  
};

//delete portfolio
module.exports.delete = async (req, res) => {

    var id = req.params.id;
    const del=`DELETE FROM portfolio WHERE id='${id}'`;
    console.log(del);
    con.query(del, async(err, result) => {
        if(result){
            res.send('portfolio deleted successfully......!');
        }
        else{
            res.status(400).send('data not found');
        }
    });       
}


//delete multiple portfolio
module.exports.deleteMultiple = async (req, res) => {

    var id = req.body.id;
    for(let i=0;i<id.length;i++)
    {
        const delete_query=`DELETE  FROM portfolio WHERE id=?`;
        con.query(delete_query,[id[i]],(error,result)=>{
        if (error) {
            return res.send('portfolio not delete..');
           
        } 
    });
           
    } 
            return res.send('portfolio  deleted..');  
};
//view portfolio
module.exports.view = async (req, res) => {
    
    var id = req.params.id;
    const getdata=`SELECT * FROM portfolio WHERE id='${id}'`;
    con.query(getdata, async(err, result) => {
        if(result){
            res.send(result);
        }
        else{
            res.status(400).send('data not found');
        }
    });       
}
