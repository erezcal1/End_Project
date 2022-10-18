const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const Oauth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new Oauth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplaygorund/"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) reject("failed to get token");
      else resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });
  return transporter;
};
const sendEmail = async (emailOptions) => {
  try {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  } catch (err) {
    console.log("error from mailer", err);
  }
};
module.exports = sendEmail;
