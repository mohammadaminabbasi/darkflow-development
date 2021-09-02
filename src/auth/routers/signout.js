const express = require('express')

const router = express.Router()

router.post('/api/auth/signout', (req, res) => {
    res.clearCookie("jwt")
    res.send({});
})

module.exports = router