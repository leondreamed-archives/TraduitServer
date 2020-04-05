const Group = require('../../models/Group');
const to = require('await-to-js').default;
const {getUser} = require('../utils');

module.exports = async (req, res) => {
  const [userError, user] = await to(getUser(req));
  if (userError) return res.json(userError);
  const [groupError, group] = await to(Group.findById(user.group).exec());
  if (groupError) return res.json(groupError);
  return res.json({success: true, data: group});
};