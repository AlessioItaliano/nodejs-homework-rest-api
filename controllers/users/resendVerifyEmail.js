const users = require("../../models/users.js");
const { errorMessage, sendEmail } = require("../../helpers");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await users.findOne({ email }).exec();
    if (!user) {
      throw errorMessage(401, "Email not found");
    }
    if (user.verify) {
      throw errorMessage(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationCode}">Click to verify</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
