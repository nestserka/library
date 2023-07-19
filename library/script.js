console.log(100)

document.querySelector('.burger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav').classList.toggle('open')
})

