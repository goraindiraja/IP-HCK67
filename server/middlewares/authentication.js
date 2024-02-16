const { verifyToken } = require("../helpers/jwt");
const {User} = require('../models');

const authentication = async (req, res, next) => {
    let access_token = req.headers.authorization

    try {
        if(!access_token){
            throw {name: "InvalidToken"}
        }

        let [bearer, token] = access_token.split(" ")

        console.log(bearer, token);

        if(bearer !== "Bearer"){
            console.log("InvalidToken");
        }

        let payload = verifyToken(token)
        
        let user = await User.findByPk(payload.id)

        if(!user){
            throw {name: "InvalidToken"}
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = authentication