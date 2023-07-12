const mongoose=require('mongoose');
const Joi=require('joi');

const contactSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:30,
        
     },
     email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        minlength:11,
        maxlength:50,
        unique:true
     },
     phone:{
        type:String,
        required:true,
        minlength:10

     },
     message:{
        type:String,
        required:true,
     },
     date:{
        type:String,
        required:true
     }
});

const Contact=mongoose.model('Contact',contactSchema);


exports.Contact=Contact;

exports.contactSchema=contactSchema;