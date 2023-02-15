const {check} = require('express-validator');
const User = require('../../users/models/user')



const postCheck = () =>{
    return [
        check('name')
        .notEmpty()
        .isAlpha('es-ES', {ignore : ' '})
        .withMessage('You sent a invalid name, please fix it'),

        check('category')
        .notEmpty()
        .matches(/Hiking|Roller Skating|Kayaking/g)
        .withMessage('You sent a invalid category, please fix it'),

        check('distance')
        .notEmpty()
        .withMessage("Distance is required"),

        check('difficulty')
        .notEmpty()
        .matches(/Easy|Medium|Hard|Expert/g)
        .withMessage('You sent a invalid difficulty, please fix it'),

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
        .custom(async user=>{
            await User.findById(user)
            .then(userFound=>{
                if(!userFound)
                    throw new Error("User need to be real, please check")
            })
            
        })
    ]
}


module.exports = postCheck;