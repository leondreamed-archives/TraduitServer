const User = require('../../models/User');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {username, password} = req.body;
  const [userError, user] = await to(User.create({
    username, password
  }));
  if (userError) return res.status(400).json(userError);
  return res.json(user);
};