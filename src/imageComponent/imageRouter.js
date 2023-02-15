const express = require('express')
const {join} = require('path');
const router = express.Router()
const auth = require('../globalMiddlewares/auth')
const imageController = require('./controllers/imageController')
const {multerUserUpload, multerPostUpload} = require('../globalUtils/imageUtils')


router
    .use('/users', express.static(join(__dirname + '/../public/images/users')))
    .use('/posts', express.static(join(__dirname + '/../public/images/posts')))
    .post('/userProfile', auth, multerUserUpload.single('file'), imageController.uploadUserPFP)
    .post('/postPhotos', auth, multerPostUpload.array('files'), imageController.uploadPostPhotos)
//   .delete('userProfile')
//   .delete('/postPhotos')

module.exports = router;
