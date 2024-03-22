// Navigate button
const buttons = document.querySelectorAll("[button-status]")
if (buttons.length > 0) {
  let url = new URL(window.location.href);


  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status != "") {
        url.searchParams.set("status", status);
      }
      else {
        url.searchParams.delete("status")
      }
      window.location.href = url.href;
    });
  });
}

// Search Function
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    // Ngăn load lại trang
    e.preventDefault();
    const value = e.target.elements.keyword.value 
    if (value != "") {
      url.searchParams.set("keyword", value);
    }
    else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  })
}

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
  let url = new URL(window.location.href);
  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    })
  })
}

// Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      const statusChange = statusCurrent == "active" ? "inactive" : "active";
      const action = path + `/${statusChange}/${id}?_method=PATCH`;

      formChangeStatus.action = action;
      // formChangeStatus.setAttribute("action", action);

      formChangeStatus.submit();
    });
  })
}

const CheckboxMulti = document.querySelector("[checkbox-multi]");
if (CheckboxMulti) {
  const inputCheckAll = CheckboxMulti.querySelector("input[name='checkall']");
  const inputsId = CheckboxMulti.querySelectorAll("input[name='id']")

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach(input => {
        input.checked = true;
      })
    } else {
      inputsId.forEach(input => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = CheckboxMulti.querySelectorAll(
        "input[name='id']:checked"
        ).length;
        if (countChecked == inputsId.length) {
          inputCheckAll.checked = true
        }
        else {
          inputCheckAll.checked = false
        }
    })
  })
}

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const CheckboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = CheckboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có muốn xóa những bản ghi này?");
      if (!isConfirm)
        return;
    }

    if (inputsChecked.length > 0) {
      let ids = [];
      const inputsId = formChangeMulti.querySelector(
        "input[name='ids']"
      );

      inputsChecked.forEach(input => {
        const id = input.value;
        if (typeChange == "change-position") {
          const position = input.closest("tr").querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        }
        else {
          ids.push(id);
        }
      })

      inputsId.value = ids.join(", ");
    } else {
      alert("Vui long chon mot ban ghi");
    }

    formChangeMulti.submit();
  });
}

// Delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const confirmDelete = confirm("Ban co muon xoa khong?");
      if (confirmDelete) {
        const id = button.getAttribute("data-id");

        const action = path + `/${id}?_method=DELETE`;
  
        formDeleteItem.action = action;
        // formChangeStatus.setAttribute("action", action);
  
        formDeleteItem.submit();
      }
    });
  })
}

// Show Alert 
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  })
}

// Upload image 
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const image = URL.createObjectURL(e.target.files[0]);

      uploadImagePreview.src = image;
    }
  });
}
// End Upload image 

// Sort
const sort = document.querySelector("[sort]");
if (sort) {
    let url = new URL(window.location.href)

    const sortSelect = sort.querySelector('[sort-select]');
    sortSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        const [sortKey, sortValue] = value.split('-');

        url.searchParams.set('sortKey', sortKey);
        url.searchParams.set('sortValue', sortValue);

        window.location.href = url.href
    })
    // Xóa sắp xếp
    const sortClear = sort.querySelector('[sort-clear]')
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    });

    //* Hiển thị lựa chọn
    const sortKey = url.searchParams.get('sortKey');
    const sortValue = url.searchParams.get('sortValue');

    if (sortKey && sortValue) {
        const stringSort = sortKey + '-' + sortValue
        const optionSelected = sortSelect.querySelector(`option[value="${stringSort}"]`)
        optionSelected.selected = true
    }
}
// End sort