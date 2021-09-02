const express = require('express')
const { body } = require('express-validator')
const jwt = require('jsonwebtoken');
const validateRequest = require('../middlewares/validate-request');
const BadRequestError = require('../errors/bad-request-error');
const { User } = require('../models/user');
const { keys } = require('../../../web-config')
const router = express.Router()

router.post('/api/auth/signup',
   [
       body('email')
        .isEmail()
        .withMessage('Email must be valid'),
       body('password')
        .trim()
        .isLength({max:20, min:6})
        .withMessage('password must be between 6 and 20 characters'),
       body('username')
        .notEmpty()
        .withMessage('username is not entered')
   ], 
   validateRequest,
   async (req, res) => {
       const { password, email, username } = req.body
       const existingUser = await User.findOne({ $or:[{ email },{ username }] });
       
       if (existingUser) {
           throw new BadRequestError('Email or Username in use');
       }

       const user = User.build({ email, password, username });
       await user.save();

       const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
            keys.JWT_KEY
        );

        res.cookie("jwt", userJwt,  {httpOnly: true})
        res.status(201).send({ user, token: userJwt });
   }
)

module.exports = router