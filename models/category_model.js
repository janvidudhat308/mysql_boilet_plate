const mongoose=require('mongoose');
const Joi=require('joi');

const categorySchema=new mongoose.Schema({
    categoryname:{
        type:String,
        required:true
    },
    categoryimage:{
        type:String,
        required:true
    }
});
const Category=mongoose.model('category',categorySchema);


exports.Category=Category;
exports.categorySchema=categorySchema;