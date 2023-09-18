const express = require("express");

const {
  register,
  logIn,
  logOut,
  getCurrent,
  updateSubscriptions,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/users");

const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  registerScheme,
  logInScheme,
  updateSubscriptionSchema,
  emailVerificationSchema,
} = require("../../schemas/usersScheme.js");

const router = express.Router();

router.post("/register", validateBody(registerScheme), register);

router.post("/login", validateBody(logInScheme), logIn);

router.post("/logout", authenticate, logOut);

router.get("/current", authenticate, getCurrent);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscriptions
);

router.get("/verify/:verificationToken", verifyEmail);

router.post(
  "/verify",
  validateBody(emailVerificationSchema),
  resendVerifyEmail
);

module.exports = router;
