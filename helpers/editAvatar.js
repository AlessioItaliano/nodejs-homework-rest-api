const Jimp = require("jimp");

const editAvatar = async (inputPath, outputPath) => {
  try {
    const avatar = await Jimp.read(inputPath);
    await avatar.resize(250, 250).quality(60).write(outputPath);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = editAvatar;
