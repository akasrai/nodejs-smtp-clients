const contact = require("./emails.js");
const sgMail = require("@sendgrid/mail");
const { SENDGRIND_SMTP } = require("./env.js");
const html = require("./email-template/template-2.js");

sgMail.setApiKey(SENDGRIND_SMTP.API_KEY);

contact.emails.forEach(async (email) => {
  const msg = {
    to: email,
    from: SENDGRIND_SMTP.FROM,
    subject: "This is subject!",
    html: html.template,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent to ", email);
  } catch (error) {
    console.error(error);
    console.log("Error occurred while sending email to ", email);

    if (error.response) {
      console.error(error.response.body);
    }
  }
});
