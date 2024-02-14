const {Conversation, User, Message} = require('../models');
const { Op } = require("sequelize");

class conversationController {

    static async getAllConversation(req,res,next){
        try {
            let conversation = await Conversation.findAll({
                include: [
                    {
                        model: User,
                        as: "sender",
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: User,
                        as: "receiver",
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            })

            res.status(200).json(conversation)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    // static async createConversation (req, res, next){
    //     try {
    //         let {senderId, receiverId} = req.body
            
    //         let conversation = await Conversation.create({
    //             senderId,
    //             receiverId
    //         })

    //         res.status(200).json(conversation)

    //     } catch (error) {
    //         console.log(error);
    //         next(error)
    //     }
    // }

    static async getUserConversation(req, res, next){
        try {
            const {receiverId} = req.params

            let [conversation, created] = await Conversation.findOrCreate({
                where: {
                    [Op.or]: [
                        { senderId: req.user.id, receiverId: receiverId},
                        { senderId: receiverId, receiverId: req.user.id }
                    ]
                },
                defaults: {
                    senderId: req.user.id,
                    receiverId: receiverId
                }
            })

            return res.status(200).json(conversation)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = conversationController