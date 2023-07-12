// name
// img
// title
// description
// date
const mongoose=require('mongoose');
const Joi=require('joi');
const C=require('../models/category_model');
const portfolioSchema=new mongoose.Schema({

   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: C.Category,
      required:true,
    },
    image:{
        type:Array,
        required:true,

    },
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:30,
        
     },
     title:{
        type:String,
        required:true,
     },
     description:{
        type:String,
        required:true,
     },
     date:{
        type:String,
        required:true
     }
});

const Portfolio=mongoose.model('Portfolio',portfolioSchema);


exports.Portfolio=Portfolio;

exports.portfolioSchema=portfolioSchema;