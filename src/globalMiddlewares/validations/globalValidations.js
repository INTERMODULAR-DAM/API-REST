const { check } = require("express-validator");
const User = require('../../users/models/user')
const Post = require('../../posts/models/post')

const checkIdPost = () =>{
    return [
        check('post')
        .notEmpty()
        .custom(async post =>{
            await Post.findById(post)
            .then(post =>{
                if(!post)
                    throw new Error("Post need to be real, please check");
            })
        })
    ]
}

const checkIdUser = ()=>{
   return [
    check('user')
    .notEmpty()
    .custom(async user=>{
        await User.findById(user)
        .then(userFound=>{
            if(!userFound)
                throw new Error("User need to be real, please check")
        })
        
    })
   ]
}


module.exports = {
    checkIdPost,
    checkIdUser,
}