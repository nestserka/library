console.log(100)

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

