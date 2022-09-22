import express from 'express'
import {body} from 'express-validator'

const router = express.Router()

router.post('/api/users/signup', (req, res)=>{
  const { email, password } = req.body

  if(!email || typeof email !== 'string'){
    res.status(400).send('Provide a valid email')
  }

  // new User({ email, password })
  const user = {email, password}


  res.status(201).send(user)
})

export { router as signupRouter }