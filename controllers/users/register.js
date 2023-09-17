require("dotenv").config();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const crypto = require("crypto");

const users = require("../../models/users.js");
const { errorMessage, sendEmail } = require("../../helpers");

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
    const verificationToken = crypto.randomUUID();

    const result = await users.create({
      ...req.body,
      password: passwordHash,
      avatarURL: avatarURL,
      verificationToken: verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify</a>`,
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
