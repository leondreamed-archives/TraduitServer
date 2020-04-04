const bcrypt = require('bcrypt');
const User = require('../models/User');
const to = require('await-to-js').default;

async function getUser(req) {
  const Authorization = req.get('Authorization');
  if (!Authorization) return Promise.reject({message: 'Not authorized'});
  const [username, password] = Authorization.replace('Basic ', '').split(':');
  const [userError, user] = await to(User.findOne({username})
  .select('+password').exec());
  if (userError) return Promise.reject(userError);
  const match = await bcrypt.compare(user.password, password);
  if (!match) return Promise.reject({
    message: "Invalid username or password."
  });
  const {password: _, ...userWithoutPassword} = user._doc;
  return Promise.resolve(userWithoutPassword);
}

module.exports = {
  getUser
};
