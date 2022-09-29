import mongoose from "mongoose";

// Interface that describes the properties
// that ar required to create a new User
interface UserAttrs {
  email: string,
  password: string
}

// Interface that describes the properties
// that a User model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any
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

// This is how a custom function built into a model now we can use 'User.build'
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<any, UserModel>('User', userSchema);

User.build({
  email: 'test@test.com',
  password:'12345'  
})

// build user with the help of typescript through the interface
/* const buildUser = (attrs: UserAttrs) => {
  return new User(attrs)
} */

/* new User({
  email: 'tes@test.com',
  password: '12345'
}) */

export { User }

