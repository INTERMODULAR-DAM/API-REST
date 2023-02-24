const Post = require('../models/post');
const {deleteImages} = require('../../globalUtils/imageUtils')
const {deleteCommentsByPost} = require('../../comments/services/commentService')


const getAllPosts = async ()=>{
    return await Post.find()
}

const getAllUserOwnPost = async(id)=>{
    return await Post.find({user : id})
}


const getAllUserPost = async(id)=>{
    return await Post.find({user : id})
}

const getAllPublicPosts = async()=>{
    return await Post.find({privacity : false})
}

const getPostById = async(id) =>{
    return await Post.findById(id)
}

const createPost = async (body) =>{
    return await new Promise(async (resolve,reject)=>{
        try {
            new Post({...body}).save(async (error,post)=>{
                if(error){
                    reject({status : 404, data : "The post could not be created"})
                }
                await Post.updateOne({_id : post._id},{photos : post.photos});
            })
            resolve("The post has been created.")
        } catch (error) {
            reject({status : 500, data : "An error has ocurren while creating the post"})
        }
    });
}

const deleteAllPostsByUser = async (id) =>{
    return await Post.find({user : id})
    .then((posts)=>{
        posts.forEach( async post=>{
            await Post.findByIdAndRemove(post._id)
            deleteImages(post._id, post.photos);
            deleteCommentsByPost(post._id);
        })
        return true;
    })
}

const deletePostById = async (id)=>{
    let response = false;
    await Post.findByIdAndDelete(id)
    .then(async (postFound) =>{
        if(postFound != null){
            deleteImages(postFound._id, postFound.photos)
            deleteCommentsByPost(postFound._id)
            response = true;
        }
    })
    return response
}


const updatePost = async (id, newData) =>{
    return await Post.updateOne({_id : id}, newData)
}

module.exports = {
    getAllPosts,
    createPost,
    deleteAllPostsByUser,
    getPostById,
    deletePostById,
    updatePost,
    getAllUserOwnPost,
    getAllUserPost,
    getAllPublicPosts,
}