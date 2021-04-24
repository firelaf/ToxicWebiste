// SCROLL EFFECTS
const subTitles = document.querySelectorAll(".sub-title");
const scrollArea = document.querySelector(".parallax");
const pictureBlocks = document.querySelectorAll("figure");
const backgroundImg = document.querySelector("#toxic-logo");
const downArrow = document.querySelector(".down-arrow");

scrollArea.addEventListener("scroll", scrollEffects);

function scrollEffects() {
  //This block of code calculates the scrolled position of the screen
  //as a percentage
  let scrollHeight = scrollArea.scrollHeight - window.innerHeight;
  let currentScroll = scrollArea.scrollTop;

  let scrollValue = currentScroll / scrollHeight;
  let scrollPercent = scrollValue.toFixed(4) * 100;
  let scrollPercentFixed = +scrollPercent.toFixed(2);

  //Call all effects that depend on scrolling
  if (backgroundImg !== null)
    backgroundOpacity(scrollPercentFixed, backgroundImg);

  if (downArrow !== null) fadeOut(currentScroll, downArrow);

  if (subTitles !== null) {
    subTitles.forEach((item) => {
      titleFadeIn(currentScroll, item);
    });
  }

  if (pictureBlocks !== null) {
    pictureBlocks.forEach((item) => {
      pictureFadeIn(currentScroll, item);
    });
  }
}

//This changes the opacity of the "X" background
//based on the scroll
function backgroundOpacity(scrollPercent, background) {
  let opacity = 100 - 7 * scrollPercent;
  opacity = opacity.toFixed(2);

  //console.log(opacity);
  //The opacity change stops at 30%
  if (opacity >= 30) {
    background.style.opacity = `${opacity}%`;
  } else {
    background.style.opacity = "30%";
  }
}

function fadeOut(currentScroll, element) {
  if (currentScroll >= element.offsetTop - window.innerHeight / 1.5) {
    setTimeout(() => {
      element.classList.add("fade-in");
    }, 10);
    setTimeout(() => {
      element.style.animation = "none";
    }, 4000);
  }
}

//This fades in the titles when the user scrolls them
//25% of the way into the screen
function titleFadeIn(currentScroll, element) {
  if (currentScroll >= element.offsetTop - window.innerHeight / 1.5) {
    setTimeout(() => {
      element.classList.remove("fade-in");
    }, 10);
  }
}

//This fades in the pictures 1 by 1
function pictureFadeIn(currentScroll, wrapper) {
  let elArray = Array.from(wrapper.children);

  //Recursive function is the only method I've found to
  //do iteration with a delay
  function displayImages(i) {
    setTimeout(() => {
      if (elArray[i].classList.contains("fade-in")) {
        elArray[i].classList.remove("fade-in");
      }
      if (i < elArray.length - 1) {
        displayImages(i + 1);
      }
    }, 300);
  }

  //The recursive function is executed when the user
  //scrolls the wrapper a little under halfway into view
  if (
    currentScroll >=
    wrapper.parentElement.offsetTop - window.innerHeight / 2.5
  ) {
    let i = 0;
    displayImages(i);
  }
}

//INITIAL FADE-IN'S

const mainTitle = document.querySelector(".main-title");
const headerMenu = document.querySelector("header");

initFadeIn(headerMenu, 100);

if (mainTitle !== null) initFadeIn(mainTitle, 100);
if (downArrow !== null) initFadeIn(downArrow, 4000);

function initFadeIn(element, delay) {
  setTimeout(() => {
    element.classList.remove("fade-in");
  }, delay);
}

//MENU

const navMenu = document.querySelector("nav");

function toggleMenu(menu) {
  if (!navMenu.classList.contains("drawer-out")) {
    menu.classList.add("drawer-out");
  } else {
    menu.classList.remove("drawer-out");
  }
}

const menuButton = document.querySelector("#menu-button");
const closeArea = document.querySelector("#close-area");

menuButton.addEventListener("click", () => {
  toggleMenu(navMenu);
});
closeArea.addEventListener("click", () => {
  toggleMenu(navMenu);
});
