const Group = require('../../models/Group');
const User = require('../../models/User');
const to = require('await-to-js').default;
const {getUser} = require('../utils');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const [userError, user] = await to(getUser(req));
  if (userError) return res.json(userError);
  const {name, password} = req.body;
  const [groupError, group] = await to(Group.findOne({name}).select('+password').exec());
  if (groupError) return res.json(groupError);
  if (!bcrypt.compare(password, group.password)) {
    return res.json({message: "Invalid username or password."});
  }
  const [updateUserError] = await to(User.findByIdAndUpdate(user._id, {group: group._id}).exec());
  if (updateUserError) return res.json(updateUserError);
  const [updatedGroup, groupUpdateError] = await to(Group.findOneAndUpdate(
    {name}, {$push: {members: user._id}}, {new: true}
  ).exec());
  if (groupUpdateError) return res.json(groupUpdateError);
  return res.json({success: true, data: updatedGroup});
};