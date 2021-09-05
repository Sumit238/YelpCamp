const { string } = require('joi');
const mongoose = require('mongoose');
const review = require('./review')
const campGroundSchema = new mongoose.Schema({
    title: String,
    price: String,
    images: [{
        url :String,
        filename:String
    }],
    description: String,
    location : String,
    geometry: {
        type:{
            type:String,
            enum:['Point'],
            required :true
        },
        coordinates:{
            type: [Number],
            required :true
        }
    },
    author : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }]
})
campGroundSchema.post('findOneAndDelete', async function (doc) {
    console.log(doc)
    if (doc) {
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
module.exports = mongoose.model('campground', campGroundSchema)