const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector("#imagelist-wrapper");

form.addEventListener("submit", search);
clearButton.addEventListener("click", clear);

function clear() {
    searchInput.value = "";
    imageListWrapper.innerHTML = ""; // Daha basit ve hızlı bir yöntem
}

function search(e) {
    e.preventDefault(); // Formun sayfa yenilemesini engelle

    const value = searchInput.value.trim();
    if (!value) return; // Boş arama yapılmasını engelle

    clear(); // Önceki resimleri temizle

    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID C-ZwMdVfZLUqf2EUV6lJeOB9k0_1CVGHsXaUfwJRamU"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        data.results.forEach((image) => addImageToUI(image.urls.small));
    })
    .catch((err) => console.log(err));
}

function addImageToUI(url) {
    const div = document.createElement("div");
    div.className = "col-md-4 d-flex justify-content-center"; // 3 sütunlu düzen

    const card = document.createElement("div");
    card.className = "card shadow-sm w-100"; // Bootstrap ile genişliği ayarla

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.className = "card-img-top";
    img.style.height = "200px";
    img.style.objectFit = "cover"; // Resmin bozulmasını engelle

    card.appendChild(img);
    div.appendChild(card);
    imageListWrapper.appendChild(div);
}