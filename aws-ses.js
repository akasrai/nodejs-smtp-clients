const contact = require("./emails.js");
const AWS = require("@aws-sdk/client-ses");
const { AWS_SES_KEYS } = require("./env.js");
const html = require("./email-template/template-2.js");

const client = new AWS.SES({
  region: AWS_SES_KEYS.REGION,
  credentials: {
    accessKeyId: AWS_SES_KEYS.ACCESS_KEY_ID,
    secretAccessKey: AWS_SES_KEYS.SECRET_ACCESS_KEY,
  },
});

contact.emails.forEach((email) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Source: AWS_SES_KEYS.SOURCE,
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html.template,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "This is subject!",
      },
    },
  };

  const sendPromise = client.sendEmail(params);

  sendPromise
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
});
