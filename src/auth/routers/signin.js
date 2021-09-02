const express = require('express')
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const validateRequest = require('../middlewares/validate-request');
const BadRequestError = require('../errors/bad-request-error');

const Password = require('../services/password');
const { User } = require('../models/user');
const { keys } = require('../../../web-config')

const router = express.Router()

router.post('/api/auth/signin', 
[
    body('username')
      .notEmpty()
      .withMessage('username is not entered'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
],
    validateRequest,

async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username
      },
      keys.JWT_KEY
    );

    // Store it on session object
    res.cookie("jwt", userJwt,  {httpOnly: true})

    res.status(200).send({ user: existingUser, token: userJwt });
})

module.exports = router