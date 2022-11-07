const createVerifyEmail = require('./createVerifyEmail');
const ctrlWrapper = require('./ctrlWrapper');
const handleSaveErrors = require('./handleSaveErrors');
const RequestError = require('./RequestError');
const sendMail = require('./sendMail');

module.exports = {
  createVerifyEmail,
  ctrlWrapper,
  handleSaveErrors,
  RequestError,
  sendMail,
};
