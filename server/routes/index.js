const express = require('express')
const userController = require('../Controllers/userController')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Success - Welcome Abang Gorrrr!!!")
})

/* Register */
router.post("/register", userController.userRegister)
router.post("/login", userController.userLogin)


module.exports = router