// [GET] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

module.exports.index = async (req, res) => {

  const filterStatus = filterStatusHelper(req.query);
  let objectSearch = searchHelper(req.query);

  let find = {
    deleted: false
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }
  //Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 4
  } 
  const countProducts = await Product.count(find);
  const objectPagination = paginationHelper(initPagination, req.query, countProducts);

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);


  res.render("admin/pages/products/index", {
    pageTitle: "Product List",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
}