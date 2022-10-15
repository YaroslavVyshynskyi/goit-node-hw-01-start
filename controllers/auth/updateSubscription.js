const { User } = require('../../models/user');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  const result = await User.findByIdAndUpdate(user._id, req.body, { new: true });
  if (!_id) {
    throw RequestError(401, 'Not authorized');
  }
  res.status(200).json(result);
};

module.exports = updateSubscription;
