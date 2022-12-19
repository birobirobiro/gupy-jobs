// filter hide/show
const htmlShow = document.getElementById("filter-show");
htmlShow.style.display = "none";

const filterButton = document.getElementById("filter");

export function ShowFilter() {
  const htmlShow = document.getElementById("filter-show");
  if (htmlShow.style.display === "none") {
    htmlShow.style.display = "block";
  } else {
    htmlShow.style.display = "none";
  }
}

filterButton.addEventListener("click", ShowFilter)