import mongoose from "mongoose";

// Interface that describes the properties
// that ar required to create a new User
interface UserAttrs {
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema);

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs)
}

// build user with the help of typescript through the interface
/* buildUser({
  email: 'tes@test.com',
  password: '12345',
}) */

/* new User({
  email: 'tes@test.com',
  password: '12345'
}) */

export { User, buildUser }

