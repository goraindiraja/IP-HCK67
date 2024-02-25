const express = require('express');
const Controller = require('../controllers/controller');
const authentication = require('../middlewares/authentication');
const router = express.Router()

const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

router.get('/', (req, res) => {
    res.status(200).json("Server is running")
});

router.post("/register", Controller.userRegister)

router.post("/login", Controller.userLogin)

router.post("/login/Google", Controller.googleLogin)

router.get("/users", authentication, Controller.getAllUsers)

router.get("/users/:id", authentication, Controller.getUserById)

router.put("/users/:id", authentication, Controller.updateUser)

router.patch("/users/:id/img", authentication, upload.single('image'), Controller.updateImage)

module.exports = router