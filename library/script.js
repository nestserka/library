console.log("Верстка соотвествует макету! Добавлены все кнопки +26 \n Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n   На ширине экрана 768рх реализовано адаптивное меню +12 \n total 100")

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

function closeMenu() {
  nav.classList.remove('open');
  burger.classList.remove('active');
  nav.classList.add('close');

  setTimeout(() => {
    nav.classList.remove('close');
  }, 300); 
}


burger.addEventListener('click', function() {
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

document.body.addEventListener('click', (event) => {
  const isInsideMenu = event.target.closest('.nav');
  const isBurgerIcon = event.target.closest('.burger');
  if (!isInsideMenu && !isBurgerIcon && nav.classList.contains('open')) {
    closeMenu();
  }
});


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
const itemWidth = 450;
let gap = 25;
const movePosition = slidesToScroll * itemWidth;



items.forEach((item) => {
    item.style.minWidth =`${itemWidth}px`;
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
  });
});

btnNext.addEventListener('click', () => { 
  const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth + (slidesToShow - 1)) / itemWidth;
  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
  const currentIndex = Math.floor(Math.abs(position) / itemWidth);
  radioButtons[currentIndex].checked = true;
});

btnPrev.addEventListener('click', () => { 
  const itemsLeft = Math.abs(position) / itemWidth;
  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
  const currentIndex = Math.floor(Math.abs(position) / itemWidth);
  radioButtons[currentIndex].checked = true;
});


const checkBtns = () => {
    btnPrev.classList.toggle('disabled', position === 0);
    btnNext.classList.toggle('disabled',  position <= -(itemsCount - slidesToShow) * itemWidth);
};


checkBtns();
