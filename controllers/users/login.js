const to = require('await-to-js').default;
const {getUser} = require('../utils');
const User = require('../../models/User');

module.exports = async (req, res) => {
  const [userError, user] = await to(getUser(req));
  if (userError) return res.json(userError);
  const [userFindError, populatedUser] = await to(User.findById(user._id).populate('Group').exec());
  if (userFindError) return res.json(userFindError);
  return res.json({success: true, data: populatedUser});
};