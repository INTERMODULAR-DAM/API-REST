const express = require('express')
const router = express.Router()
const auth = require('../globalMiddlewares/auth');
const commentController = require('./controllers/commentController')

router
.get('/', auth, commentController.getAllComments)
.get('/getComments', auth, commentController.getAllPostsComments)
.post('/', auth, commentController.createComment)
.delete('/', auth, commentController.deleteComment)
.delete('/deleteAll', auth, commentController.deleteAll)


module.exports = router;