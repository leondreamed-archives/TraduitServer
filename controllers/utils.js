const bcrypt = require('bcrypt');
const User = require('../models/User');
const to = require('await-to-js').default;
const atob = require('atob');

async function getUser(req) {
  let Authorization = req.headers['authorization'];
  console.log(Authorization);
  let test = Authorization.replace('Basic ', '');
  console.log(test);
  console.log(atob(test));
  console.log('hi');
  let str = atob(test);
  let [username, password] = str.split(':');
  console.log(username, password);
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
