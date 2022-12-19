// filter hide/show
var htmlShow = document.getElementById("filter-show");
htmlShow.style.display = "none";

export function ShowFilter() {
  var htmlShow = document.getElementById("filter-show");
  if (htmlShow.style.display === "none") {
    htmlShow.style.display = "block";
  } else {
    htmlShow.style.display = "none";
  }
}
