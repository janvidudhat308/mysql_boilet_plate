const mongoose=require('mongoose');
const Joi=require('joi');

function portfolioValidation(user_val)
{
    const schema=Joi.object({
        category_id:Joi.string().messages({
            
            'any.required': `"category_id" is a required field`
           }),
        image:Joi.string().messages({
         'string.empty': `"image" cannot be an empty field`,
         'any.required': `"image" is a required field`
        }),
        name:Joi.string().min(3).max(30).required().messages({
         'string.base': `"name" should be a type of 'text'`,
         'string.empty': `"name" cannot be an empty field`,
         'string.min': `"name" should have a minimum length of 3`,
         'any.required': `"name" is a required field`
        }),

        description:Joi.string().required().messages({
            'any.required': `"description" is a required field`
          }),
          title:Joi.string().required().messages({
            'any.required': `"title" is a required field`
          }),
        
    });
    return schema.validate(user_val);
}

function updateportfolioValidation(user_val)
{
    const schema=Joi.object({
        
        image:Joi.string().messages({
         'string.empty': `"image" cannot be an empty field`,
         'any.required': `"image" is a required field`
        }),
        name:Joi.string().min(3).max(30).required().messages({
         'string.base': `"name" should be a type of 'text'`,
         'string.empty': `"name" cannot be an empty field`,
         'string.min': `"name" should have a minimum length of 3`,
         'any.required': `"name" is a required field`
        }),

        description:Joi.string().required().messages({
            'any.required': `"description" is a required field`
          }),
          title:Joi.string().required().messages({
            'any.required': `"title" is a required field`
          }),
        
    });
    return schema.validate(user_val);
}
exports.updateportfolioValidation=updateportfolioValidation;
exports.portfolioValidation=portfolioValidation;
