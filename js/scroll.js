//handle left arrow
$(".leftArrow").click(function () {
  var box = $(".rightColumnWrapper"),
    x;

  x = box.width() / 2 - box.scrollLeft();
  box.animate({
    scrollLeft: -x,
  });
  box.addClass("scrolledLeft");
  box.removeClass("scrolledRight");
});

//handle right arrow
$(".rightArrow").click(function () {
  var box = $(".rightColumnWrapper"),
    x;

  x = box.width() / 2 + box.scrollLeft();
  box.animate({
    scrollLeft: +x,
  });
  box.addClass("scrolledRight");
  box.removeClass("scrolledLeft");
});

//handle scroll on drag and keys
const slider = document.querySelector(".rightColumnWrapper");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
});
