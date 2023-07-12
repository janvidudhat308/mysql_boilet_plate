const mongoose=require('mongoose');
const Joi=require('joi');

function registrationValidation(user_val)
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
        address:Joi.string().min(10).max(50).required().messages({
         'string.base': `"address" should be a type of 'text'`,
         'string.empty': `"address" cannot be an empty field`,
         'any.required': `"address" is a required field`
        }),

        hobbies:Joi.array().min(1).max(3).required().messages({
         'string.min': `"hobby" choose atleat one hobby`,
         'any.required': `"hobby" is a required field`
        }),
        gender:Joi.string().required().messages({
          'any.required': `"gender" is a required field`
        }),
        password:Joi.string().min(8).max(250).required().messages({
         'string.base': `"password" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
         'string.empty': `"password" cannot be an empty field`,
         'string.min': `"password" should have a minimum length of 8 `,
         'any.required': `"password" is a required field`
        }),
      //   confirm_password:Joi.ref('password').required().messages({
      //    'string.base': `"password" should contain atleast 1 uppercase,1 lowercase,1 digit'`,

      //   }),
        confirm_password:Joi.valid(Joi.ref('password')).required().messages({
             'string.base': `"confirm password" and password should be same'`,
         })
    });
    return schema.validate(user_val);
}


function loginValidation(user_val)
{
  const schema=Joi.object({
    email:Joi.string().min(11).max(50).required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
     }),
     password:Joi.string().min(8).max(250).required().messages({
      'string.base': `"password" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
      'string.empty': `"password" cannot be an empty field`,
      'string.min': `"password" should have a minimum length of 8 `,
      'any.required': `"password" is a required field`
     }),
    });
    return schema.validate(user_val);
}


function newPasswordValidation(user_val)
{
  const schema=Joi.object({
   
     newpassword:Joi.string().min(8).max(250).required().messages({
      'string.base': `"newpassword" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
      'string.empty': `"newpassword" cannot be an empty field`,
      'string.min': `"newpassword" should have a minimum length of 8 `,
      'any.required': `"newpassword" is a required field`
     }),
     confirmpassword:Joi.valid(Joi.ref('newpassword')).required().messages({
      'string.base': `"confirm password" and password should be same'`,
  }),
  otp:Joi.required().messages({
    'string.base': `"otp is required'`,
})
    }); 
    return schema.validate(user_val);
}

function resetpasswordValidation(user_val)
{
  const schema=Joi.object({
    
     oldpassword:Joi.string().min(8).max(250).required().messages({
      'string.base': `"oldpassword" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
      'string.empty': `"oldpassword" cannot be an empty field`,
      'string.min': `"oldpassword" should have a minimum length of 8 `,
      'any.required': `"oldpassword" is a required field`
     }),
     newpassword:Joi.string().min(8).max(250).required().messages({
      'string.base': `"newpassword" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
      'string.empty': `"newpassword" cannot be an empty field`,
      'string.min': `"newpassword" should have a minimum length of 8 `,
      'any.required': `"newpassword" is a required field`
     }),
     confirmpassword:Joi.valid(Joi.ref('newpassword')).required().messages({
      'string.base': `"confirm password" and password should be same'`,
  })
    });
    return schema.validate(user_val);

}

function updateProfileValidation(user_val)
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
    address:Joi.string().min(10).max(50).required().messages({
     'string.base': `"address" should be a type of 'text'`,
     'string.empty': `"address" cannot be an empty field`,
     'any.required': `"address" is a required field`
    }),

    hobbies:Joi.array().min(1).max(3).required().messages({
     'string.min': `"hobby" choose atleat one hobby`,
     'any.required': `"hobby" is a required field`
    }),
    gender:Joi.string().required().messages({
      'any.required': `"gender" is a required field`
    }),
    
});
return schema.validate(user_val);

}

function forgotpasswordValidation(user_val)
{
  const schema=Joi.object({
    email:Joi.string().min(11).max(50).required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
     })
  });
  return schema.validate(user_val);
}


exports.updateProfileValidation=updateProfileValidation;
exports.registrationValidation=registrationValidation;
exports.loginValidation=loginValidation;
exports.newPasswordValidation=newPasswordValidation;
exports.resetpasswordValidation=resetpasswordValidation;
exports.forgotpassword=forgotpasswordValidation;