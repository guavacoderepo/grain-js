const nodemailer = require("nodemailer");

module.exports = sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USERNAME, // generated ethereal user
      pass: process.env.MAILER_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const message = {
    from: `${process.env.MAILER_NAME} <${process.env.MAILER_EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  };

  await transporter.sendMail(message);
};
