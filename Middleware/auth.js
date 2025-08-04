const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 1. se extrae el token de las cookies y luego se verifica el token para saber que el usuario esta autenticado
const userExtractor = async (request, response, next) =>{
    try {
        const token = request.cookies?.accessToken;
        if(!token){
            return response.sendStatus(401);
        }
        
        
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        request.user = user;
        
    } catch (error) {
        
        return response.sendStatus(403)

    }


next();
};

module.exports = { userExtractor }