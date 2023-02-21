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
        enum : ["Hiking", "Roller Skating", "Kayaking"]
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
        lat : Number,
        lng : Number
    }],
    duration : {
        type : String,
        require : true
    },
    description : {
        type : String, 
        maxlength : 200,
    },
    photos : [{
        type : String
    }],

    privacity : {
        type : Boolean,
        default : false,
        require : true
    },
    user : {
        type : mongoose.Schema.ObjectId, ref:"User",
        require : true
    },
})

let Post = mongoose.model('Post', postSchema);
module.exports = Post
