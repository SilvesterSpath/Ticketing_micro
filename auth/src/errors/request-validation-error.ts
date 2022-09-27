import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

/* interface CustomError{
  statusCode: number;
  serializeErrors(): {
    message: string,
    field?: string
  }[]
} */

export class RequestValidationError extends CustomError {
  statusCode = 400
  constructor(public errors: ValidationError[]){
    super();

    // Only because we are extending a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors(){
   return this.errors.map(item =>{
      return {
        message: item.msg,
        field: item.param
      }
    })
  }
}

