const User = require('../database/models/user')
const imageOperation = require('../utils/imageUtils')
const service = require('../services/autentication');
const {identifyId} = require('../utils/userUtils')

const getUserById = async (_id)=>{
    let user = await User.findById(_id)
    if(user != null){
        user = await imageOperation.asignPhoto(user);
    }
    return user;
}

const getAllUser = async () =>{
    let allUsers =  await User.find((error, users) => {
        if(error){
          console.log("ERROR:", error);
        }
      }).clone()
      allUsers = await imageOperation.asignPhoto(allUsers);
      return allUsers;
}

const signIn = async (userId,password) =>{
    const searchedUser = await identifyId(userId, password);
    if(searchedUser != null && await service.comparePassword(password, searchedUser.password)){
        return {status : true, token : service.createToken(searchedUser)}
    }
    else{
        return {status : false, message : "El usuario o la contraseña son incorrectas, inténtelo de nuevo"}
    }
        
}

const signUp = async (user, body) =>{
    if(body.pfp){
        user.pfp_path = imageOperation.writeImage(body);
    }
    user.password = await service.encrypt(user.password);
    let token= await new Promise((resolve,reject) =>{
        try {
            new User({...user}).save((err) => {
                if (err) {
                    reject(err)
                    console.log(err)
                }
            }); 
            resolve(service.createToken(user))
        } catch (error) {
            console.log(error);
            reject({status : 500, data : "Error inesperado"});
        }
    }) 
    return token;
}

const updateUser = async (id, changes) =>{
    const oldUser = await User.findById(id);
    console.log(changes)
    await User.findOneAndUpdate({_id : id}, changes);
    if(changes.pfp_path != undefined && changes.pfp !=null){
        imageOperation.deleteImage(oldUser.pfp_path)
        changes.pfp_path = imageOperation.writeImage(changes)
        await User.findOneAndUpdate({_id : id,}, {pfp_path : changes.pfp_path})
    }
}

const deleteUser = async (id) =>{
    let response;
    await User.findOneAndDelete(id).then(result => {
    console.log(result)
    response = false;
    if(result != null){
        response = true;
        imageOperation.deleteImage(result.pfp_path)
    }
    }).catch(error => {
      console.log(error);
    })
    return response;
}

module.exports = {
    getAllUser,
    //getUserByEmail,
    signIn,
    signUp,
    updateUser,
    deleteUser,
    getUserById
}
