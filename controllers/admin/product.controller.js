// [GET] /admin/products
const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  let objectSearch = searchHelper(req.query);

  let find = {
    deleted: false,
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
    limitItems: 4,
  };
  const countProducts = await Product.count(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countProducts
  );

  // Get all products enough for one page
  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  // Render page
  if (products.length > 0 || countProducts == 0) {
    res.render("admin/pages/products/index", {
      pageTitle: "Product List",
      products: products,
      filterStatus: filterStatus,
      keyword: objectSearch.keyword,
      pagination: objectPagination,
    });
  } else {
    let stringQuery = "";

    for (const key in req.query) {
      if (key != "page") {
        stringQuery += `&${key}=${req.query[key]}`;
      }
    }

    const href = `${req.baseUrl}?page=1${stringQuery}`;
    res.redirect(href);
  }
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "Cập nhật trạng thái thành công!");
  res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  // Gom nhiều case lại với nhau cho tiện
  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: type });
      req.flash(
        "success",
        `Cập nhật trạng thái ${ids.length} sản phẩm thành công!`
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      req.flash("success", `Xoá thành công ${ids.length} sản phẩm!`);
      break;
    case "change-position":
      for (const item of ids) {
        const [id, position] = item.split("-");
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash(
        "success",
        `Thay đổi vị trí ${ids.length} sản phẩm thành công!`
      );
      break;
    default:
      break;
  }
  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  // Delete Permanently
  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );

  req.flash("success", `Xoá sản phẩm thành công!`);
  res.redirect("back");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  // let find = {
  //     deleted: false
  // }

  // const records = await ProductCategory.find(find)

  // const newRecords = createTree(records)

  res.render("admin/pages/products/create", {
    pageTitle: "Tạo mới sản phẩm",
    // records: newRecords
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  const countProduct = await Product.countDocuments();

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = req.body.position
    ? parseInt(req.body.position)
    : countProduct + 1;
  if (req.file && req.file.filename) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  console.log(req.file)
  const product = new Product(req.body);
  await product.save();

  res.redirect(`/${systemConfig.prefixAdmin}/products`);
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
      const id = req.params.id;
      const product = await Product.findOne({
          _id: id,
          deleted: false
      })
      let find = {
          deleted: false
      }

      // const records = await ProductCategory.find(find)

      // const newRecords = createTree(records)

      res.render('admin/pages/products/edit', {
          pageTitle: "Chỉnh sửa sản phẩm",
          product
          // records: newRecords
      })
  } catch (error) {
      req.flash("error", "Không tồn tại sản phẩm!")
      res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file && req.file.filename) {
      req.body.thumbnail = `/uploads/${req.file.filename}`
  }

  // const updatedBy = {
  //     account_id: res.locals.user.id,
  //     updatedAt: new Date()
  // }


  await Product.updateOne({ _id: id }, req.body);
  // console.log(req.body)
  req.flash("success", "Cập nhật sản phẩm thành công")
  res.redirect(`/${systemConfig.prefixAdmin}/products`);
}
