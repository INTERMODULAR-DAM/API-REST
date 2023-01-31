const service = require('../services/autentication')

function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(404).send({status : 401, message : "No tienes autorización"})
    }

    const token = req.headers.authorization.split(" ")[1]
    service.decodeToken(token)
    .then(response=>{
        req.user = response;
        next();
    })
    .catch(response=>{
        res.status(response.status).send(response)
    })
}




module.exports = isAuth