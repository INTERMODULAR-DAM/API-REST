
const User = require('../models/user')

const identifyId = async (userId) =>{
    let json;
    if(userId.includes('@')){
        json = {email: userId}
    }else if(!isNaN(userId)){
        json = {phone_number : userId};
    }else{
        json = {nick : userId};
    }
    return await User.findOne(json, 'admin password');
}

async function createUser(data){
    let model = {
        email : data.email,
        name: data.name,
        lastname : data.lastname,
        nick : data.nick,
        password : data.password,
        admin : data.admin,
        web : data.web,
        pfp_path : data.pfp,
        phone_number : data.phone_number
      }
      model = changeTypes(model)
      return model ;
    }
  
function changeTypes(model){
    console.log(model.admin)
    model.phone_number = Number(model.phone_number);
    if(model.web == undefined || model.web == '')
      delete model.web;
    if(model.pfp_path == undefined ||model.pfp_path == '')
      delete model.pfp_path;
    if(model.admin == undefined)
      delete model.admin;
    else
      model.admin = (model.admin === "true" || model.admin == true); 
    return model
  }

module.exports = {
    createUser,
    identifyId
}