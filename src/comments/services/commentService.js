const Comment = require('../models/comment')

const getAllComments = async () =>{
    return await Comment.find({})
    .catch(error=>{
        console.log(error);
    })
}


const getAllPostsComments = async (req,res) =>{
    
}

const createComment = async (data) =>{
    return await new Post({...data}).save()
    .catch(error=>{
        console.log(error)
    })
}

const deleteComment = async (req,res) =>{
    
}

const deleteAll = async (req,res) =>{
    
}


module.exports = {
    getAllComments,
    getAllPostsComments,
    createComment,
    deleteComment,
    deleteAll
}
