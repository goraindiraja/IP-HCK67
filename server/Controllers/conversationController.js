const {Conversation, User, Message} = require('../models');
const { Op } = require("sequelize");

class conversationController {
    static async createConversation (req, res, next){
        try {
            let {senderId, receiverId} = req.body
            
            let conversation = await Conversation.create({
                senderId,
                receiverId
            })

            res.status(200).json(conversation)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getUserConversation(req, res, next){
        try {
            const {userId} = req.params

            let conversation = await Conversation.findAll({
                where: {
                    [Op.or]: [
                        { senderId: +userId },
                        { receiverId: +userId }
                    ]
                }
            })

            res.status(200).json(conversation)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = conversationController