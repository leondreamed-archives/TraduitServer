const Group = require('../../models/Group');
const User = require('../../models/User');
const to = require('await-to-js').default;
const {getUser} = require('../utils');

module.exports = async (req, res) => {
  const [userError, user] = await to(getUser(req));
  if (userError) return res.json(userError);
  const {name, password} = req.body;
  const [groupError, group] = await to(Group.create({
    name, password, members: [user._id]
  }));
  if (groupError) return res.json(groupError);
  const [userUpdateError] = await to(User.findByIdAndUpdate(user._id, {group: group._id}));
  if (userUpdateError) return res.json(userUpdateError);
  return res.json({success: true, data: group});
};