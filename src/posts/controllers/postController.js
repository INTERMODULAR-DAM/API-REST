const postService = require('../services/postService.js');
const auth = require('../../globalServices/autentication');
const { validationResult } = require('express-validator');


const getAllPosts = async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    await auth.decodeToken(token)
    .then(async (user) =>{
            if(user.rol == true){
                const allPosts = await postService.getAllPosts();
                res.status(200).send({status : 200, allPosts})
            }else{
                res.status(401).send({status :401, data : "You dont have authorization" }) 
            }
    })
    .catch(error =>{
        console.log(error)
        res.status(403).send({status : 403, data : "An internal error has ocurred"})
    })
}

const getAllUserPost = async ()=>{
    const token = req.headers.authorization.split(" ")[1];
    await auth.decodeToken(token)
    .then( async user =>{
        if(user.sub){
            const allUserPosts = await postService.getAllUserPost(user.sub);
            res.status(200).send({status : 200, data : allUserPosts})
        }
    })
    .catch(error=>{
        console.log(error);
        res.status(500).send({status : 500, data : "An internal error has ocurred"});
    })
}


const getAllPublicPosts = async ()=>{

}

const getPostById = async(req,res)=>{
    const {_id} = req.body;
    const token = req.headers.authorization.split(" ")[1];
    await auth.decodeToken(token)
    .then( async ()=>{
        const post = await postService.getPostById(_id);
        console.log(post)
        if(post != null){
          res.status(201).send({status : 201, data : post});
        }else{
          res.status(404).send({status : 404, data : "This post doesn't exists"});
        }
    })
    .catch(error =>{
      console.log(error)
      res.status(500).send({status : 500, data : "You don't have authorization."})
    })

}


const createPost = async (req,res) =>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
      console.log(errors.array())
      return res.status(400).send({status : 400, data : errors.array()[0].msg })
    }
    let {body} = req;
    try{
        const newPost = await postService.createPost(body);
        if(newPost.status == undefined){
          res.status(200).send({status : 200, data : newPost })
        }else{
         res.status(401).send(newPost)
        } 
      }catch(error){
      console.log(error);
      res.status(500).send({status : 500, data : "The route could not be created, some fields have not been filled in correctly." })
      }
}


const updatePost = async(req,res)=>{
    const {body} = req;
    await postService.updatePost(body._id, body)
    .then(user =>{
        if(user != null){
            res.status(200).send({status : 200, data : "Post updated"});
        }else{
            res.status(400).send({status : 400, data : "Some data is incorrect"});
        }
    })
    .catch(error =>{
        console.log(error);
        res.status(500).send({status : 500, data : "An internal error has ocurred"})
    })


}


const deletePost = async(req,res)=>{
    let { _id } = req.body;
    
    await postService.deletePostById(_id)
    .then((response)=>{
        if(response == true){
            res.status(201).send({status : 201, data : "Post successfully deleted"})
        }else{
            res.status(403).send({status : 403, data : "This post doesn't exists"})
        }
    })
    .catch(error =>{
        console.log(error)
        res.status(500).send({status : 500, data : "Error interno del servidor"})
    })


}


const deleteAllPosts = async (req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    auth.decodeToken(token)
    .then(async (user)=>{
        if(user.rol == true){
            if(postService.deleteAllPosts()){
                res.status(200).send({status : 200, data : "All posts has been removed"})
            }else{
                res.status(401).send({status : 401, data : "An internal error has ocurred"})
            }
        }else{
            res.status(401).send({status : 401, data : "You don't have authorization"})
        }
    })
    .catch(error =>{
        console.log(error);
        res.status(500).send({status : 500, data : "Internal error has ocurred"})
    })

}

// const addPhoto = async (req,res)=>{
//     let {body} = req;
//     const itsWrited = await postService.addPhoto(body);
//     if(itsWrited){
//         res.status(200).send({status : 200, data : "Foto añadida correctamente"});
//     }else{
//         res.status(400).send({status : 400, data : "No se ha podido añadir correctamente la foto"});
//     }
// }

module.exports = {
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    createPost,
    deleteAllPosts,
    // addPhoto,
}
