const url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';



async function getData(){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // createGallery(data);
}

getData();

function createGallery(data){
    const galleryContainer = document.getElementById('gallery');
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

