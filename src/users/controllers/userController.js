const userService = require('../services/userService');
const userUtils = require('../utils/userUtils');

const getUserById = async (req,res)=>{
  let {user} = req
  try{
    const searchedUser = await userService.getUserById(user.sub)
  if(searchedUser != null){
    res.status(201).send({status : 201, data : searchedUser});
  }else{
    res.status(404).send({status : 404, data : "Expired token"})
  }
  }
  catch(error){
    console.log(error)
    res.status(500).send({status : 500})
  }
}

const getAllUser = async (req, res) =>{
  try{
      if(req.user.rol == true){
        const allUsers = await userService.getAllUser();
        res.status(200).send({status : 200, data : allUsers})
      }else{
        res.status(401).send({status : 401, data : "No tienes autorización para ello" })
      }
    }
  catch(error){
    console.log(error)
    res.status(400).send({status : 400, data : "Ha ocurrido un error inesperado"})
  }
}

const signIn = async (req,res) =>{
  await userService.signIn(req.body.id, req.body.password)
    .then((response)=>{
      console.log(response)
      res.status(response.status).send({status : response.status, data : response.data});
    })
    .catch((error)=>{
      console.log(error)
      res.status(401).send({status : 401, error : "Usuario no encontrado"});
    })
    
}

const signUp = async (req, res)=>{
    let {body} = req;
    try{
      const newUser = await userUtils.createUser(body);
      const createdUser = await userService.signUp(newUser,body);
      if(createdUser.status == undefined){
        res.status(200).send({status : 200, data : createdUser })
      }else{
        res.status(401).send(createdUser)
      } 
    }catch(error){
    console.log(error);
    res.status(400).send({status : 400, data : "No se ha podido crear el usuario, falta algún campo por rellenar correctamente"})
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
      res.status(200).send({status : 201, message : "Datos actualizados correctamente"});
    }else{
      res.status(401).send({status : 401, message : "No tienes autorización para actualizar dicho usuario"})
    }
  }catch(error){
      console.log(error)
      res.status(401).send({status :401, error : error})
    }
}

const deleteUser = async (req,res) =>{
    try{
      const{_id} = req.body;
    if(!_id){
       return res.status(401).send({status : 401, data : "No userid"});
    }
      if(user.rol == true || user.sub == _id){
        response = await userService.deleteUser(_id)
        console.log(_id)
        if(response){
          res.status(202).send({status : 202, data : "Usuario eliminado correctamente"})
        }else{
          res.status(401).send({status : 500, data : "Usuario no eliminado, no existe"})
      }
    }else{
      res.status(401).send({status : 401, data : "No tienes autorización para eliminar al usuario"})
    }
    }catch(error){
      console.log(error)
      res.status(400).send({status : 401, error : error})
    }
}


const forgotPassword = async (req, res) =>{
    const {email} = req.body;
    await userService.sendForgotPasswordEmail(email)
    .then(response =>{
        if(response)
          res.status(200).send({status : 200, data : "Email sent successfully"});
        else
          res.status(400).send({status : 400, data : "No account has this email linked, please enter a correct email adress."});
    })
    .catch(error=>{
      console.log(error);
      res.status(500).send({status : 500, data : "An internal error has ocurred"});
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
}
