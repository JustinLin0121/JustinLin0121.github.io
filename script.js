document.addEventListener("DOMContentLoaded", function () {
  // const oElement = document.querySelector(".o");
  // const helloElement = document.querySelector(".hello");
  // oElement.addEventListener("click", function () {
  //   oElement.classList.add("hide");
  //   setTimeout(function () {
  //     helloElement.classList.add("fire");
  //   }, 1000);
  // });
  const oElement = document.querySelector(".o");
  const helloElement = document.querySelector(".hello");

  let clickCount = 0;
  let resetTimer;

  oElement.addEventListener("click", function () {
    clickCount++;

    if (clickCount === 1) {
      resetTimer = setTimeout(() => {
        clickCount = 0;
      }, 3000);
    }


    if (clickCount === 5) {
      clearTimeout(resetTimer);
      oElement.classList.add("hide");
      setTimeout(() => {
        helloElement.classList.add("fire");
      }, 1000);
    }
  });








  const btnElement = document.querySelector(".light_dark");
  const backElement = document.querySelector(".first_page");
  let i = 0;
  btnElement.addEventListener("click", function () {
    if (i == 0) {
      btnElement.classList.remove("light");
      btnElement.classList.add("dark");
      backElement.classList.remove("light");
      backElement.classList.add("dark");
      i++;
    } else {
      btnElement.classList.remove("dark");
      btnElement.classList.add("light");
      backElement.classList.remove("dark");
      backElement.classList.add("light");
      i = 0;
    }
  });
});

document.addEventListener("mousemove", function (event) {
  let header = document.querySelector("header");
  if (event.clientY < 50) {
    header.style.top = "0";
  } else {
    header.style.top = "-80px";
  }
});



