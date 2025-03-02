document.addEventListener("DOMContentLoaded", function () {

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  function changeActiveSection() {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
      let sectionTop = section.offsetTop - 50;
      let sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        let targetId = section.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(targetId)) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", changeActiveSection);




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


  
});







document.addEventListener("mousemove", function (event) {
  let header = document.querySelector("header");
  if (event.clientY < 80) {
    header.style.top = "0";
  } else {
    header.style.top = "-80px";
  }
});
















const numConfetti = 200;
const maxConfetti = 1000;
const colors = ["#ff0", "#f00", "#0f0", "#00f", "#f0f", "#0ff", "#ff5722", "#8e44ad"];
let activeConfetti = [];

function createConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;

    for (let i = 0; i < numConfetti; i++) {
        if (activeConfetti.length >= maxConfetti) return;

        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 15 + 5}px`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 4}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        container.appendChild(confetti);
        activeConfetti.push(confetti);
    }
    requestAnimationFrame(removeOldConfetti);
}

function removeOldConfetti() {
    activeConfetti = activeConfetti.filter(confetti => {
        if (!confetti.getBoundingClientRect().top || confetti.getBoundingClientRect().top > window.innerHeight) {
            confetti.remove();
            return false;
        }
        return true;
    });
    if (activeConfetti.length > 0) requestAnimationFrame(removeOldConfetti);
}





















document.getElementById("year").textContent = new Date().getFullYear();