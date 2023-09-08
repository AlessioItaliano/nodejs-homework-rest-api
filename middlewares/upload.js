const path = require("path");
const multer = require("multer");

const tempDir = path.dirname(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (_, file, cd) => {
    cd(null, file.originalname);
  },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
