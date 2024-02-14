const express = require('express')
const userController = require('../Controllers/userController')
const conversationController = require('../Controllers/conversationController')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Success - Welcome Abang Gorrrr!!!")
})

/* Register And Login */
router.post("/register", userController.userRegister)
router.post("/login", userController.userLogin)

/* Create Conversation */
router.post("/conversation", conversationController.createConversation)




module.exports = router