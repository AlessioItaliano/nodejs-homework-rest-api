const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const users = require("../../models/users.js");
const { errorMessage } = require("../../helpers");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email }).exec();
    if (user !== null) {
      throw errorMessage(409, "Email in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const result = await users.create({
      ...req.body,
      password: passwordHash,
      avatarURL: avatarURL,
    });

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
