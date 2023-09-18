const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_LOGIN, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_LOGIN,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const dataFull = { ...data, from: META_LOGIN };
  await transport
    .sendMail(dataFull)
    .then(() => console.log("Email sent successfully"))
    .catch((error) => console.log(error.message));
};

module.exports = sendEmail;
