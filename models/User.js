const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email Require'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password Require'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },

    date: {
        type: Date,
        default: Date.now
    }

})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  userSchema.statics.login = async function(email, password) {
    //console.log(this.findOne({}));
    const user = await this.findOne({ email });
    
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

const User = mongoose.model('user', userSchema)
module.exports = User