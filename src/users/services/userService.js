const User = require('../models/user')
const service = require('../../globalServices/autentication');
const {identifyId} = require('../utils/userUtils');
const postService = require('../../posts/services/postService');
const commentService = require('../../comments/services/commentService')
const emailUtils = require('../../globalUtils/emailUtils');
const {deleteImage} = require('../../globalUtils/imageUtils');
const dotenv = require('dotenv');
dotenv.config();


const getUserById = async (_id)=>{
    return await User.findById(_id);

}

const getAllUser = async () =>{
    let allUsers =  await User.find((error, users) => {
        if(error){
          console.log("ERROR:", error);
        }
      }).clone()
      return allUsers;
}

const signIn = async (userId,password) =>{
    const searchedUser = await identifyId(userId, password);
    const MAX_LOGIN_ATTEMPS = 5
    const LOCK_TIME= 4*60*60*1000
    let now = Date.now();
    let isLocked = searchedUser.lock_until > now;
    let hasLockExpired = searchedUser.lock_until < now;

    if(isLocked){
        return { status : 400, data : "The account is locked, please wait to sign in"}
    }

    if(hasLockExpired){
        console.log("Expirado")
        searchedUser.lock_until = undefined;
        searchedUser.login_attempts = 0;
        await searchedUser.save();
    }

   return await service.comparePassword(password, searchedUser.password)
    .then(async isMatch =>{
        if(isMatch){
            if(searchedUser.login_attempts > 0)
                await searchedUser.updateOne({$set: {login_attempts : 0}, $unset : {lock_until : 1}})
            return {status : 200, data : service.createToken(searchedUser)} 
        }else{
            let updates = { $inc: {login_attempts: 1}}
		    if (searchedUser.login_attempts + 1 >= MAX_LOGIN_ATTEMPS)
			    updates.$set = {lock_until: now + LOCK_TIME}
            await searchedUser.updateOne(updates)
            return {status : 400, data : "The user or password are incorrect, try again"}
        }
    })
    .catch(error =>{
        console.log(error)
        return {status : 500, data : "An internal error has ocurred, please contact with your administrator"}

    })     
}

const signUp = async (user) =>{
    user.password = await service.encrypt(user.password);
    let token= await new Promise(async (resolve,reject) =>{
         try {
             new User(user).save((err, newUser) => {
                if (err) {
                    reject({status : 400, data : "Some fields were bad, please fix it."})
                    console.log(err)
                } 
                resolve(service.createToken(newUser)); 
            }); 
        } catch (error) {
            console.log(error);
            reject({status : 400, data : "Some fields were bad, please fix it."});
        }
    }) 
    return token;
}

const updateUser = async (id, changes) =>{
    const oldUser = await User.findById(id);
    await User.findOneAndUpdate({_id : id}, changes);
}

const deleteUser = async (id) =>{
    let response;
    await User.findOneAndDelete({_id : id}).then(result => {
        response = false;
        if(result != null){
            response = true;
            console.log(result.pfp_path)
            deleteImage(result.pfp_path);
            postService.deleteAllPostsByUser(id);
            commentService.deleteCommentsByUser(id);
        }
    }).catch(error => {
      console.log(error);
    })
    return response;
}


const sendForgotPasswordEmail = async(email) =>{
    let response = false;
    const user = await User.find({email : email}, 'password');
    console.log(user[0]._id);
    if(user.length >0){
        await emailUtils.sendForgotPasswordEmail(email, user[0].password);
        response = true
    }
    return response;  
}


const followAUser = async (user,userToFollow)=>{
    const userDB = await User.findById(user);
    if(!userDB.following.includes(userToFollow)){
        userDB.following.push(userToFollow);
        await userDB.save();
        return {status : 200, data : "You have followed the user correctly"}
    }else{
        return {status : 400, data : "You already follow this user"}
    } 
}


const unfollowAUser = async (user, userToUnfollow)=>{
    const userDB = await User.findById(user);
    if(userDB.following.includes(userToUnfollow)){
        userDB.following = userDB.following.filter(deleteUser => deleteUser!= userToUnfollow);
        await userDB.save();
        return {status : 200, data : "You have unfollowed the user correctly"}
    }else{
        return {status : 400, data : "You don't follow this user"}
    } 
}

module.exports = {
    getAllUser,
    signIn,
    signUp,
    updateUser,
    deleteUser,
    getUserById,
    sendForgotPasswordEmail,
    followAUser,
    unfollowAUser,
}
