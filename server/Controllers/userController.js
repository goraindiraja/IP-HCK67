const { comparePassword } = require('../helpers/bcrypt');
const {signToken} = require('../helpers/jwt');
const {User} = require('../models');

class userController {
    static async userRegister(req, res, next){
        try {    
            let {name, email, password, imageUrl} = req.body
            let user = await User.create({
                name, 
                email,
                password,
                imageUrl
            })

            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async userLogin(req, res, next){
        try {
            
            let {email, password} = req.body

            if(!email || !password){
                throw {name: "InvalidInput"}
            }

            let user = await User.findOne({
                where: {
                    email
                }
            })

            console.log(user);

            if(!user || !comparePassword(password, user.password)){
                throw {name: "InvalidUser"}
            }

            const token = signToken({
                id: user.id,
                name: user.name,
                email: user.email
            })

            res.status(200).json({access_token: token})

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = userController