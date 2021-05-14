function exists(element) {
  if (element !== null && element !== undefined) return true;
  else return false;
}

// SCROLL EFFECTS
const subTitles = document.querySelectorAll(".sub-title");
const scrollArea = document.querySelector(".parallax");
const pictureBlocks = document.querySelectorAll(".block-fade-in");
const backgroundImg = document.querySelector("#toxic-logo");
const downArrow = document.querySelector(".down-arrow");
const videos = document.querySelectorAll("video");

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

  if (videos !== null) {
    videos.forEach((item) => {
      autoPause(item, currentScroll);
    });
  }
}

function autoPause(element, currentScroll) {
  if (element.offsetTop + element.offsetHeight <= currentScroll) {
    element.pause();
    togglePlayButton(element, element.nextElementSibling);
  }
}

//This changes the opacity of the "X" background
//based on the scroll
function backgroundOpacity(scrollPercent, background) {
  let opacity = 100 - 7 * scrollPercent;
  opacity = opacity.toFixed(2);

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
  if (currentScroll >= wrapper.offsetTop - window.innerHeight / 2.5) {
    let i = 0;
    displayImages(i);
  }
}

//INITIAL FADE-IN'S

const mainTitle = document.querySelector(".main-title");
const mainTitle2 = document.querySelector(".main-title2");
const mainTitle3 = document.querySelector(".main-title3");
const mainTitle4 = document.querySelector(".main-title4");
const headerMenu = document.querySelector("header");
const content = document.querySelectorAll(".content");

initFadeIn(headerMenu, 100);

if (exists(mainTitle)) initFadeIn(mainTitle, 100);
if (exists(mainTitle2)) initFadeIn(mainTitle2, 100);
if (exists(mainTitle3)) initFadeIn(mainTitle3, 100);
if (exists(mainTitle4)) initFadeIn(mainTitle4, 100);
if (exists(downArrow)) initFadeIn(downArrow, 4000);
if (exists(content[0])) initFadeIn(content[0], 300);
if (exists(content[1])) initFadeIn(content[1], 300);

function initFadeIn(element, delay) {
  setTimeout(() => {
    element.classList.remove("fade-in");
  }, delay);
}

//MENU

//This toggles the nav menu
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

// VIDEO CONTROLS STORY PAGE

const videoContainters = document.querySelectorAll(".video-wrapper");

videoContainters.forEach((item) => {
  let video, playPauseButton, muteUnmuteButton;

  Array.from(item.children).forEach((item) => {
    if (item.nodeName === "VIDEO") video = item;
    if (item.classList.contains("play-pause")) playPauseButton = item;
    if (item.classList.contains("mute-unmute")) muteUnmuteButton = item;
  });

  playPauseButton.addEventListener("click", () => {
    playPause(video);
    togglePlayButton(video, playPauseButton);
  });

  muteUnmuteButton.addEventListener("click", () => {
    muteUnmute(video);
    toggleMuteButton(video, muteUnmuteButton);
  });

  video.addEventListener("click", () => {
    muteUnmute(video);
    toggleMuteButton(video, muteUnmuteButton);
  });
});

const playPause = (video) => {
  if (!video.paused) video.pause();
  else video.play();
};

const togglePlayButton = (video, button) => {
  if (video.paused) {
    button.src = "img/icons/001-play-button-arrowhead.png";
  } else button.src = "img/icons/002-pause.png";
};

const muteUnmute = (video, button) => {
  if (!video.muted) video.muted = true;
  else video.muted = false;
};

const toggleMuteButton = (video, button) => {
  if (!video.muted) {
    button.src = "img/icons/004-sound-on.png";
  } else button.src = "img/icons/003-sound-off.png";
};

// LAZY LOAD PERFORMANCE PAGE

const embedWrappers = document.querySelectorAll(".embed-wrapper");

//This takes all the thumnail pictures and adds a click listener to them. Once they are clicked,
//the iframe video is loaded from the YouTube API with the pixel dimensions of the image.
if (embedWrappers !== null) {
  embedWrappers.forEach((item) => {
    item.firstElementChild.addEventListener("click", () => {
      const imgHeight = item.firstElementChild.clientHeight;
      const imgWidth = item.firstElementChild.clientWidth;
      let videoID = item.firstElementChild.name;
      item.firstElementChild.remove();

      let ytEmbed = document.createElement("iframe");
      ytEmbed.src = `https://www.youtube-nocookie.com/embed/${videoID}?autoplay=1`;
      ytEmbed.frameBorder = 0;
      ytEmbed.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      ytEmbed.allowFullscreen = true;
      ytEmbed.style.height = `${imgHeight}px`;
      ytEmbed.style.width = `${imgWidth}px`;
      item.appendChild(ytEmbed);
    });
  });
}

//EMAIL FORM

const emailForm = document.querySelector("form");

if (emailForm !== null) {
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let email,
      name,
      subject,
      msg = "";

    //This populates the variables which were set to "" by default
    Array.from(emailForm.children).forEach((item) => {
      email = item.name === "email" ? item.value : email;
      name = item.name === "name" ? item.value : name;
      subject = item.name === "subject" ? item.value : subject;
      msg = item.name === "msg" ? item.value : msg;
    });

    const submitButton = emailForm.lastElementChild;

    //This is the data sent to the email API
    //The the actual email data is inside template_params
    const emailData = {
      service_id: "service_sfe5oaf",
      template_id: "template_nxr0z9i",
      user_id: "user_KdipX7dbjtw6CapdNEytZ",
      accessToken: "92f38ba9726790d7869573a563753ef1",
      template_params: {
        reply_to: email,
        from_name: name,
        subject: subject,
        message: msg,
      },
    };

    //This is the animations, indicating to the user something is hapenning when they press the "send" button
    submitButton.style.transition = "color 1s";
    submitButton.style.color = "rgba(0,0,0,0)";
    submitButton.style.backgroundColor = "rgb(24, 24, 24)";
    disableInputs();
    setTimeout(() => {
      submitButton.value = "...";
      submitButton.style.color = "rgba(255, 255, 255, 1)";
    }, 1000);

    //Fetch request to the emailJS API with the form data as JSON
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        //If the HTTP response is 200 OK
        console.log(response);
        if (response === "OK") {
          submitButton.style.color = "rgba(0,0,0,0)";
          setTimeout(() => {
            submitButton.value = "Thank you!";
            submitButton.style.color = "rgba(255, 255, 255, 1)";
          }, 1000);
        } else {
          handleError();
        }
      })
      .catch((error) => {
        handleError();
        throw error;
      });

    //Disables the whole form and inicates to the user the data is unchangeable anymore
    function disableInputs() {
      Array.from(emailForm.children).forEach((item) => {
        if (item.tagName === "INPUT" || item.tagName === "TEXTAREA") {
          item.disabled = true;

          if (item.type !== "submit") {
            item.style.transition = "color 1.5s";
            item.style.color = "#5e5e5e";
          }
        }
      });
    }
    //Enables the form back in case of an error so the user can copy their data or modify it and try again
    function enableInputs() {
      Array.from(emailForm.children).forEach((item) => {
        if (item.tagName === "INPUT" || item.tagName === "TEXTAREA") {
          item.disabled = false;

          if (item.type !== "submit") {
            item.style.transition = "color 1.5s";
            item.style.color = "#fff";
          }
        }
      });
    }
    function handleError() {
      setTimeout(() => {
        submitButton.value = "Sorry. Try again later!";
        submitButton.style.color = "rgba(255, 255, 255, 1)";
        enableInputs();
      }, 1000);
    }
  });
}
