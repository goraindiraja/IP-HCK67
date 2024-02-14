const express = require('express')
const userController = require('../Controllers/userController')
const conversationController = require('../Controllers/conversationController')
const messageController = require('../Controllers/messageController')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Success - Welcome Abang Gorrrr!!!")
})

/* Register And Login */
router.post("/register", userController.userRegister)
router.post("/login", userController.userLogin)

/*Get All Users*/
router.get("/users", authentication ,userController.getAllUsers)

/* Create Conversation */
// router.post("/conversation", conversationController.createConversation)

/* Get All Conversation */
router.get("/conversation", conversationController.getAllConversation)

/* Get Conversation By UserId */
router.get("/conversation/:receiverId", authentication, conversationController.getUserConversation)

//Get All Message
router.get("/message", messageController.getAllMessage)

/* Create new Message */
router.post("/message", messageController.createMessage)

/* Get Message by Conversation Id */
router.get("/message/:conversationId", messageController.getMessageByConversationId)


module.exports = router