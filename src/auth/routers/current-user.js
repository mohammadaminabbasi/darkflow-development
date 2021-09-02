const express = require('express')
const currentUser = require('../middlewares/current-user');

const router = express.Router()

router.get('/api/auth/currentuser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
})

module.exports = router