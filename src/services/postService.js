const Post = require('../database/models/post');
const { writePostPhotos } = require('../utils/imageUtils');


const getAllPosts = async ()=>{
    return await Post.find()
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
                    newPost = writePostPhotos(post, body);
                    await Post.updateOne(newPost);
                }
            })
            resolve("Ruta creada correctamente")
        } catch (error) {
            reject({status : 500, data : "Error al crear la ruta"})
        }
    });
}

const deleteAllPosts = async () =>{
    await Post.deleteMany()
    .then(()=>{
        return true;
    })
    .catch(error =>{
        console.log(error);
        return false;
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
    deleteAllPosts,
    // addPhoto
}