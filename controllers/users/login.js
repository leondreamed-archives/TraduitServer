const to = require('await-to-js').default;
const {getUser} = require('../utils');

module.exports = async (req, res) => {
  const [userError, user] = await to(getUser(req));
  if (userError) return res.status(400).json(userError);
  return res.json(user);
};