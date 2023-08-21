// variables
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
let userProfileLink = document.querySelector(".user-profile");
let open_modals = document.querySelectorAll('.register-new');
let close_modal = document.getElementById('close_modal');
let modal = document.getElementById('modal');
let body = document.body;
let open_login_modals = document.querySelectorAll('.login-current');
let modal_login = document.getElementById('modal-login');
let body_login = document.body;
let close_modal_login = document.getElementById('close_modal_login');
const navLinks = document.querySelectorAll('.nav-link');
let  dropdownContentList = document.querySelectorAll('.dropdown-content');
let buy_books = document.querySelectorAll('.buy');
let checkIfLoggedIn = false;
let tempKey;

// slider

const btnPrev = document.querySelector('.left-arrow');
const btnNext = document.querySelector('.right-arrow');
let position = 0;
const slidesToShow = window.innerWidth > 768 ? 3 : 1;
const slidesToScroll = 1;
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const radioButtons = document.querySelectorAll('.picture-radio-buttons input[type="radio"]');
const items = document.querySelectorAll('.slider-item');
const itemsCount = items.length;
let gap = 25;
let itemWidth = (container.clientWidth - ((slidesToShow - 1) * gap)) / slidesToShow;
if (window.innerWidth <= 768) {
  itemWidth = 450;
}
const movePosition = slidesToScroll * itemWidth;


window.onload = function () {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let storedValue = localStorage.getItem(key);
    let userData = JSON.parse(storedValue);
    if (userData.isLoggedIn === true){
      checkIfLoggedIn = true;
      tempKey = userData.bookCard;
      updateProfileImage(userData);
      break;
    }
  }
}



function closeMenu() {
  nav.classList.remove('open');
  burger.classList.remove('active');
  nav.classList.add('close');

  setTimeout(() => {
    nav.classList.remove('close');
  }, 300);
}


burger.addEventListener('click', function () {
  this.classList.toggle('active');
  if (nav.classList.contains('open')) {
    closeMenu();
  } else {
    nav.classList.add('open');
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav').classList.remove('open');
    document.querySelector('.burger').classList.remove('active');
    nav.classList.add('close');

    setTimeout(() => {
      nav.classList.remove('close');
    }, 300);
  });
});


document.body.addEventListener('click', (event) => {
  const isInsideMenu = event.target.closest('.nav');
  const isBurgerIcon = event.target.closest('.burger');
  let isRegistrationIcon = event.target.closest('.user-profile');

  if (!isInsideMenu && !isRegistrationIcon) {
    dropdownContentList.forEach(dropdownContent => {
      dropdownContent.classList.remove('show');
    });
  }

  if (!isInsideMenu && !isBurgerIcon && nav.classList.contains('open')) {
    closeMenu(); 
  }
});



// slider
items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
})

const setPosition = () => {
  track.style.transform = `translateX(${position}px)`
};

radioButtons.forEach((radioButton, index) => {
  radioButton.addEventListener('change', () => {
    if (window.innerWidth <= 768) {
      position = -(index * itemWidth);
    } else {
      position = -(index * (itemWidth + gap));
    }
    setPosition();
    updateRadioButtons();
  });
});

btnNext.addEventListener('click', () => {
  const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth + (slidesToShow - 1)) / itemWidth;
  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
  const currentIndex = Math.floor(Math.abs(position) / itemWidth);
  radioButtons[currentIndex].checked = true;
  updateRadioButtons();
});

btnPrev.addEventListener('click', () => {
  const itemsLeft = Math.abs(position) / itemWidth;
  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
  const currentIndex = Math.floor(Math.abs(position) / itemWidth);
  radioButtons[currentIndex].checked = true;
  updateRadioButtons();
});


const checkBtns = () => {
  btnPrev.classList.toggle('disabled', position === 0);
  btnNext.classList.toggle('disabled', position <= -(itemsCount - slidesToShow) * itemWidth);
}

const updateRadioButtons = () => {
  radioButtons.forEach((rb) => {
    rb.disabled = rb.checked;
  });
};

checkBtns();
updateRadioButtons();


// books-slider

const bookRadioLabels = document.querySelectorAll('.radio-label');
const sliderContainers = document.querySelectorAll('.books-slider-container');

sliderContainers[0].classList.add('active');

bookRadioLabels.forEach((label, index) => {
    label.addEventListener('click', () => {
        sliderContainers.forEach((container, i) => {
            if (i === index) {
                if (!container.classList.contains('active')) {
                  setTimeout(function() {
                    container.classList.add('active');
                    container.classList.add("elementToFadeIn");}, 1000);
                }
            } else {
                if (container.classList.contains('active')) {
                  container.classList.remove("elementToFadeIn");
                    container.classList.add("elementToFadeInAndOut");
                    setTimeout(function() {
                        container.classList.remove("elementToFadeInAndOut");
                        container.classList.remove('active');
                    }, 1000); 
                }
            }
        });
    });
});


// registration form

