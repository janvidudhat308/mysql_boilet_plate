const mongoose=require('mongoose');
const Joi=require('joi');
const category=require('../models/category_model');
const testinomalschema=new mongoose.Schema({
   category:{
      type: mongoose.Schema.Types.ObjectId,
      ref:category.Category,
   },
    image:{
   
        type:String,
        required:true,
         
     },
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:30,
        
     },
     designation:{
        type:String,
        required:true,
     },
     description:{
        type:String,
        required:true,
     }
});

const Testinomal=mongoose.model('Testinomal',testinomalschema);
exports.Testinomal=Testinomal;

exports.testinomalschema=testinomalschema;