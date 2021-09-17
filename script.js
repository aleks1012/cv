var x = document.querySelector(".contain");

x.addEventListener("click", myFunction);

function myFunction() {
  var element = document.querySelector(".nav__box");
  element.classList.toggle("open");
  
  x.classList.toggle("change");
}