const {check} = require('express-validator');
const User = require('../../users/models/user');
const Post = require('../../posts/models/post');

const checkComment = ()=> {
    return [
        check('message')
        .notEmpty()
        .isAlphanumeric()
        .withMessage("This comments isn't alphanumeric, please fix it"),

        check('user')
        .notEmpty()
        .custom(async user =>{
            await User.findById(user)
            .then(user =>{
                if(!user)
                    throw new Error("User need to be real, please fix it");
            })
            .catch(error=>{
                console.log(error);
            })
        }),

        check('post')
        .notEmpty()
        .custom(async post =>{
            await Post.findById(post)
            .then(post =>{
                if(!post)
                    throw new Error("Post need to be real, please check");
            })
            .catch(error =>{})
        })
    ]
}