// [GET] /admin/products
const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

module.exports.index = async (req, res) => {

  const filterStatus = filterStatusHelper(req.query);
  let objectSearch = searchHelper(req.query);

  console.log(filterStatus);

  let find = {
    deleted: false
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }

  const products = await Product.find(find);

  console.log(req.query);

  res.render("admin/pages/products/index", {
    pageTitle: "Product List",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword 
  });
}