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


module.exports = {
    getAllComments,
    getAllPostsComments,
    createComment,
    deleteComment,
    deleteAll,
    getCommentById
}
