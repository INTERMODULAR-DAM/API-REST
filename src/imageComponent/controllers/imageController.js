const imageService = require('../services/imageService')


const uploadUserPFP = async (req,res)=>{
    await imageService.uploadUserPFP(req.user.sub, req.fileName)
    .then(response =>{
        if(response){
            return res.status(200).send({status : 200, data : "Image uploaded correctly"})
        }
    }).catch(error =>{
        console.log(error)
        return res.status(500).send({status : 500, data : "An internal error has ocurred, please contact with your administrator"})
    })
    
}


const uploadPostPhotos = async(req,res) =>{

}



module.exports = {
    uploadUserPFP,
    uploadPostPhotos
}
