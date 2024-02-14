const {Conversation, User, Message} = require('../models');

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
}

module.exports = conversationController