const express = require('express')
require('express-async-errors');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const currentUserRouter = require('./auth/routers/current-user')
const signInRouter = require('./auth/routers/signin')
const signOutRouter = require('./auth/routers/signout')
const signUpRouter = require('./auth/routers/signup')
const errorHandler = require('./auth/middlewares/error-handler')
const NotFoundError = require('./auth/errors/not-found-error')


const app = express()

app.set('trust proxy', true);
app.use(bodyParser.json())
app.use(cookieParser())

app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(currentUserRouter)

app.all('*', (req, res) => {
    throw new NotFoundError();
});
  
app.use(errorHandler);

module.exports = { app }
