"use strict";
const buttons = document.querySelectorAll(".navigation li");
const mobileButtons = document.querySelectorAll(".mobile-navigation li");
const slides = document.querySelectorAll(".content div");
const header = document.querySelector("header");

buttons.forEach((button) =>
  button.addEventListener("click", function () {
    window.scrollTo({
      top: slides[this.dataset.index].offsetTop - header.offsetHeight,
      left: slides[this.dataset.index].offsetLeft,
      behavior: "smooth",
    });
  })
);

mobileButtons.forEach((button) =>
  button.addEventListener("click", function () {
    window.scrollTo({
      top: slides[this.dataset.index].offsetTop - header.offsetHeight,
      left: slides[this.dataset.index].offsetLeft,
      behavior: "smooth",
    });
  })
);
