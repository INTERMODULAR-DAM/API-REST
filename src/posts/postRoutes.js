let express = require('express');
let router = express();
const auth = require('../globalMiddlewares/auth')
const postController = require('./controllers/postController')
const validation = require('../globalMiddlewares/validation')

router
  .get('/all',auth, postController.getAllPosts)
  .get('/', auth, postController.getPostById)
  .post('/', auth, validation.postCheck(), postController.createPost)
  .patch('/', auth, postController.updatePost)
  // .patch('/addPhoto', auth, postController.addPhoto)
  .delete('/', auth, postController.deletePost)
  .delete('/all', auth, postController.deleteAllPosts)


module.exports = router;