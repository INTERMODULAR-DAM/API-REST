const {check} = require('express-validator');
const User = require('../database/models/user')

const signUpCheck = ()=>{
    return [
        check('email')
        .trim()
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (email)=>{
            const searchedEmail = await User.find({email : email});
            console.log(searchedEmail)
            if(searchedEmail.length > 0)
                throw new Error("Email already in use")
        }),

        check('nick')
        .trim()
        .not()
        .isEmpty()
        .isAlphanumeric()
        .withMessage('Invalid nick')
        .custom(async (nick) =>{
            const searchedNick = await User.find({nick : nick})
            if(searchedNick.length > 0)
                throw new Error('Nick already in use')
        }),

        check('phone_number')
        .trim()
        .not()
        .isEmpty()
        .isMobilePhone('es-ES')
        .withMessage('Invalid phone number')
        .custom(async (phone)=>{
            const searchedPhone = await User.find({phone_number : phone})
            if(searchedPhone.length > 0)
                throw new Error('Phone number already in use')
        }),

        check('name')
        .trim()
        .not()
        .isEmpty()
        .isAlpha()
        .withMessage("Invalid name"),

        check('lastname')
        .not()
        .isEmpty()
        .isAlpha('es-ES', {ignore : ' '})
        .withMessage("Invalid lastname"),

        check('password')
        .trim()
        .not()
        .isEmpty()
        .isStrongPassword()
        .withMessage("Weak password")
    ]
}

const updateCheck = ()=>{
    return [
        check('email')
        .trim()
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (email)=>{
            const searchedEmail = await User.find({email : email});
            console.log(searchedEmail)
            if(searchedEmail.length > 0)
                throw new Error("Email already in use")
        }),

        check('nick')
        .trim()
        .not()
        .isEmpty()
        .isAlphanumeric()
        .withMessage('Invalid nick')
        .custom(async (nick) =>{
            const searchedNick = await User.find({nick : nick})
            if(searchedNick.length > 0)
                throw new Error('Nick already in use')
        }),

        check('phone_number')
        .trim()
        .not()
        .isEmpty()
        .isMobilePhone('es-ES')
        .withMessage('Invalid phone number')
        .custom(async (phone)=>{
            const searchedPhone = await User.find({phone_number : phone})
            if(searchedPhone.length > 0)
                throw new Error('Phone number already in use')
        }),

        check('name')
        .trim()
        .not()
        .isEmpty()
        .isAlpha()
        .withMessage("Invalid name"),

        check('lastname')
        .not()
        .isEmpty()
        .isAlpha('es-ES', {ignore : ' '})
        .withMessage("Invalid lastname"),
    ]
}


module.exports = {
    signUpCheck,
    updateCheck
}