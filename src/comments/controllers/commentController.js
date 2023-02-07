const auth = require('../../globalServices/autentication')
const { validationResult } = require('express-validator');
const commentService = require('../services/commentService')


const getAllComments = (req,res) =>{
    const token = req.headers.authorization.split(" ")[1];
    auth.decodeToken(token)
    .then( async user =>{
        if(user.rol == true){
            const allComments = await commentService.getAllComments();
            res.status(200).send({status : 200, data : allComments});
        }else{
            res.status(401).send({status : 401, data : "You don't have authorization."})
        }
    })
    .catch(error=>{
        console.log(error);
        res.status(500).send({status : 500, data : "An internal error has ocurred, please contact with your administrator."})
    })

}


const getAllPostsComments = async (req,res) =>{
    
}

const createComment = async (req,res) =>{
    let errors = validationResult(req);

    if(errors.array()){
        console.log(errors)
        return res.status(200).send({status : 400, data : errors.array()[0]})
    }

    const {body} = req;
    await commentService.createComment(body)
    .then(comment =>{
        if(comment != null){
            res.status(200).send({status : 200, data : "The comment was created well."})
        }else{
            res.status(400).send({status : 400, data : "We can't create the comments, please check it."})
        }
    })
    .catch(error=>{
        console.log(error);
        res.status(500).send({status : 500, data : "An internal error has ocurred"});
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