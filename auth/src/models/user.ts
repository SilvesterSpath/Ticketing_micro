import mongoose from "mongoose";
import { Password } from '../services/password'

// Interface that describes the properties
// that ar required to create a new User
interface UserAttrs {
  email: string,
  password: string
}

// Interface that describes the properties
// that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// Interface that describes the properties
// that a User Document has in mongoDB (this could have additional properties like 'createdAt')
interface UserDoc extends mongoose.Document{
  email: string,
  password: string,
/*   createdAt: string,
  updateAt: string */
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

// We add another method for password hashing (here 'this' is the user document)
userSchema.pre('save', async function(done) {
  if(this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)    
  }  
  done()
})

// This is how a custom function built into a model now we can use 'User.build'
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


// build a user with the help of the built in function
/* User.build({
  email: 'test@test.com',
  password:'12345'  
}) */

// build user with the help of typescript through the interface
/* const buildUser = (attrs: UserAttrs) => {
  return new User(attrs)
} */

export { User }

