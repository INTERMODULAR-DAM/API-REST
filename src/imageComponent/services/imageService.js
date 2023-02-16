const User = require('../../users/models/user')
const Post = require('../../posts/models/post')

const uploadUserPFP = async (userId,fileName)=>{
    return await User.findByIdAndUpdate(userId, {pfp_path : fileName})
    .catch(error=>{
        console.log(error);
    })
}

const uploadPostPhotos = async (files, id)=>{
    let photos = (await Post.findById(id)).photos
    for(let i = 0; i < files.length;i++){
        photos.push(files[i].filename)
    }
    console.log(photos)
    return await Post.findByIdAndUpdate(id, {photos: photos})
    .catch(error =>{
        console.log(error);
    })
}

module.exports = {
    uploadUserPFP,
    uploadPostPhotos

}