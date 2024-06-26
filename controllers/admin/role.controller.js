const Role = require("../../models/role.model")
const systemConfig = require("../../config/system");

// [GET] /admin/role
module.exports.index = async (req, res) => {
 
  const records = await Role.find({
    deleted: false
  }); 

  res.render("admin/pages/roles/index", {
    records: records,
    pageTitle: "Danh sách nhóm quyền"
  });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo mới nhóm quyền"
  });
};

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();
  req.flash("success", "Thêm nhóm quyền thành công");

  res.redirect(`/${systemConfig.prefixAdmin}/roles`)
};

// [GET] /admin/role/edit
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
  
    const data = await Role.findOne({
      _id: id,
      deleted: false
    });
    
    res.render("admin/pages/roles/edit", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      data: data
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
  }
}

// [PATCH] /admin/role/edit
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  
  await Role.updateOne({_id: id}, req.body);
  req.flash("success", "Cập nhật nhóm quyền thành công");

  res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  const records = await Role.find({
    deleted: false
  })

  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phân quyền",
    records: records
  });
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);

  // const updatedBy = {
  //   account_id: res.locals.user.id
  // }

  for (const item of permissions) {
    await Role.updateOne({
      _id: item.id
    }, {
      permissions: item.permissions
    });
  }

  req.flash("success", "Cập nhật phân quyền thành công!");

  res.redirect("back");
}