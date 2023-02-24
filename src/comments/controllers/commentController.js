const commentService = require('../services/commentService')


const getAllComments = async (req,res) =>{
    let {user} = req;
    try{
        if(user.rol == true){
            const allComments = await commentService.getAllComments();
            res.status(200).send({status : 200, data : allComments});
        }else{
            res.status(401).send({status : 401, data : "You don't have authorization."})
        }
    }catch(error){
    res.status(500).send({status : 500, data : "An internal error has ocurred, please contact with your administrator."})
    }
}


const getAllPostsComments = async (req,res) =>{
    const {_id} = req.query;
    await commentService.getAllPostsComments(_id)
    .then(comments =>{
        if(comments.length != 0){
            res.status(200).send({status : 200, data : comments})
        }else{
            res.status(400).send({status : 400, data : "This post doesn't have comments"})
        }
    })
    .catch(error=>{
        res.status(500).send({status : 500, data : "An internal error has ocurred, please contact with your administrator."})
    }) 
}

const createComment = async (req,res) =>{
    const {body} = req;
    body.id = req.user.sub;
    await commentService.createComment(body)
    .then(comment =>{
        if(comment != null){
            res.status(200).send({status : 200, data : "The comment was created well."})
        }else{
            res.status(400).send({status : 400, data : "We can't create the comment, please check it."})
        }
    })
    .catch(error=>{
        res.status(500).send({status : 500, data : "An internal error has ocurred"});
    })
}

const deleteComment = async (req,res) =>{
    let {user} = req;
    const {_id} = req.body;
    const comment = await commentService.getCommentById(_id);
    try{
        if(user.sub == comment.user || user.rol == true){
            await commentService.deleteComment(_id)
            res.status(200).send({status : 200, data : "Comment deleted sucessfully."})
    
        }else{
            res.status(400).send({status : 400, data : "You don't have authorization."})
        } 
    }catch(error){
        res.status(500).send({status : 500, data : "An internal error has ocurred."})
    }
}

const deleteAll = async (req,res) =>{
    let {user} = req;
    try{
        if(user.rol == true){
            const response = await commentService.deleteAll();
            if(response){
                res.status(200).send({status : 200, data : "Comments deleted sucessfully."})
            }else{
                throw new Error("error")
            }
        }else{
            res.status(400).send({status : 400, data : "You don't have authorization"})
        }
    }catch(error){
        res.status(500).send({status : 500, data : "An internal error has ocurred"})  
    }
}


module.exports = {
    getAllComments,
    getAllPostsComments,
    createComment,
    deleteComment,
    deleteAll
}