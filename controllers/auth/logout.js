const { User } = require('../../models/user');

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!_id) {
    throw RequestError(401, 'Not authorized');
  }
  await User.findByIdAndUpdate(user._id, { token: '' });

  res.status(204, 'No Content').json({
    message: 'Logout success',
  });
};

module.exports = logout;
