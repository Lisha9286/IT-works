let cards, card

//загрузка карточек при открытии страницы
document.addEventListener("DOMContentLoaded", async function () {
    let url = 'applicants.json';
    let response = await fetch(url);
    cards = await response.json();


    for (card of cards) {
        document.querySelector('#cards').innerHTML +=
            `<div class="search__card">
        <div>
            <h5 class="search__card-title card-title">${card.occupation}<span class="card-title"> ${card.level}</span>
            </h5>
            <div class="search__card-subtitle">Опыт работы</div>
            <div class="search__card-experience">${card.experience} (год/лет)</div>
            <div class="search__card-subtitle">Ожидаемая заработная плата</div>
            <div class="search__card-salary">${card.salary} $</div>
        </div>
        <image
            src="${card.photo}"
            class="search__card-photo" alt="photo" />
    </div>`
    };
});

let btnSearch = document.querySelector('#btnSearchApp');
let inputSearchApp = document.querySelector('#inputSearchApp');


// функция поиска по ключевым словам
function serchApp() {
    const searchText = document.querySelector('#inputSearchApp').value;
    const list = document.querySelector('#cards');
    list.innerHTML = "";

    for (card of cards) {
        if (searchText) {
            const search = new RegExp(searchText, "gi");
            const rez = search.test(card.keyWords);
            console.log(rez)
            if (rez) {
                list.innerHTML += `<div class="search__card">
                    <div>
                        <h5 class="search__card-title card-title">${card.occupation}<span class="card-title"> ${card.level}</span>
                        </h5>
                        <div class="search__card-subtitle">Опыт работы</div>
                        <div class="search__card-experience">${card.experience} (год/лет)</div>
                        <div class="search__card-subtitle">Ожидаемая заработная плата</div>
                        <div class="search__card-salary">${card.salary} $</div>
                    </div>
                    <image
                        src="${card.photo}"
                        class="search__card-photo" alt="photo" />
                </div>`;
            }
        }
    };
}

//вызов функции поиска
btnSearch.addEventListener('click', () => {
    serchApp()
});
inputSearchApp.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        serchApp()
    }
});