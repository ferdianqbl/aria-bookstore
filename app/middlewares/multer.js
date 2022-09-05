const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  )
    cb(null, true);
  else {
    // reject file

    cb({ message: "File type not supported" }, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1000000, // 3MB
  },
  fileFilter,
});

module.exports = upload;
