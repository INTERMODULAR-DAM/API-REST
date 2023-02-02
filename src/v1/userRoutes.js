const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const validation = require('../middlewares/validation')
const userController = require('../controllers/userController')

router
  .get('/all',auth, userController.getAllUser)
  .get('/', auth, userController.getUserById)
  .post('/signIn', userController.signIn)
  .post('/signUp',validation.signUpCheck(), userController.signUp)
  .patch('/', auth, userController.updateUser)
  .delete('/', auth, userController.deleteUser)

module.exports = router;
