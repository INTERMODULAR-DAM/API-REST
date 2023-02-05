const {check} = require('express-validator');
const User = require('../users/models/user')

const signUpCheck = ()=>{
    return [
        check('email')
        .trim()
        .notEmpty()
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

const postCheck = () =>{
    return [
        check('name')
        .notEmpty()
        .isAlpha('es-ES', {ignore : ' '})
        .withMessage('Invalid name'),

        check('category')
        .notEmpty()
        .matches(/Hiking|Roller skating|Kayaking/g)
        .withMessage('Invalid category, please check it'),

        check('distance')
        .notEmpty()
        .withMessage("Distance is required"),

        check('difficulty')
        .notEmpty()
        .matches(/Easy|Medium|Hard|Expert/g)
        .withMessage('Invalid difficulty, please check it'),

        check('track')
        .notEmpty()
        .withMessage("Track is required"),

        check('duration')
        .notEmpty()
        .withMessage("Duration is required"),

        check('privacity')
        .notEmpty()
        .withMessage("Privacity is required"),

        check('user')
        .notEmpty()
        .isMongoId()
        .withMessage("Invalid user")
        .custom(async user=>{
            await User.findById(user)
            .then(userFound=>{
                if(!userFound)
                    throw new Error("User need to be real, please check")
            })
        })

    ]
}


module.exports = {
    signUpCheck,
    updateUserCheck,
    postCheck,
}