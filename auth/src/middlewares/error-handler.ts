import { Request, Response, NextFunction } from "express"
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorhandler = (err: Error, req: Request, res: Response, next: NextFunction)=>{
  if(err instanceof RequestValidationError){
    const formattedError = err.errors.map(item =>{
      return {
        message: item.msg,
        field: item.param
       }
    })
    return res.status(400).send({errors: formattedError})        
  }

  if( err instanceof DatabaseConnectionError){
    console.log('this is a database connection error')
  }
  

  res.status(400).send({
    message: err.message
  })
}

