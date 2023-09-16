// Navigate button

const buttons = document.querySelectorAll("[button-status]")
if (buttons.length > 0) {
  let url = new URL(window.location.href);


  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status != "") {
        url.searchParams.set("status", status);
        console.log(url);
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