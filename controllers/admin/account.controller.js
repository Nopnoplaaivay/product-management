const md5 = require("md5")

const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
 
  const records = await Account.find({
    deleted: false
  }); 

  for (const record of records) {
    const role = await Role.findOne({ _id: record.role_id});
    record.role = role;
  }

  res.render("admin/pages/accounts/index", {
    records: records,
    pageTitle: "Danh sách tài khoản"
  });
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
 
  const roles = await Role.find({
    deleted: false
  }); 

  res.render("admin/pages/accounts/create", {
    roles: roles,
    pageTitle: "Thêm mới tài khoản"
  });
}

// [POST] /admin/accounts
module.exports.createPost = async (req, res) => {
 
  req.body.password =  md5(req.body.password);
  const record = new Account(req.body);
  await record.save();

  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
 
  let find = {
    _id: req.params.id,
    deleted: false,
  };

  try {
    const data = await Account.findOne(find);

    const roles = await Role.find({
      deleted: false,
    });

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  if(req.body.password) {
    req.body.password = md5(req.body.password);
  } else {
    // delete để không bị ghi đè
    delete req.body.password;
  }

  await Account.updateOne({ _id: req.params.id }, req.body);

  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
};