const mongoose=require('mongoose');
const Joi=require('joi');

function contactValidation(user_val)
{
    const schema=Joi.object({
        name:Joi.string().min(3).max(30).required().messages({
            'string.base': `"name" should be a type of 'text'`,
            'string.empty': `"name" cannot be an empty field`,
            'string.min': `"name" should have a minimum length of 3`,
            'any.required': `"name" is a required field`
           }),
   
           email:Joi.string().min(11).max(50).required().email().messages({
            'string.empty': `"email" cannot be an empty field`,
            'any.required': `"email" is a required field`
           }),
           message:Joi.string().required().messages({
            'any.required': `"message" is a required field`
          }),
          
          phone:Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'any.required': `"phone" is a required field`,
            'string.base': `Enter valid phone no`
          })
          
        });
        return schema.validate(user_val);
}

exports.contactValidation=contactValidation;
