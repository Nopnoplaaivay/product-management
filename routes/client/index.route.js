const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");

module.exports = (app) => {
  // Tạo category để tất cả các route đều dùng được
  app.use(categoryMiddleware.category);

  app.use("/", homeRoutes);
  app.use("/products", productRoutes);
}