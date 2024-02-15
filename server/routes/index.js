const express = require('express');
const Controller = require('../controllers/controller');
const authentication = require('../middlewares/authentication');
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Success - Welcome Abang Gorrrr!!!")
})

router.post("/register", Controller.userRegister)

router.post("/login", Controller.userLogin)

router.post("/login/Google", Controller.googleLogin)

router.get("/users", authentication, Controller.getAllUsers)

router.get("/users/:id", authentication, Controller.getUserById)

module.exports = router