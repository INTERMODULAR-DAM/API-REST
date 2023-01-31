const fs = require('fs');
const mime = require('mime');
const Post = require('../database/models/post');

function deleteImage(pfp){
    if(pfp != 'default.jpeg'){
        let path_temp = './src/public/images/users/' + pfp;
        fs.unlinkSync(path_temp);
      }
}

function writeImage(body){
   if(body.pfp_path != 'default.jpeg'){
    let ext = mime.getExtension(mime.getType(body.pfp_path));
    let pfp = body.nick + '.' + ext;
    let pfp_path = './src/public/images/users/' + pfp ;
    let buf = Buffer.from(body.pfp, 'base64');

    fs.writeFileSync(pfp_path, buf);
    return pfp;
   }
}


async function readImage(pfp_path){
    const data = fs.readFileSync(__dirname + '/../public/images/users/' + pfp_path);
    return Buffer.from(data,'binary').toString('base64');
}


async function asignPhoto(data){
    if(Array.isArray(data)){
        for(let i = 0;i < data.length;i++){
            data[i].pfp_path = await readImage(data[i].pfp_path);
        }      
    }else{
        data.pfp_path = await readImage(data.pfp_path);
    }
    return data
}

async function writePostPhotos(post, body){
        try{
            for(let i = 0; i < body.photos_path.length;i++){
                let ext = mime.getExtension(mime.getType(body.photos_path[i]));
                let photo = post._id + `_${i}` + '.' + ext;
                let photo_path = './src/public/images/posts/' + photo ;
                let buf = Buffer.from(body.photos[i], 'base64');
                fs.writeFileSync(photo_path, buf);
                post.photos[i] = photo
            }
            return post;
        }catch(error){
            console.log(error)
        }
    }
    

module.exports = {
    asignPhoto, 
    readImage,
    writeImage,
    deleteImage,
    writePostPhotos
}