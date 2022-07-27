let cards, card;

document.addEventListener("DOMContentLoaded", async function () {
    let url = 'vacancy.json';
    let response = await fetch(url);
    cards = await response.json();
    const catalog = document.querySelector('#cards-vacancy');
    for (card of cards) {
        catalog.innerHTML +=
            `<div class="search__card">
                <div>
                    <h5 class="search__card-title card-title">${card.occupation}<span class="card-title"> ${card.level}</span>
                    </h5>
                    <div class="search__card-subtitle">Компания</div>
                    <div class="search__card-experience">${card.company}</div>
                    <div class="search__card-subtitle">Город</div>
                    <div class="search__card-city">${card.city}</div>
                    <div class="search__card-subtitle">Ожидаемая заработная плата</div>
                    <div class="search__card-salary">${card.salary} $</div>
                </div>
            </div>`;
    };
    
    let vacaCity = [];

    for (card of cards) {
        vacaCity.push(card.city);
    }
    let uniqvacaCities = [...new Set(vacaCity)]
    console.log(uniqvacaCities);

    for (uniqVacaCity of uniqvacaCities) {
        document.querySelector('.filter-vacancy__cities').innerHTML += `<option>${uniqVacaCity}</option>`
    }
});

let btnSearch = document.querySelector('#btnSearchvacancy');
let inputSearchApp = document.querySelector('#inputSearchvacancy');


function serchvaca() {
    const searchvaca = document.querySelector('#inputSearchvacancy').value;
    const catalog = document.querySelector('#cards-vacancy');
    catalog.innerHTML = "";

    for (card of cards) {
        if (searchvaca) {
            const vacasearch = new RegExp(searchvaca, "gi");
            const keyvaca = vacasearch.test(card.keyWords);
            console.log(keyvaca)
            if (keyvaca) {
                catalog.innerHTML += 
            `<div class="search__card">
                <div>
                    <h5 class="search__card-title card-title">${card.occupation}<span class="card-title"> ${card.level}</span>
                    </h5>
                    <div class="search__card-subtitle">Компания</div>
                    <div class="search__card-experience">${card.company}</div>
                    <div class="search__card-subtitle">Город</div>
                    <div class="search__card-city">${card.city}</div>
                    <div class="search__card-subtitle">Ожидаемая заработная плата</div>
                    <div class="search__card-salary">${card.salary} $</div>
                </div>
            </div>`;
            }
        }
    };
}

//вызов функции поиска
btnSearch.addEventListener('click', () => {
    serchvaca()
});
inputSearchApp.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        serchvaca()
    }
    
});