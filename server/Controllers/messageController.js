const {Conversation, User, Message} = require('../models');

class messageController {
    static async getAllMessage(req, res, next){
        try {
            let message = await Message.findAll({
                include : [
                    {
                        model: Conversation,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: User,
                        attributes: {
                            exclude: ["password", "createdAt", "updatedAt"]
                        }
                    }
                ]
            })

            res.status(200).json(message)
        } catch (error) {
            console.log(error);
            next(error)
        }    
    }

    static async createMessage(req, res, next){
        try {
            const {conversationId, senderId, text} = req.body

            let message = await Message.create({
                conversationId,
                senderId,
                text
            })

            res.status(200).json(message)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getMessageByConversationId(req,res, next){
        try {

            let {conversationId} = req.params

            let message = await Message.findAll({
                where: {
                    conversationId
                }
            })

            res.status(200).json(message)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = messageController