const { RequestError, createVerifyEmail, sendMail } = require('../../helpers');
const { User } = require('../../models/user');

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, 'Email, not found');
  }
  if (user.verify) {
    return res.status(400).json({ message: 'Verification has already been passed' });
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendMail(mail);

  res.json({
    message: 'Verify email resend',
  });
};

module.exports = resendVerify;
