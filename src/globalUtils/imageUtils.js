const MIMETYPES = ['image/jpg', 'image/jpeg', 'image/png']
const multer = require('multer');
const {join, extname} = require('path');
const fs = require('fs');
const userService = require('../users/services/userService')

const multerUserUpload = multer({
    storage : multer.diskStorage({
        destination : join(__dirname + '/../public/images/users'),
        filename: async (req,file,cb) =>{
            const fileExtension = extname(file.originalname);
            let user = await userService.getUserById(req.headers.id);
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
   storage : {
    destination : join(__dirname + '/../public/images/posts'),
    filename : {
        
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