const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { RequestError, sendMail, createVerifyEmail } = require('../../helpers');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email is use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);
  await sendMail(mail);

  res.status(201, 'Created').json({
    user: {
      name: result.name,
      email: result.email,
      subscription: result.subscription,
      verificationToken: result.verificationToken,
    },
  });
};

module.exports = register;
