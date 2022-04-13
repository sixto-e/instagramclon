const joi = require('@hapi/joi');
const schemas ={
    auth: joi.object().keys({
        username : joi.string().min(4).max(15).required(),
        password: joi.string().min(4).max(15).required() 
    })
};

module.exports = {schemas}