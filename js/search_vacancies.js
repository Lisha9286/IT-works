let cards, card;
const catalog = document.querySelector("#cards-vacancy");

function insertResult(element) {
    catalog.innerHTML += `<div class="search__card">
                    <div>
                        <h5 class="search__card-title card-title">${element.occupation}<span class="card-title"> ${element.level}</span>
                        </h5>
                        <div class="search__card-subtitle">Компания</div>
                        <div class="search__card-experience">${element.company}</div>
                        <div class="search__card-subtitle">Город</div>
                        <div class="search__card-city">${element.city}</div>
                        <div class="search__card-subtitle">Ожидаемая заработная плата</div>
                        <div class="search__card-salary">${element.salary} $</div>
                    </div>
                </div>`;
}

document.addEventListener("DOMContentLoaded", async function () {
    let url = "https://raw.githubusercontent.com/nas-tay/WorkIT-project/main/js/vacancy.json";
    let response = await fetch(url);
    cards = await response.json();

    if (localStorage.getItem("searchRequest")) {
        document.querySelector("#inputSearchvacancy").value = localStorage.getItem("searchRequest");
        serchvaca();
        localStorage.removeItem("searchRequest");
    } else {
        for (card of cards) {
            insertResult(card);
        }
    }

    let vacaCity = [];

    for (card of cards) {
        vacaCity.push(card.city);
    }
    let uniqvacaCities = [...new Set(vacaCity)];

    for (uniqVacaCity of uniqvacaCities) {
        document.querySelector(".filter-vacancy__cities").innerHTML += `<option>${uniqVacaCity}</option>`;
    }
});

let btnSearch = document.querySelector("#btnSearchvacancy");
let inputSearchApp = document.querySelector("#inputSearchvacancy");

function serchvaca() {
    const searchText = document.querySelector("#inputSearchvacancy").value;
    const catalog = document.querySelector("#cards-vacancy");
    catalog.innerHTML = "";

    for (card of cards) {
        if (searchText) {
            const vacasearch = new RegExp(searchText, "gi");
            const keyvaca = vacasearch.test(card.keyWords);
            if (keyvaca) {
                insertResult(card);
            }
        }
        if (!searchText) {
            insertResult(card);
        }
    }
}

//вызов функции поиска
btnSearch.addEventListener("click", () => {
    serchvaca();
});
inputSearchApp.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        serchvaca();
    }
});
