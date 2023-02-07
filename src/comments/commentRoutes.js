const express = require('express');
const router = express.Router();
const auth = require('../globalMiddlewares/auth');
const commentController = require('./controllers/commentController');
const checkErrors = require('../globalMiddlewares/checkErrorsValidation');
const validation = require('../globalMiddlewares/validations/commentsValidator')

router
.get('/', auth, commentController.getAllComments)
.get('/getComments', auth, commentController.getAllPostsComments)
.post('/', auth, validation() ,checkErrors,commentController.createComment)
.delete('/', auth, commentController.deleteComment)
.delete('/all', auth, commentController.deleteAll)


module.exports = router;