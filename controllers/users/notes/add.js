const to = require('await-to-js').default;
const {getUser} = require('../utils');
const Group = require('../../models/Group');

module.exports = async (req, res) => {
  let [userError, user] = await to(getUser(req));
  if (userError) return res.json(userError);
  user.groups.forEach(async function(groupId) {
    await Group.findByIdAndUpdate(groupId, {$push: {cards: req.body}}).exec();
  });
  return res.json({success: true});
};