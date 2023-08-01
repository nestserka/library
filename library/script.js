console.log("Верстка соотвествует макету! Добавлены все кнопки +26 \n Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n   На ширине экрана 768рх реализовано адаптивное меню +12 \n total 100")


document.querySelector('.burger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav').classList.toggle('open')
})


const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav').classList.remove('open'); 
      document.querySelector('.burger').classList.remove('active');
    });
});

document.body.addEventListener('click', (event) => {
  const isInsideMenu = event.target.closest('.nav');
  const isBurgerIcon = event.target.closest('.burger');
  if (!isInsideMenu && !isBurgerIcon) {
    document.querySelector('.nav').classList.remove('open');
    document.querySelector('.burger').classList.remove('active');
  }
});