const express = require('express')
const router = express.Router()

router.use("/", (req, res) => {
    res.send("Success - Welcome Abang Gorrrr!!!")
})

module.exports = router