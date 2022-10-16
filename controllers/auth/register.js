const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const gravatar = require('gravatar');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email is use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({ name, email, password: hashPassword, avatarURL });
  res.status(201, 'Created').json({
    user: {
      name: result.name,
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
