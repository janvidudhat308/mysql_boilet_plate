const mongoose=require('mongoose');
const Joi=require('joi');
const validate=require('../validation/registrationValidation');
const registrationSchema=new mongoose.Schema({
profilepic:{
   
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
 email:{
    type:String,
    required:true,
    lowercase:true,
    trim:true,
    minlength:11,
    maxlength:50,
    unique:true
 },
 address:{
    type:String,
    required:true,
    minlength:10,
    maxlength:50,
 },
 hobbies:{
    type:Array,
    required:true,
    minlength:1,
    maxlength:3
 },
 gender:{
    type:String,
    required:true,
    enum:['female','male','other'],
    lowercase:true
 },
 password:{
    type:String,
    required:true,
    trim:true,
    maxlength:250,
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1
  },
 },
 
});

const User=mongoose.model('Registration',registrationSchema);

// function validateUser(user_val)
// {
//     const schema=Joi.object({
//         profilepic:Joi.string().messages({
//          'string.empty': `"image" cannot be an empty field`,
//          'any.required': `"image" is a required field`
//         }),
//         name:Joi.string().min(3).max(30).required().messages({
//          'string.base': `"name" should be a type of 'text'`,
//          'string.empty': `"name" cannot be an empty field`,
//          'string.min': `"name" should have a minimum length of 3`,
//          'any.required': `"name" is a required field`
//         }),

//         email:Joi.string().min(11).max(50).required().email().messages({
//          'string.empty': `"email" cannot be an empty field`,
//          'any.required': `"email" is a required field`
//         }),
//         address:Joi.string().min(10).max(50).required().messages({
//          'string.base': `"address" should be a type of 'text'`,
//          'string.empty': `"address" cannot be an empty field`,
//          'any.required': `"address" is a required field`
//         }),

//         hobbies:Joi.array().min(1).max(3).required().messages({
//          'string.min': `"hobby" choose atleat one hobby`,
//          'any.required': `"hobby" is a required field`
//         }),
//         gender:Joi.string().required().messages({
//           'any.required': `"gender" is a required field`
//         }),
//         password:Joi.string().min(8).max(250).required().messages({
//          'string.base': `"password" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
//          'string.empty': `"password" cannot be an empty field`,
//          'string.min': `"password" should have a minimum length of 8 `,
//          'any.required': `"password" is a required field`
//         }),
//       //   confirm_password:Joi.ref('password').required().messages({
//       //    'string.base': `"password" should contain atleast 1 uppercase,1 lowercase,1 digit'`,

//       //   }),
//         confirm_password:Joi.valid(Joi.ref('password')).required().messages({
//              'string.base': `"confirm password" and password should be same'`,
//          })
//     });
//     return schema.validate(user_val);
// }

exports.User=User;

exports.registrationSchema=registrationSchema;