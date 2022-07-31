let cards, card;
const catalog = document.querySelector("#cards-vacancy");

function insertResult(element) {
    catalog.innerHTML += `<div class="search__card">
                    <div>
                        <h5 class="search__card-title card-title">${element.occupation}</h5>
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
        document.querySelector("#cities").innerHTML += `<option class="filter-city__inside">${uniqVacaCity}</option>`;
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

btnSearch.addEventListener("click", () => {
    serchvaca();
});
inputSearchApp.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        serchvaca();
    }
});






function vacafiltermobile(screen) {
    if (screen.matches) {
        document.querySelector(".filter-vacancy__filter-mobile").innerHTML = `
        <div class="filter1">
        <div class="filter-vacancy__filter-title btnvacafilter1" id = "btnvacafilter">Фильтр</div>
        <div class="filter-vacancy__all1">
            <div class="filter-vacancy__type">
                <div class="filter-vacancy__title"">Город</div>
                <input type="text" name="city" placeholder ="Город не выбран" list="cities" class="filter-vacancy__cities">
                <datalist id = "cities">
                
                </datalist>
            </div>
            <div class="filter-vacancy__type">
                <div class="filter-vacancy__title">Уровень позиции</div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label" for="junior">Junior</label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="junior" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label" for="middle">Middle</label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="middle" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label" for="senior">Senior</label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="senior" />
                </div>
            </div>
            <div class="filter-vacancy__type">
                <div class="filter-vacancy__title">Опыт работы</div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label " for="zero">Нет опыта </label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="zero" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label " for="small">От 1 года до 3 лет </label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="small" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label" for="medium">От 3 до 6 лет</label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="medium" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label " name="large">Более 6 лет</label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="large" />
                </div>
            </div>
            <div class="filter-vacancy__type">
                <div class="filter-vacancy__title">Уровень дохода</div>
                <div class="filter__card-salary">
                    <input class="filter-vacancy__input-salary" type="number" placeholder="от" />
                    <input class="filter-vacancy__input-salary" type="number" placeholder="до" /></div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy-label" for="salary">Указан доход</label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="salary" />
                </div>
            </div>
            <div class="filter-vacancy__type">
                <div class="filter-vacancy__title">Формат работы</div>
                <div class="filter-vacancy__point1">
                    <label class="filter__card-label">Удаленный</label>
                    <input class="filter__card-input form-check-input" type="checkbox" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter__card-label">Офис</label>
                    <input class="filter__card-input form-check-input" type="checkbox" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter__card-label">Гибрид</label>
                    <input class="filter__card-input form-check-input" type="checkbox" />
                </div>
            </div>
            <div class="filter-vacancy__btns">
                <div class="filter-vacancy__change">Применить</div>
                <div class="filter-vacancy__throwoff">Сбросить</div>
            </div>
        </div>
    </div>
        `;
    }
}

let screen = window.matchMedia("(max-width: 797px)");
vacafiltermobile(screen);
screen.addEventListener("DOMContentLoaded", vacafiltermobile);

function filtermobile() {
var ele = document.querySelector(".filter-vacancy__all1");
var text = document.querySelector(".btnvacafilter1");
if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "Фильтер";
  }
else {
    ele.style.display = "block";
    text.innerHTML = "Скрыть фильтер";
}
}
document.getElementById ('btnvacafilter').addEventListener('click', () => {
    filtermobile();
  });




