const mongoose = require('mongoose');
const Password = require('../services/password');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.password;
          delete ret.__v;
        }
      }
    }
  );
  
  userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
    }
    done();
  });
  
  userSchema.statics.build = (attrs) => {
    return new User(attrs);
  };
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = { User };