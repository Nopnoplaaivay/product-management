const ProductCategory = require("../../models/products-category.model");
const createTree = require("../../helpers/createTree.js");

module.exports.category = async (res, req, next) => {
  const categoryProducts = await ProductCategory.find({
    deleted: false
  });

  const newCategoryProducts = createTree(categoryProducts);

  res.locals.layoutCategoryProducts = newCategoryProducts;

  next(); 
}