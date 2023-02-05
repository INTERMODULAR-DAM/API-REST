const mongoose = require('mongoose')
const User = require('../models/user')
const Post = require('../models/post')

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
      type : User,
      require : true  
    },
    post : {
        type : Post,
        require : true
    }
})