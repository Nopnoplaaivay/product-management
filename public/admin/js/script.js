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