const contact = require("./emails.js");
const nodemailer = require("nodemailer");
const { AWS_SES_SMTP } = require("./env.js");
const html = require("./email-template/template-2.js");

const sendEmail = () => {
  const transporter = nodemailer.createTransport({
    host: AWS_SES_SMTP.HOST,
    port: AWS_SES_SMTP.PORT,
    secure: false,
    auth: {
      user: AWS_SES_SMTP.USERNAME,
      pass: AWS_SES_SMTP.PASSWORD,
    },
  });

  contact.emails.forEach(async (email) => {
    const info = await transporter.sendMail({
      from: `"Akash from Machnet 👻" <${AWS_SES_SMTP.FROM}>`,
      to: email,
      subject: "This is subject!",
      html: html.template,
    });

    console.log("Message sent: %s", info.messageId);
  });
};

sendEmail();
