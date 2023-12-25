module.exports = (query) => {

  // Khởi tạo các trạng thái 
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
    }
  ];

  // Đối chiếu query status gửi về
  if(query.status) {
    const index = filterStatus.findIndex((item) => {
      return item.status == query.status;
    });

    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => {
      return item.status == "";
    });

    filterStatus[index].class = "active";
  }

  return filterStatus;
}