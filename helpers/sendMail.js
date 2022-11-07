const nodemailer = require('nodemailer');

const { APP_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'sender.happiness@gmail.com',
    pass: APP_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMail = async data => {
  const mail = { ...data, from: 'sender.happiness@gmail.com' };

  try {
    await transport.sendMail(mail);
    console.log('Email send success');
  } catch (error) {
    console.error(error.message);
  }
};

// const sgMail = require('@sendgrid/mail');

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendMail = async data => {
//   const mail = { ...data, from: 'yaroslav.vyshynskyi@gmail.com' };
//   await sgMail.send(mail);
//   return true;
// };

module.exports = sendMail;
