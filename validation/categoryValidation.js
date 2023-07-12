const mongoose=require('mongoose');
const Joi=require('joi');

function addCategoryValidation(user_val)
{
    const schema=Joi.object({
        categoryimage:Joi.string().messages({
            'string.empty': `"categoryimage" cannot be an empty field`,
            'any.required': `"categoryimage" is a required field`
           }),
        categoryname:Joi.string().min(3).max(30).required().messages({
            'string.base': `"categoryname" should be a type of 'text'`,
            'string.empty': `"categoryname" cannot be an empty field`,
            'string.min': `"categoryname" should have a minimum length of 3`,
            'any.required': `"categoryname" is a required field..`
           })
    });
        return schema.validate(user_val);
}


exports.addCategoryValidation=addCategoryValidation;