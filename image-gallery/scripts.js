let url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
let isSearch = false;


if (isSearch === false) {
    getData();
}

async function getData(){
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    createGallery(data);
}

function createGallery(data){
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = '';
    data.results.map(function(element){
        let thumbUrl = element.urls.regular;
        const img = document.createElement('img');
        img.classList.add('gallery-img')
        img.src = thumbUrl;
        img.alt = `image`;
        console.log("test" +img);
        galleryContainer.append(img);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let search_input = document.getElementById('search-input');
    let loginForm = document.getElementById('loginForm');

    function handleSearch() {
        if (search_input.value === "") {
            return;
        } else {
            url = `https://api.unsplash.com/search/photos?query=${search_input.value}&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
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




