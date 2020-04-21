const linksToggleButton = document.querySelector(".linkstoggle");
const linksBar = document.querySelector(".links");
const infoParagraph = document.querySelector(".info > p");
var infoText = "";

fetch("/assets/texts/short.txt")
  .then((response) => response.text())
  .then((data) => {
    infoParagraph.textContent = data;
  });

linksToggleButton.addEventListener("click", function toggleLinks() {
  linksBar.classList.toggle("active");
});
