const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  users: [{
    ref: 'User',
    type: Schema.Types.ObjectId
  }],
});

GroupSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10, (error, hash) => {
    this.password = hash;
    next();
  });
});
const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;
