const validate = require('../validation/categoryValidation');
const con=require('../startup/db');

module.exports.addCategory=async(req,res)=>{
    const {error}=validate.addCategoryValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    if(!req.file)
    {
        return res.status(400).send('category image  is require..');
    }
    con.query(`SELECT * FROM category WHERE category_name=?`,[req.body.categoryname],(error,result)=>{
        if(result.length>0)
        {
            return res.status(400).send('category already exists....');
        }
    });
    const image=req.file.filename;
    const category_name=req.body.categoryname;
    const insert_query=`INSERT INTO category (category_name,category_image) VALUES ("${category_name}","${image}")`;
    con.query(insert_query,(error,result) => {
        if (error) {
            res.send("Error",error);
        } else {
            
             res.send("category added");
        }
    });

}

//view category
module.exports.listAllCategory = async (req, res) => {
    const viewcategory_query=`SELECT * FROM category`;
    con.query(viewcategory_query,(error,result)=>{
        
        if (result) {
            return res.send(result);
        } else {
            
            return res.send(error);
        }
    });
};

//update category
module.exports.updatecategory=async(req,res)=>{
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
    con.query(updatecategory_query,[categoryname,categoryimage,id],(error,result)=>{
        if (result) {
            return res.send(result);
        } else {
            
            return res.send(error);
        }
    });
}

//delete category
module.exports.deleteMultipleCategory = async (req, res) => {
    var id = req.body.id;
    console.log(id.length);
    let count=0
    for(let i=0;i<id.length;i++)
    {
        const deletecategory_query=`DELETE  FROM category WHERE id=?`;
        con.query(deletecategory_query,[id[i]],(error,result)=>{
        if (result) {
           count=count+1;
           
        } 
    });
           
    } 
            return res.send('category not deleted..');
    
}

//delete single category
module.exports.deleteSingleCategory = async (req, res) => {
    var id = req.params.id;

        const deletecategory_query=`DELETE  FROM category WHERE id=?`;
        con.query(deletecategory_query,[id],(error,result)=>{
        if (result.length>0) {
            return res.send('category  deleted..');
        } 
        else
        {
            return res.send('category not deleted..');
        }
    });
           
    
            
    
}

