let express = require('express');
let router = express();
const auth = require('../middlewares/auth')
const postController = require('../controllers/postController')


router
  .get('/all',auth, postController.getAllPosts)
  .get('/', auth, postController.getPostById)
  .post('/', auth, postController.createPost)
  .patch('/', auth, postController.updatePost)
  // .patch('/addPhoto', auth, postController.addPhoto)
  .delete('/', auth, postController.deletePost)
  .delete('/all', auth, postController.deleteAllPosts)


module.exports = router;