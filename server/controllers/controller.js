const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {User} = require('../models');

class Controller {
    static async userRegister(req, res, next){
        try {
            let {name, email, password} = req.body
            let user = await User.create({
                name, 
                email,
                password
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

            console.log(email, password);
            
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

            console.log("User Valid");

            const token = signToken({
                id: user.id,
                name: user.name,
                email: user.email
            })

            res.status(200).json({
                access_token: token,
                currentId: user.id,
                name: user.name,
                email: user.email,
                imageUrl: user.imageUrl
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            let {email, displayName, photoURL} = req.body
            
            let [user, created] = await User.findOrCreate({
                where: {
                    email
                },
                defaults: {
                    email,
                    name: displayName,
                    imageUrl: photoURL,
                    password: Math.random() * 5000
                },
                hooks: false
            })

            const token = signToken({
                id: user.id,
                name: user.name,
                email: user.email
            })

            res.status(200).json({
                access_token: token,
                currentId: user.id,
                name: user.name,
                email: user.email,
                imageUrl: user.imageUrl
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getAllUsers(req, res, next){
        try {
            let user = await User.findAll({
                attributes:{
                    exclude: ["password", "createdAt", "updatedAt"]
                }
            })

            res.status(200).json(user)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getUserById(req, res, next){
        try {
            let {id} = req.params

            let user = await User.findByPk(id)

            if(!user){
                throw {name:"NotFound"}
            }

            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                imageUrl: user.imageUrl
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = Controller