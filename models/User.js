const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  groups: [{
    ref: 'Group',
    type: Schema.Types.ObjectId
  }]
});

UserSchema.pre('save', function(next) {
  const self = this;

  bcrypt.hash(self.password, 10, (error, hash) => {
    self.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
