const fs = require("fs/promises");
const path = require("path");

const users = require("../../models/users.js");
const { editAvatar } = require("../../helpers");
const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(401).json({ message: "Unauthorized - File Not Found" });
  }

  const { path: tempUpload, originalname } = req.file;
  const fileName = `${req.user._id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  editAvatar(tempUpload, resultUpload);

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
