let currentPage = 1; 
let url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
let isSearch = false;


if (isSearch === false) {
    getData();
}

async function getData(){
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();
    console.log(data.total_pages);

    createGallery(data);
}

function createGallery(data){
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = '';
    data.results.map(function(element){
        let thumbUrl = element.urls.regular;
        let width = element.width;
        let height = element.height;
        const div = document.createElement('div');
        if (parseInt(width) < parseInt(height)) {
            div.classList.add('horizontal')
        } else if (parseInt(width) > 5500){
            div.classList.add('vertical')
        } 
        const img = document.createElement('img');
        img.classList.add('gallery-img')
        img.src = thumbUrl;
        img.alt = `image`;
       
        galleryContainer.append(div);
        div.appendChild(img);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let search_input = document.getElementById('search-input');
    let loginForm = document.getElementById('loginForm');

    function handleSearch() {
        if (search_input.value === "") {
            return;
        } else {
            url = `https://api.unsplash.com/search/photos?query=${search_input.value}&per_page=21&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
            getData();
        }
    }

    search_input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); 
            handleSearch();
        }
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        handleSearch();
    });
});


// document.addEventListener('DOMContentLoaded', function () {
//     let btnLoad = document.querySelector('.button-load');
//     btnLoad.addEventListener('click', function() {
//         url = url.concat("&page=2");
//         getData();
//     })
// });