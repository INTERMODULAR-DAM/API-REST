const imageService = require('../services/imageService')


const uploadUserPFP = async (req,res)=>{
    console.log(req.file.filename)
    await imageService.uploadUserPFP(req.headers.id, req.file.filename)
    .then(() =>{
        return res.status(200).send({status : 200, data : "Image uploaded correctly"})

    }).catch(error =>{
        console.log(error)
        return res.status(500).send({status : 500, data : "An internal error has ocurred, please contact with your administrator"})
    })
}
const uploadPostPhotos = async(req,res) =>{
        await imageService.uploadPostPhotos(req.files, req.headers._id)
        .then(()=>{
            return res.status(200).send({status : 200, data : "The photo has uploaded successfully"});
        })
        .catch(error=>{
            console.log(error);
            return res.status(500).send({status : 500, data : "An internal error has ocurred."});
        })
}



module.exports = {
    uploadUserPFP,
    uploadPostPhotos
}
