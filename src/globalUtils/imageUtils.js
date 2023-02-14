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
                req.fileName =  `default.jpeg`;
                cb(null, `default.jpeg`)
            }else{
                req.fileName =  `${fileName}${fileExtension}`;
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
    destination : join(__dirname + '/../public/images/posts'),
    filename :  (req,files,cb)=> {
        const {id} = req.headers;
        if(post.photos >= 7){
            req.response = false;
            cb(new Error("Can't upload"))
        }else{
            const fileExtension = extname(files.originalname)
            let name = `${id}_${numberImage}${fileExtension}`;
            req.response = true
            cb(null, name)
        }
    }
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

function deleteImage(pfp){
    if(pfp != 'default.jpeg'){
        let path = './src/public/images/users/' + pfp;
        fs.unlinkSync(path);
      }
}

module.exports = {
    multerUserUpload,
    multerPostUpload
}