const {check} = require('express-validator');
const User = require('../../users/models/user')

const signUpCheck = ()=>{
    return [
        check('email')
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (email)=>{
            const searchedEmail = await User.find({email : email});
            if(searchedEmail.length > 0)
                throw new Error("Email already in use")
        }),

        check('nick')
        .trim()
        .notEmpty()
        .isAlphanumeric()
        .withMessage('Invalid nick')
        .custom(async (nick) =>{
            const searchedNick = await User.find({nick : nick})
            if(searchedNick.length > 0)
                throw new Error('Nick already in use')
        }),

        check('phone_number')
        .trim()
        .notEmpty()
        .isMobilePhone('es-ES')
        .withMessage('Invalid phone number')
        .custom(async (phone)=>{
            const searchedPhone = await User.find({phone_number : phone})
            if(searchedPhone.length > 0)
                throw new Error('Phone number already in use')
        }),

        check('name')
        .trim()
        .notEmpty()
        .isAlpha()
        .withMessage("Invalid name"),

        check('lastname')
        .notEmpty()
        .isAlpha('es-ES', {ignore : ' '})
        .withMessage("Invalid lastname"),

        check('password')
        .trim()
        .notEmpty()
        .isStrongPassword()
        .withMessage("Weak password")
    ]
}

const updateUserCheck = ()=>{
    return [
        check('email')
        .trim()
        .notEmpty()
        .isEmail(),

        check('nick')
        .trim()
        .notEmpty()
        .isAlphanumeric()
        .withMessage('Invalid nick'),

        check('phone_number')
        .trim()
        .notEmpty()
        .isMobilePhone('es-ES')
        .withMessage('Invalid phone number'),

        check('name')
        .trim()
        .notEmpty()
        .isAlpha()
        .withMessage("Invalid name"),

        check('lastname')
        .notEmpty()
        .isAlpha('es-ES', {ignore : ' '})
        .withMessage("Invalid lastname"),
    ]
}

module.exports = {
    signUpCheck,
    updateUserCheck
}