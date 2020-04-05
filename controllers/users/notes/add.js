const to = require('await-to-js').default;
const {getUser} = require('../../utils');
const Group = require('../../../models/Group');

module.exports = async (req, res) => {
  let [userError, user] = await to(getUser(req));
  if (userError) return res.json(userError);
  // req.body is an array of {front, back} notes
  const [groupError] = await to(Group.findByIdAndUpdate(user.group, {$push: {notes: req.body}}).exec());
  if (groupError) return res.json(groupError);
  return res.json({success: true});
};