userProfileLink.addEventListener("click", function(event) {
    event.preventDefault();
    if (checkIfLoggedIn) {
    document.getElementById("loggedin-profile").classList.toggle("show");
    let sectionsTitle = document.querySelector(".book-number");
    sectionsTitle.textContent = tempKey;
    } else {
    document.getElementById("register").classList.toggle("show");
    }
});

for (let i = 0; i < open_modals.length; i++) {
    open_modals[i].addEventListener('click', function() {
        modal.classList.add('modal_vis');
        body.classList.add('body_block');
    });
}

close_modal.addEventListener('click', function() {
    modal.classList.add('modal_fade');
  
    setTimeout(function(){
      modal.classList.remove('modal_vis');
      body.classList.remove('body_block');
      modal.classList.remove('modal_fade');
    }, 1000);
});

modal.addEventListener('click', function(event) {
    if (event.target === modal) {

      modal.classList.add('modal_fade');
      setTimeout(function(){
        modal.classList.remove('modal_vis');
        body.classList.remove('body_block');
        modal.classList.remove('modal_fade');
      }, 1000);
    }
});


// login

for (let i = 0; i < open_login_modals.length; i++) {
  open_login_modals[i].addEventListener('click', function() {
    modal_login.classList.add('modal_vis');
    body_login.classList.add('body_block');
    });
}

close_modal_login.addEventListener('click', function() {
  modal_login.classList.add('modal_fade');
  setTimeout(function(){
    modal_login.classList.remove('modal_vis');
    body_login.classList.remove('body_block');
    modal_login.classList.remove('modal_fade');
  }, 1000);
});

modal_login.addEventListener('click', function(event) {
  if (event.target === modal_login) {
    modal_login.classList.add('modal_fade');
  setTimeout(function(){
    modal_login.classList.remove('modal_vis');
    body_login.classList.remove('body_block');
    modal_login.classList.remove('modal_fade');
  }, 1000);
  }
});


// register

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("userForm").addEventListener("submit", function(event) {
      event.preventDefault();

      var userName = document.getElementById("firstname").value;
      var surname = document.getElementById("surname").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      let size = 9;
      var bookCard = [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
      var visit = 1;
      var key = bookCard;
      var isLoggedIn = true;
      var booksOwn = 0;

      const user = {
          userName,
          surname,
          email,
          password,
          visit,
          bookCard,
          isLoggedIn,
          booksOwn
      };

      localStorage.setItem(key, JSON.stringify(user));
      console.log("User data saved:", user);
      checkIfLoggedIn = true;
      tempKey = bookCard;
      updateProfileImage(user);
      modal.classList.remove('modal_vis');
      body.classList.remove('body_block');
  });
});

let extra_modal = document.querySelector('.underline');

extra_modal.addEventListener('click', function() {
    modal.classList.remove('modal_vis');
    body.classList.remove('body_block');
    modal_login.classList.add('modal_vis');
    body_login.classList.add('body_block');
});

let register_button = document.querySelector('.underline-register');

register_button.addEventListener('click', function() {
  modal_login.classList.remove('modal_vis');
  body_login.classList.remove('body_block');
  modal.classList.add('modal_vis');
  body.classList.add('body_block');
});



for (let i = 0; i < buy_books.length; i++) {
  buy_books[i].addEventListener('click', function() {
    modal_login.classList.add('modal_vis');
    body_login.classList.add('body_block');
    });
}


// login

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("retrieveButton").addEventListener("click", function(event) {
    event.preventDefault();

    let searchValue = document.getElementById("loginemail").value;
    let password = document.getElementById("login_password").value;
    let matchingUser = null;

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let storedValue = localStorage.getItem(key);

      try {
        let userData = JSON.parse(storedValue);
        if (
          userData.email === searchValue ||
          userData.bookCard === searchValue
        ) {
          matchingUser = userData;
          console.log("Found matching record with key:", key);
          console.log("Matching value:", userData);
          break; 
        }
      } catch (error) {
        console.log("Error parsing JSON for key:", key);
      }
    }

    if (matchingUser) {
      if (matchingUser.password == password) {
        console.log("Password is correct. You are logged in.");
        matchingUser.visit += 1
        matchingUser.isLoggedIn = true;
        localStorage.setItem(matchingUser.bookCard, JSON.stringify(matchingUser));
        updateProfileImage(matchingUser);
      } else {
        console.log("Incorrect password.");
      }
    } else {
      console.log("User not found.");
    }
  });
});


function updateProfileImage(user) {
  let initials = (user.userName[0] || "") + (user.surname[0] || "");
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  canvas.width = 28;
  canvas.height = 28;

  let font = new FontFace('intel-regular', 'url(../library/fonts/Inter-Regular.ttf)');
  ctx.beginPath();
  ctx.arc(14, 14, 14, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.font = "bold 13px intel-regular";
  ctx.textAlign = "center";
  ctx.fillText(initials, 14, 19);

  let profileImage = document.getElementById("profileImage");
  profileImage.src = canvas.toDataURL();
  console.log(profileImage.src);
}