const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');


let userSchema = new mongoose.Schema({
   email : {
    type : String, 
    required : true,
    unique : true
   },
    name : {
        type: String,
        required: true,
        maxlength: 30,
        trim : true
    },
    lastname : {
        type: String,
        required: true,
        maxlength : 30,
        trim : true
    },
   date : {
    type : Date,
    default : Date.now()
   },
   nick : {
    type : String,
    required : true,
    unique : true,
    trim : true
   },
   password : {
    type : String,
    required : true,
    select : false,
    trim : true
   },
   admin : {
    type : Boolean,
    default : false
   },
   web : {
    type : String,
   },
   pfp_path : {
    type : String,
    default : 'default.jpeg'
   },
   phone_number : {
    type : Number,
    match: /^\d{9}$/,
    required : true,
    unique : true,
   },
   following : [
    {
        type : mongoose.Types.ObjectId, ref : 'User'
    }
   ]
});

const User = mongoose.model('User', userSchema);

module.exports = User
