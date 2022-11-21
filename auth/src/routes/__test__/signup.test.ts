import request from 'supertest';
import { app } from '../../app'

it('returns a 201 on successful signup', async ()=>{
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
})

it('returns a 400 statuscode with invalid email', async()=>{
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testest.com',
      password: 'password'
    })
    .expect(400)
})

it('returns a 400 statuscode with invalid password', async()=>{
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'tes@test.com',
      password: 'pd'
    })
    .expect(400)
})

it('returns a 400 statuscode with missing email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'tes@test.com'
    })
    .expect(400)
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'asdfasdfsadf'
    })
    .expect(400)
})

it('dissallows duplicate emails', async()=>{
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'tes@test.com',
    password: 'password'
  })
  .expect(201)
await request(app)
  .post('/api/users/signup')
  .send({
    email: 'tes@test.com',
    password: 'password'
  })
  .expect(400)
})

