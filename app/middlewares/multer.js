const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "../../public/uploads"; // directory to store images

    cb(null, path.join(__dirname, dir));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
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
  storage: fileStorage,
  limits: {
    fileSize: 3 * 1000000, // 3MB
  },
  fileFilter,
}).single("imageFile");

// console.log("multer middleware loaded", upload.storage.getDestination());

module.exports = { upload };
