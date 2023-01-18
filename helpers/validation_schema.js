const Joi = require('@hapi/joi')

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.number().min(10),
    message: Joi.string().min(12).required()
})

module.exports ={contactSchema}