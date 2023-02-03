const mongoose = require('mongoose');
const User = require('../models/user')

const postSchema = new mongoose.Schema({
    date : {
        type : Date,
        default : Date.now()
    },
    name : {
        type : String,
        require : true,
        maxlength : 60
    },
    category : {
        type : String, 
        require : true,
        enum : ["Senderismo", "Patines", "Kayak"]
    },
    distance : {
        type : Number,
        require : true,
        min : 0
    },
    difficulty : {
        type : String, 
        enum : ["Easy", "Medium", "Hard", "Expert"],
        require : true
    },
    track : [{
        lat : String,
        lng : String
    }],
    duration : {
        type : Number,
        min : 0,
        require : true
    },
    description : {
        type : String, 
        maxlength : 200,
    },
    photos : [{
        type : String,
        default : 'noPhotos.jpg'
    }],

    privacity : {
        type : Boolean,
        default : false,
        require : true
    },
    company : String,
    user : {
        type : mongoose.Schema.ObjectId, ref:"User",
        require : true
    },
})

let Post = mongoose.model('Post', postSchema);
module.exports = Post
