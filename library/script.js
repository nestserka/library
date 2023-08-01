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