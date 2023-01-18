const Joi = require('@hapi/joi')

const contactSchema = Joi.object({
    name: Joi.string().messages({'string.pattern.base': `Name is required.`}).required(),
    email: Joi.string().email().lowercase().messages({'string.pattern.base': `Provide a valid email.`}).required(),
    phone: Joi.number().min(10).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
    message: Joi.string().min(12).messages({'string.pattern.base': `Message must contain atleast 12 characters.`}).required()
})

const PostSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().min(15).required(),
    username: Joi.string().required(),
    categories: Joi.string().min(4).required()
})

// const userSchema = Joi.object({
//     username: Joi.string().required(),
//     email: Joi.string().min(15).required(),
//     password: Joi.string().required()
// })

module.exports ={
    contactSchema,
    PostSchema

}