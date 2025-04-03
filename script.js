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
});

document.addEventListener("mousemove" ,function (event) {
  let header = document.querySelector("header");
  let subMenu = document.querySelector('.list li > ul');
  let computedStyle = window.getComputedStyle(subMenu);
  let isSubMenuVisible = computedStyle.visibility === "visible" && computedStyle.opacity === "1";
  if (event.clientY < 80 || isSubMenuVisible === true) {
    header.style.top = "0";
  } else {
    header.style.top = "-80px";
  }
});



document.getElementById("year").textContent = new Date().getFullYear();