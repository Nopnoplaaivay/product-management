const express = require("express");
const multer = require("multer");
const router = express.Router();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/product.validate");
const controller = require("../../controllers/admin/products-category.controller");

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  uploadCloud.upload,
  controller.createPost
);

module.exports = router;
