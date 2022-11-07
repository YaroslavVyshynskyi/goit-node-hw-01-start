const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: 'confirmation of verification on the site',
    html: `<a target= "_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">click to confirm</a>`,
  };

  return mail;
};

module.exports = createVerifyEmail;
