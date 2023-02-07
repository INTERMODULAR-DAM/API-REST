let express = require('express');
let router = express();
const auth = require('../globalMiddlewares/auth')
const postController = require('./controllers/postController')
const validation = require('../globalMiddlewares/validations/validation')
const checkErrors = require('../globalMiddlewares/checkErrorsValidation');

router
  .get('/all',auth, postController.getAllPosts)
  .get('/', auth, postController.getPostById)
  .get('/allOwnPosts', auth, postController.getAllUserOwnPost)
  .get('/allUserPosts',auth, postController.getAllUserPost)
  .get('/getPublicPosts', auth, postController.getAllPublicPosts)
  .post('/', auth, validation.postCheck(), checkErrors,postController.createPost)
  .patch('/', auth, validation.postCheck(), checkErrors, postController.updatePost)
  // .patch('/addPhoto', auth, postController.addPhoto)
  .delete('/', auth, postController.deletePost)
  .delete('/all', auth, postController.deleteAllPostsByUser)


module.exports = router;