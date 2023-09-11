document.addEventListener('DOMContentLoaded', function () {
let currentPage = 1; 
let url = 'https://api.unsplash.com/search/photos?query=spring&per_page=20&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
let isSearch = false;
let allData = [];
const btnLoad = document.querySelector('.button-load');


if (isSearch === false) {
    getData();
}


async function getData(){
    const response = await fetch(url);
    const data = await response.json();
    allData.push(...data.results);
    if (parseInt(data.total) < 20){
        btnLoad.style.display = 'none';
    } else {
        btnLoad.style.display = 'block';
    }
    createGallery(allData);
}

function createGallery(data) {
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = '';

    data.forEach(function(element) {
        let thumbUrl = element.urls.regular;
        let width = element.width;
        let height = element.height;
        const div = document.createElement('div');
        if (parseInt(width) < parseInt(height)) {
            div.classList.add('horizontal');
        } else if (parseInt(width) > 5500) {
            div.classList.add('vertical');
        }
        const img = document.createElement('img');
        img.classList.add('gallery-img');
        img.src = thumbUrl;
        img.alt = `image`;

        galleryContainer.append(div);
        div.appendChild(img);
    });
}

    let search_input = document.getElementById('search-input');
    let loginForm = document.getElementById('loginForm');

    function handleSearch() {
        if (search_input.value === "") {
            return;
        } else {
            allData = [];
            url = `https://api.unsplash.com/search/photos?query=${search_input.value}&per_page=20&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
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




    btnLoad.addEventListener('click', function() {
        currentPage++; 
        url = url.concat(`&page=${currentPage}`);
        getData();
    })

});