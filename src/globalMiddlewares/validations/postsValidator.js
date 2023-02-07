const globalValidations = require('./globalValidations');


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