import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorhandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.settings('trust proxy', true) // proxied through ingress-enginX, so we need to tell express to trust this connectino nonentheless
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true // means cookies will only be used if a user is visiting our application over an HTTP connection
  })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*', async (req, res, next)=>{
  next(new NotFoundError())
})

app.use(errorhandler)

const start = async ()=>{
  try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to MongoDB');
  } catch (err){
    console.log(err);
  }

  app.listen(3000, ()=>{
    console.log('Auth on 3000..')
  })
}

start()


