const { RequestError } = require('../../helpers');
const { User } = require('../../models/user');

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404);
  }
  if (user.verify) {
    return res.status(400).json({ message: 'Verification has already been passed' });
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });
  res.status(200).json({
    message: 'Email verify success',
  });
};

module.exports = verify;
