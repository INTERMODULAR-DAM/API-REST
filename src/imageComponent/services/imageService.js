const User = require('../../users/models/user')
const Post = require('../../posts/models/post')

const uploadUserPFP = async (userId,fileName)=>{
    return await User.findByIdAndUpdate(userId, {pfp_path : fileName})
}

const uploadPostPhotos = async (files, id)=>{
    let photos = (await Post.findById(id)).photos
    for(let i = 0; i < files.length;i++){
        photos.push(files[i].filename)
    }
    return await Post.findByIdAndUpdate(id, {photos: photos})
}

module.exports = {
    uploadUserPFP,
    uploadPostPhotos

}