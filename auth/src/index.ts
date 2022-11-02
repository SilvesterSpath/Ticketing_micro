import mongoose from 'mongoose'
import { app } from './app'


const start = async ()=>{
  if(!process.env.JWT_KEY){
    throw new Error('Missing JWT_KEY')
  }
  
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


