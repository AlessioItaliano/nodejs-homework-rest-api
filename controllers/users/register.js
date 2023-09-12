const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const crypto = require("crypto");

const users = require("../../models/users.js");
const { errorMessage, sendEmail } = require("../../helpers");
require("dotenv").config();

const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email }).exec();
    if (user !== null) {
      throw errorMessage(409, "Email in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = crypto.randomUUID();

    const result = await users.create({
      ...req.body,
      password: passwordHash,
      avatarURL: avatarURL,
      verificationToken: verificationCode,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationCode}">Click to verify</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      user: {
        email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
