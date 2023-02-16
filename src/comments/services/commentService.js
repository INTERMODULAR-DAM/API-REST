const Comment = require('../models/comment')


const getCommentById = async (id) =>{
    return await Comment.findById(id)
    .catch(error=>{
        console.log(error)
    })
}

const getAllComments = async () =>{
    return await Comment.find({})
    .catch(error=>{
        console.log(error);
    })
}


const getAllPostsComments = async (idPost) =>{
    return await Comment.find({post : idPost})
    .catch(error=>{
        console.log(error)
    })
}

const createComment = async (data) =>{
    return await new Comment({...data}).save()
    .catch(error=>{
        console.log(error)
    })
}

const deleteComment = async (id) =>{
    return await Comment.findByIdAndDelete(id)
    .catch(error=>{
        console.log(error)
    })
}

const deleteAll = async (req,res) =>{
    return await Comment.find()
    .then(async allComments=>{
        for(let i = 0; i< allComments.length;i++)
            await Comment.deleteOne(allComments[i])
        return true;
    })
    .catch(error=>{
        console.log(error)
        return false
    })
}

const deleteCommentsByUser = async(id) =>{
    await Comment.deleteMany({user : id})
    .then(comments=>{
        console.log(comments)
    })
    .catch(error =>{
        console.log(error);
    })
}


const deleteCommentsByPost = async(id) =>{
    await Comment.deleteMany({post : id})
    .then(comments=>{
        console.log(comments)
    })
    .catch(error =>{
        console.log(error);
    })
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
