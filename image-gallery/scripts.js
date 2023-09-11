document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1;
    let url = 'https://api.unsplash.com/search/photos?query=spring&per_page=15&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
    let isSearch = false;
    let allData = [];
    const btnLoad = document.querySelector('.button-load');
    const galleryContainer = document.getElementById('gallery');


    if (isSearch === false) {
        getData();
    }


    async function getData() {
        const response = await fetch(url);
        const data = await response.json();
        allData.push(...data.results);
        if (parseInt(data.total) < 20) {
            btnLoad.style.display = 'none';
        } else {
            btnLoad.style.display = 'block';
        }
        if (data.total > 0) {
            createGallery(allData);
        } else {
            galleryContainer.innerHTML = '';
            const p = document.createElement('p');
            p.classList.add('search-result');
            let text = document.createTextNode("Sorry. Nothing found. Try to use another keyword");
            galleryContainer.append(p);
            p.append(text);
        }
    }


    function createGallery(data) {
        galleryContainer.innerHTML = '';
        data.forEach(function (element) {
            let thumbUrl = element.urls.regular;
            let width = element.width;
            let height = element.height;
            const div = document.createElement('div');
            const div2 = document.createElement('div');
            div2.classList.add('author');
            const p = document.createElement('p');
            const a = document.createElement('a');
            a.href = element.user.links.html;
            p.classList.add('user-name');
            let userName = element.user.name;
            a.append(userName);
            if (parseInt(width) < parseInt(height)) {
                div.classList.add('horizontal');
            } else if (parseInt(width) > 5500) {
                div.classList.add('vertical');
            }
            const img = document.createElement('img');
            img.classList.add('gallery-img');
            img.src = thumbUrl;
            img.alt = `image`;

            const userImg = document.createElement('img');
            userImg.classList.add('user-img');
            userImg.src = element.user.profile_image.small;
            userImg.alt = `image`;


            galleryContainer.append(div);
            div.appendChild(div2);
            div2.appendChild(userImg);
            div2.appendChild(p);
            p.appendChild(a);
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
            url = `https://api.unsplash.com/search/photos?query=${search_input.value}&per_page=15&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
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

    btnLoad.addEventListener('click', function () {
        currentPage++;
        url = url.concat(`&page=${currentPage}`);
        getData();
    });

});

