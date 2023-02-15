const imageService = require('../services/imageService')


const uploadUserPFP = async (req,res)=>{
    await imageService.uploadUserPFP(req.headers.id, req.fileName)
    .then(response =>{
        if(response){
            console.log("actualizado")
            return res.status(200).send({status : 200, data : "Image uploaded correctly"})
        }
    }).catch(error =>{
        console.log(error)
        return res.status(500).send({status : 500, data : "An internal error has ocurred, please contact with your administrator"})
    })
    
}
const uploadPostPhotos = async(req,res) =>{
    let {response} = req
        if(response){
            res.status(200).send({status : 200, data : "The photo has uploaded successfully"});
        }else{
            res.status(400).send({status : 400, data : "The photo has not been uploaded. The limit is 7"});
        }
}



module.exports = {
    uploadUserPFP,
    uploadPostPhotos
}
