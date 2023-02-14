const {check} = require('express-validator');
const User = require('../../users/models/user')

const signUpCheck = ()=>{
    return [
        check('email')
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("You sent a invalid email, please fix it")
        .custom(async (email)=>{
            const searchedEmail = await User.find({email : email});
            if(searchedEmail.length > 0)
                throw new Error("This email is already in use")
        }),

        check('nick')
        .trim()
        .notEmpty()
        .isAlphanumeric()
        .withMessage('You sent a invalid nick, please fix it')
        .custom(async (nick) =>{
            const searchedNick = await User.find({nick : nick})
            if(searchedNick.length > 0)
                throw new Error('This nick is already in use')
        }),

        check('phone_number')
        .trim()
        .notEmpty()
        .isMobilePhone('es-ES')
        .withMessage('You sent a invalid phone number, please fix it')
        .custom(async (phone)=>{
            const searchedPhone = await User.find({phone_number : phone})
            if(searchedPhone.length > 0)
                throw new Error('This phone number is already in use')
        }),

        check('name')
        .trim()
        .notEmpty()
        .isAlpha('es-ES', {ignore : ' '})
        .withMessage("You sent a invalid name, please fix it"),

        check('lastname')
        .notEmpty()
        .isAlpha('es-ES', {ignore : ' '})
        .withMessage("You sent a invalid lastname, please fix it"),

        check('password')
        .trim()
        .notEmpty()
        .isStrongPassword()
        .withMessage("You sent a weak password , please fix it")
    ]
}

const updateUserCheck = ()=>{
    return [
        check('email')
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("You sent a invalid email, please fix it"),

        check('nick')
        .trim()
        .notEmpty()
        .isAlphanumeric()
        .withMessage('You sent a invalid nick, please fix it'),

        check('phone_number')
        .trim()
        .notEmpty()
        .isMobilePhone('es-ES')
        .withMessage('You sent a invalid phone number, please fix it'),

        check('name')
        .trim()
        .notEmpty()
        .isAlpha()
        .withMessage("You sent a invalid name, please fix it"),

        check('lastname')
        .notEmpty()
        .isAlpha('es-ES', {ignore : ' '})
        .withMessage("You sent a invalid lastname, please fix it"),
    ]
}

module.exports = {
    signUpCheck,
    updateUserCheck
}