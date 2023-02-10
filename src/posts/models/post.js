const mongoose = require('mongoose');

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
        enum : ["Hiking", "Roller skating", "Kayaking"]
    },
    distance : {
        type : String,
        require : true
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
        type : String,
        require : true
    },
    description : {
        type : String, 
        maxlength : 200,
    },
    photos : {
        type : Number,
        default : 0,
    },

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
