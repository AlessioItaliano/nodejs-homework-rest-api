const Jimp = require("jimp");

Jimp.read(tempUpload, (error, avatar) => {
  if (error) throw error;
  avatar.resize(250, 250).quality(60).write(resultUpload);
});
