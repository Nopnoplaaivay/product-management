// [GET] /admin/products
const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    },
  ]

  if (req.query.status) {
    const index = filterStatus.findIndex((item) => {
      return item.status == req.query.status;
    })
    filterStatus[index].class = "active"
  } else {
    const index = filterStatus.findIndex((item) => {
      return item.status == "";
    })    
    filterStatus[index].class = "active"
  }

  console.log(filterStatus);

  let find = {
    deleted: false
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  let keyword = "";

  if (req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i");
    console.log(regex);
    find.title = regex;
  }
  const products = await Product.find(find);

  console.log(req.query);

  res.render("admin/pages/products/index", {
    pageTitle: "Product List",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword
  });
}