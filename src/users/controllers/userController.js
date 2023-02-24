const userService = require('../services/userService');
const userUtils = require('../utils/userUtils');

const getUserById = async (req,res)=>{
  let _id;
  if(req.headers._id != undefined){
    _id = req.headers._id
  }else{
    _id = req.user.sub
  }
  try{
    const searchedUser = await userService.getUserById(_id)
  if(searchedUser != null){
    res.status(201).send({status : 201, data : searchedUser});
  }else{
    res.status(404).send({status : 404, data : "This user doesn't exist"})
  }
  }
  catch(error){
    res.status(500).send({status : 500, data : "An internal error has ocurred"})
  }
}

const getAllUser = async (req, res) =>{
  try{
      if(req.user.rol == true){
        const allUsers = await userService.getAllUser();
        res.status(200).send({status : 200, data : allUsers})
      }else{
        res.status(401).send({status : 401, data : "You don't have authorization to do this." })
      }
    }
  catch(error){
    res.status(500).send({status : 500, data : "An expected error has ocurred."})
  }
}

const getFollowers = async (req,res) =>{
    const {_id} = req.body;
    await userService.getFollowers(_id)
    .then(followers =>{
      if(followers){
        return res.status(200).send({status: 200, data : followers});
      }
      return res.status(400).send({status : 400, data : "Something went wrong, please try again."})
    })
    .catch(error=>{
      return res.status(500).send({status : 500, data : "An internal error has ocurred, please contact with your administrator"})
    })
}

const signIn = async (req,res) =>{
  await userService.signIn(req.body.id, req.body.password)
    .then((response)=>{
      res.status(response.status).send({status : response.status, data : response.data});
    })
    .catch((error)=>{
      res.status(500).send({status : 500, data : "User not found"});
    })
    
}

const signUp = async (req, res)=>{
    let {body} = req;
    try{
      const newUser = await userUtils.createUser(body);
      const createdUser = await userService.signUp(newUser);
      if(createdUser.status == undefined){
        res.status(200).send({status : 200, data : createdUser })
      }else{
        res.status(401).send(createdUser)
      } 
    }catch(error){
    res.status(500).send({status : 500, data : "The user could not be created, some fields have not been filled in correctly."})
    }
}
const updateUser = async (req, res) =>{
  const {body} = req
  const {_id} = body;
  const {user} = req
  delete body.pfp_path
  try{
    if(user.rol ||_id == user.sub){
      if(body.password){
        body.password = await service.encrypt(body.password)
      }
      await userService.updateUser(_id, body)
      res.status(200).send({status : 201, message : "Data has been updated successfully."});
    }else{
      res.status(401).send({status : 401, message : "You don't have authorization to update this user."})
    }
  }catch(error){
      res.status(500).send({status :500, data : "An internal error has ocurred"})
    }
}

const deleteUser = async (req,res) =>{
    try{
      const{_id} = req.body;
      const {user} = req;
    if(!_id){
       return res.status(401).send({status : 401, data : "You didn't send a user id."});
    }
      if(user.rol == true || user.sub == _id){
        response = await userService.deleteUser(_id)
        if(response){
          res.status(202).send({status : 202, data : "The user has been deleted successfully."})
        }else{
          res.status(401).send({status : 500, data : "User not deleted, doesn't exist."})
      }
    }else{
      res.status(401).send({status : 401, data : "You don't have authorization to remove this user."})
    }
    }catch(error){
      res.status(500).send({status : 500, data : "An internal error has ocurred"})
    }
}


const forgotPassword = async (req, res) =>{
    const {email} = req.body;
    await userService.sendForgotPasswordEmail(email)
    .then(response =>{
        if(response)
          res.status(200).send({status : 200, data : "The email has been sent successfully"});
        else
          res.status(400).send({status : 400, data : "No account has this email linked, please enter a correct email adress."});
    })
    .catch(error=>{
      res.status(500).send({status : 500, data : "An internal error has ocurred"});
    })

}

const followAUser = async (req,res) =>{
  await userService.followAUser(req.user.sub, req.body.userToFollow)
  .then(response =>{
    if(response.status == 200){
      return res.status(response.status).send({status : response.status, data : response.data});
    }else{
      return res.status(response.status).send({status : response.status, data : response.data});
    }
  })
  .catch(error=>{
    return res.status(500).send({status : 500, data : "An internal error has ocurred"})
  })
}

const unfollowAUser = async (req,res) =>{
  await userService.unfollowAUser(req.user.sub, req.body.userToUnfollow)
  .then(response =>{
    if(response.status == 200){
      return res.status(response.status).send({status : response.status, data : response.data});
    }else{
      return res.status(response.status).send({status : response.status, data : response.data});
    }
  })
  .catch(error=>{
    return res.status(500).send({status : 500, data : "An internal error has ocurred"})
  })
}

module.exports = {
  getAllUser,
  signIn,
  signUp,
  updateUser,
  deleteUser,
  getUserById,
  forgotPassword,
  followAUser,
  unfollowAUser,
  getFollowers,
}
