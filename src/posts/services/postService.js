const Post = require('../models/post');
const { writePostPhotos, deletePostPhotos} = require('../../globalUtils/imageUtils');


const getAllPosts = async ()=>{
    return await Post.find()
}

const getAllUserOwnPost = async(id)=>{
    return await Post.find({user : id})
    .catch(error =>{
        console.log(error)
    })
}


const getAllUserPost = async(id)=>{
    return await Post.find({user : id})
    .catch(error =>{
        console.log(error)
    })
}

const getAllPublicPosts = async()=>{
    return await Post.find({privacity : false})
    .catch(error => {
        console.log(error)
    })
}

const getPostById = async(id) =>{
    return await Post.findById(id)
    .catch(error =>{
        console.log(error)
    })
}

const createPost = async (body) =>{
    return await new Promise(async (resolve,reject)=>{
        try {
            new Post({...body}).save(async (error,post)=>{
                if(error){
                    console.log(error)
                    reject({status : 404, data : "No se pudo crear la ruta"})
                }
                if(body.photos != undefined){
                    post = writePostPhotos(post, body);
                }else{
                    post.photos.push("noPhotos.png");
                }
                await Post.updateOne({_id : post._id},{photos : post.photos});
            })
            resolve("Ruta creada correctamente")
        } catch (error) {
            reject({status : 500, data : "Error al crear la ruta"})
        }
    });
}

const deleteAllPostsByUser = async (id) =>{
    await Post.deleteMany({user : id})
    .then((posts)=>{
        for(let post in posts){
            deletePostPhotos(post);
        }
        return true;
    })
    .catch(error =>{
        console.log(error);
        return false;
    })
}

const deletePostById = async (id)=>{
    let response = false;
    await Post.findByIdAndDelete(id)
    .then(async (postFound) =>{
        if(postFound != null){
            deletePostPhotos(postFound)
            response = true;
        }
    })
    .catch(error =>{
        console.log(error)
    })
    return response
}


const updatePost = async (id, newData) =>{
    return await Post.updateOne({_id : id}, newData).clone()
    .catch(error =>{
        console.log(error)
    })
}

// const addPhoto = async(body) =>{
//     const post = await Post.findOne({_id : body.id});
//     await writePostPhoto(post, body).then(async updated =>{
//         await Post.updateOne(updated);
//         return true;
//     })
//     .catch(error =>{
//         console.log(error);
//         return false
//     })  
// }



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
    // addPhoto
}