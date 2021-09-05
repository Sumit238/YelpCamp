const sanitizeHtml = require('sanitize-html');
const { number } = require('joi');

const extension =(joi)=>({
    type:'string',
    base:joi.string(),
    messages:{
        'string.escapeHTML':'{{#label}} input should not include html'

    },
    rules:{
        escapeHTML:{
            validate(value,helpers){
                const clean =sanitizeHtml(value,{
                    allowedTags:[],
                    allowedAttributes:{},
                });
                if(clean!==value){
                    return helpers.error('string.escapeHTML',{value})
                }
                return clean
            }
        }
    }
} );
const joi = require('joi').extend(extension);
module.exports = {
    camgroundSchema: joi.object({
        title: joi.string().required().escapeHTML(),
        location: joi.string().required().escapeHTML(),
        images: joi.array().items(joi.object({
                    url: joi.string().required(),
                    filename:joi.string().required()
                })),
        price: joi.number().required().min(0),
        description: joi.string().required().escapeHTML()
    }).required(),
    reviewSchema: joi.object({
        body: joi.string().required().escapeHTML(),
        rating: joi.number().required().min(1).max(5)

    }).required()
}