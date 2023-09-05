const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const users = require("../../models/users.js");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { path: tempUpload, originalname } = req.file;
  //   aditAvatar(tempUpload);

  //   Jimp.read(tempUpload)
  //     .then((avatar) => {
  //       return avatar.resize(250, 250).quality(60).write(resultUpload);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  Jimp.read(tempUpload, (error, avatar) => {
    if (error) throw error;
    avatar.resize(250, 250).quality(60).write(resultUpload);
  });

  const fileName = `${req.user._id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  try {
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", fileName);
    await users.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
