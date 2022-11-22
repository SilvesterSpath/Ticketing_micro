import request from 'supertest';
import { app } from '../../app'

it('returns a 200 statuscode with correct credentials', async()=>{
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200)
})

it('returns a 400 statuscode with incorrect password', async()=>{
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'erfefef'
    })
    .expect(400)
})

it('returns a 400 statuscode with no existing user', async()=>{
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
})

it('responds with a cookie with valid credentials', async()=>{
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201)
  const response = await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})