const express = require("express");
const { upload } = require("../../middlewares/multer");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const { uploadImage } = require("./controller");

router.post("/uploads", auth, upload, uploadImage);

module.exports = router;
