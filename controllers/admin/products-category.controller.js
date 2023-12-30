const ProductCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const createTree = require("../../helpers/createTree.js");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);

  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);

  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo Danh mục sản phẩm",
    records: newRecords,
  });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  const countRecords = await ProductCategory.countDocuments();

  req.body.position = req.body.position
    ? parseInt(req.body.position)
    : countRecords + 1;

  const record = new ProductCategory(req.body);

  await record.save();

  res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
};

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false,
  };

  const data = await ProductCategory.findOne(find);

  const records = await ProductCategory.find({
    deleted: false,
  });

  const newRecords = createTree(records);

  res.render("admin/pages/products-category/edit", {
    pageTitle: "Danh mục sản phẩm",
    data: data,
    records: newRecords,
  });
};

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.position = parseInt(req.body.position);

  await ProductCategory.updateOne({ _id: id }, req.body);

  res.redirect("back");
};
