const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    date : {
        type : Date,
        require : true, 
        default : Date.now()
    },
    description : {
        type : String,
        require : true,
    },
    user : {
      type : mongoose.Schema.ObjectId, ref:"User",
      require : true  
    },
    post : {
        type : mongoose.Schema.ObjectId, ref:"Post",
        require : true
    }
})

let Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment