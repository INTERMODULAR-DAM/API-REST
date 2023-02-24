const Comment = require('../models/comment')


const getCommentById = async (id) =>{
    return await Comment.findById(id)

}

const getAllComments = async () =>{
    return await Comment.find({})
}


const getAllPostsComments = async (idPost) =>{
    return await Comment.find({post : idPost})
}

const createComment = async (data) =>{
    return await new Comment({...data}).save()
}

const deleteComment = async (id) =>{
    return await Comment.findByIdAndDelete(id)
}

const deleteAll = async (req,res) =>{
    return await Comment.find()
    .then(async allComments=>{
        for(let i = 0; i< allComments.length;i++)
            await Comment.deleteOne(allComments[i])
        return true;
    })
}

const deleteCommentsByUser = async(id) =>{
   return await Comment.deleteMany({user : id})
}


const deleteCommentsByPost = async(id) =>{
    return await Comment.deleteMany({post : id})
}

module.exports = {
    getAllComments,
    getAllPostsComments,
    getCommentById,
    createComment,
    deleteComment,
    deleteAll,
    deleteCommentsByUser,
    deleteCommentsByPost

}
