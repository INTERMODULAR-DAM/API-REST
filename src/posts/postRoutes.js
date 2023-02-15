let express = require('express');
let router = express();
const auth = require('../globalMiddlewares/auth');
const postController = require('./controllers/postController');
const validation = require('../globalMiddlewares/validations/postsValidator');
const checkErrors = require('../globalMiddlewares/checkErrorsValidation');

router
  .get('/all',auth, postController.getAllPosts)
  .get('/', auth, postController.getPostById)
  .get('/allOwnPosts', auth, postController.getAllUserOwnPost)
  .get('/allUserPosts',auth, postController.getAllUserPost)
  .get('/getPublicPosts', auth, postController.getAllPublicPosts)
  .post('/', auth, validation(), checkErrors,postController.createPost)
  .patch('/', auth, validation(), checkErrors, postController.updatePost)
  .delete('/', auth, postController.deletePost)
  .delete('/all', auth, postController.deleteAllPostsByUser)


module.exports = router;