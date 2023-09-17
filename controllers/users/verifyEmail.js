const users = require("../../models/users.js");
const { errorMessage } = require("../../helpers");

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await users.findOne({ verificationToken }).exec();

    if (!user) {
      throw errorMessage(404, "User not found");
    }

    await users.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
