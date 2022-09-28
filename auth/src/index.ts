import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorhandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*', async (req, res, next)=>{
  next(new NotFoundError())
})

app.use(errorhandler)

app.listen(3000, ()=>{
  console.log('Auth on 3000..')
})

