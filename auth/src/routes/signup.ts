import express, {Request, Response} from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

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

  console.log('Creating a user..')
  /* throw new Error('Error connecting to database') */
  throw new DatabaseConnectionError()
 
  // new User({email, password})
  const user = {email, password}
  

})

export { router as signupRouter }