const MIMETYPES = ['image/jpg', 'image/jpeg', 'image/png']
const multer = require('multer');
const {join, extname} = require('path');
const fs = require('fs');
const User = require('../users/models/user');


const multerUserUpload = multer({
    storage : multer.diskStorage({
        destination : join(__dirname + '/../public/images/users'),
        filename: async (req,file,cb) =>{
            const fileExtension = extname(file.originalname);
            let user = await User.findById(req.headers.id)
            deleteImage(user.pfp_path);
            const fileName = user.nick;
            if(file.originalname == "default.jpeg"){
                cb(null, `default.jpeg`)
            }else{
                cb(null, `${fileName}${fileExtension}`)
            }
        },
    }),
    fileFilter : (req,file,cb)=>{
        if(MIMETYPES.includes(file.mimetype))
            cb(null, true)
        else{
            console.log(file)
            cb(new Error("This image extension is not allowed"))
        }
            
    },
    limits : {fieldSize : 100000000}
})

const multerPostUpload = multer({
   storage :  multer.diskStorage({
    destination : (req,files,cb)=>{
        const {_id} = req.headers;
        let path = __dirname + '/../public/images/posts/' + _id;
        if(fs.existsSync(path)){
            cb(null, path);
        }else{
            fs.mkdir(path,(error,dir)=>{
                cb(error, path);
            });
        }
    },
    filename :  async (req,files,cb)=> {
        const {_id} = req.headers;
        let path = __dirname + '/../public/images/posts/' + _id;
        
        let numPhotos = await new Promise((resolve,reject)=>{
            fs.readdir(path, (error, files)=>{
                if(error){
                    cb(error); 
                }
                resolve(files.length);
            });
        }) 
        if(numPhotos >= 7){
            cb(new Error("Can't upload"))

        }else{
            const fileExtension = extname(files.originalname)
            let name = `${_id}_${numPhotos}${fileExtension}`;
            cb(null,name)
        }
    }
   }),
   fileFilter : (req,files,cb)=>{
        if(MIMETYPES.includes(files.mimetype))
            cb(null, true)
        else{
            console.log(files)
            cb(new Error("This image extension is not allowed"))
        }     
    },
    limits : {fieldSize : 10000000}
})

function deleteImage(pfp){
    let path = './src/public/images/users/' + pfp;
    console.log()
    if(pfp != "default.jpeg" && fs.existsSync(path)){
        console.log("borrado")
        fs.unlinkSync(path);
      }
}

function deleteImages(id){
    let path = `./src/public/images/posts/${id}`
    if(fs.existsSync(path)){
        fs.rm(path, { recursive: true }, ()=>{console.log("folder removed")});
        }
}

module.exports = {
    multerUserUpload,
    multerPostUpload,
    deleteImages,
    deleteImage,
}