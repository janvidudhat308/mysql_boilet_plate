const registration=require('../routes/registration');
const contact=require('../routes/contact');
 const express=require('express');
 
 const category=require('../routes/category');
const testinomal=require('../routes/testinomal');
const portfolio=require('../routes/portfolio');
module.exports=function (app)
{

    app.use(express.json());

    app.use('/api/registration',registration);
    app.use('/api/category',category);
    app.use('/api/contact',contact);
    app.use('/api/testinomal',testinomal);
    app.use('/api/portfolio',portfolio);
    
    

}
