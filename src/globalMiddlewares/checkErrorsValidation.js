const { validationResult } = require('express-validator');

const checkErrors = (req,res,next)=>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({status : 400, data : errors.array()[0].msg })
    }
    return next();
}

module.exports = checkErrors