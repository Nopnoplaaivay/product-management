const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
// const storageMulterHelper = require('../../helpers/storageMulter.js');
// const storage = storageMulterHelper();
const upload = multer();
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");


router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);
// parse application/x-www-form-urlencoded
router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  uploadCloud.upload,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;
