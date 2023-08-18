// burger
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

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


const navLinks = document.querySelectorAll('.nav-link');
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

const dropdownContent = document.querySelector('.dropdown-content');


document.body.addEventListener('click', (event) => {
  const isInsideMenu = event.target.closest('.nav');
  const isBurgerIcon = event.target.closest('.burger');
  const isRegistrationIcon = event.target.closest('.user-profile');

  if (!isInsideMenu && !isRegistrationIcon) {
    dropdownContent.classList.remove('show'); // Close dropdown
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

let userProfileLink = document.querySelector(".user-profile");

userProfileLink.addEventListener("click", function(event) {
    event.preventDefault(); 
    document.getElementById("register").classList.toggle("show");
    console.log("User profile link clicked!");
});