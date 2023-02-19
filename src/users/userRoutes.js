const express = require('express')
const router = express.Router()
const auth = require('../globalMiddlewares/auth')
const validation = require('../globalMiddlewares/validations/userValidation')
const userController = require('./controllers/userController')
const checkErrors = require('../globalMiddlewares/checkErrorsValidation');


router
  .get('/all',auth, userController.getAllUser)
  .get('/', auth, userController.getUserById)
  .get('/followers', auth, userController.getFollowers)
  .post('/forgotPassword', userController.forgotPassword)
  .post('/signIn', userController.signIn)
  .post('/signUp',validation.signUpCheck(), checkErrors, userController.signUp)
  .patch('/', auth, validation.updateUserCheck(), checkErrors, userController.updateUser)
  .patch('/follow', auth, userController.followAUser)
  .patch('/unfollow', auth, userController.unfollowAUser)
  .delete('/', auth, userController.deleteUser)

module.exports = router;
