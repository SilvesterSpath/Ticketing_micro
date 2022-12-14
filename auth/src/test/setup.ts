import request from 'supertest';
import { MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import {app} from '../app'


declare global {
  // this means global object has a signin method which returns a Pomise which is an array of strings
  function signin(): Promise<string[]>
}


let mongo: any;

beforeAll(async()=>{
  process.env.JWT_KEY = 'asdfasdf'

  mongo = new MongoMemoryServer();
  
  await mongo.start()

  const mongoUri = await mongo.getUri();    

  await mongoose.connect(mongoUri, {})
})

beforeEach(async()=>{
  const collections = await mongoose.connection.db.collections()

  for (let item of collections){
    await item.deleteMany({})
  }
})

afterAll(async()=>{
  await mongo.stop();
  await mongoose.connection.close()
})

global.signin = async ()=>{
  const email = 'test@test.com'
  const password = 'password'

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201)

    const cookie = response.get('Set-Cookie')

    return cookie
}

