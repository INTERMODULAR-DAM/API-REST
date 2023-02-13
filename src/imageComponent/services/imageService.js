const User = require('../../users/models/user')
const Post = require('../../posts/models/post')

const uploadUserPFP = async (userId,fileName)=>{
    return await User.updateOne({_id : userId}, {pfp_path : fileName})
    .then(user =>{
        if(user == true){
            return true
        }
        return false
    })
}

module.exports = {
    uploadUserPFP,

}