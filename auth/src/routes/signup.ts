import express, {Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import { User } from '../models/user'
import { RequestValidationError } from '../errors/request-validation-error'
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router()

router.post('/api/users/signup', [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({min: 4, max:20}).withMessage('Password must be between 4 and 20 characters')
],
 async(req: Request, res: Response)=>{
  const errors = validationResult(req) // this is an object  

  if(!errors.isEmpty()){
    /* return res.status(400).send(errors.array()) */
    throw new RequestValidationError(errors.array())
  }

  const { email, password } = req.body

  const existingUser = await User.findOne({email})

  if(existingUser){
/*     console.log('Email in use')
    return res.send({}) */
    throw new BadRequestError('Email already exists')
  }

  // Hash password 
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.build({    
    email,
    password: hashedPassword
  })

  await user.save()

  if(user){
    res.status(201).send(user)
  }

})

export { router as signupRouter }