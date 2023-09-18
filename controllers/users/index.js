const register = require("./register.js");
const logIn = require("./logIn.js");
const logOut = require("./logOut.js");
const getCurrent = require("./getCurrent.js");
const updateSubscriptions = require("./updateSubscriptions.js");
const updateAvatar = require("./updateAvatar.js");
const verifyEmail = require("./verifyEmail.js");
const resendVerifyEmail = require("./resendVerifyEmail.js");

module.exports = {
  register,
  logIn,
  logOut,
  getCurrent,
  updateSubscriptions,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
