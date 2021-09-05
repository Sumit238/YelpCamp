const mongoose = require('mongoose');
reviewSchema = new mongoose.Schema({
    body: String,
    rating: {
        type: Number,
        required: true
    },
    author : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

})

module.exports = mongoose.model('review', reviewSchema)
