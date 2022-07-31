let cards, card;
const catalog = document.querySelector("#cards-vacancy");

function insertResult(element) {
    catalog.innerHTML += `<div class="search__card">
                    <div>
                        <h5 class="search__card-title card-title">${element.occupation}</h5>
                        <div class="search__card-subtitle">Company</div>
                        <div class="search__card-experience">${element.company}</div>
                        <div class="search__card-subtitle">City</div>
                        <div class="search__card-city">${element.city2}</div>
                        <div class="search__card-subtitle">Salary</div>
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
        vacaCity.push(card.city2);
    }
    let uniqvacaCities = [...new Set(vacaCity)];

    for (uniqVacaCity of uniqvacaCities) {
        document.querySelector(".filter-vacancy__cities").innerHTML += `<option class="filter-city__inside">${uniqVacaCity}</option>`;
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

function vacafiltermobile(vacamob) {
    if (vacamob.matches) {
        document.querySelector(".filter-vacancy__filter-mobile").innerHTML = `
        <div class="filter1">
        <div class="filter-vacancy__filter-title btnvacafilter1" id = "btnvacafilter">Filter</div>
        <div class="filter-vacancy__all1">
            <div class="filter-vacancy__type">
                <div class="filter-vacancy__title"">City</div>
                <select class="filter-vacancy__cities">
                    <option selected>City is not selected</option>
                </select>
            </div>
            <div class="filter-vacancy__type">
                <div class="filter-vacancy__title">Level</div>
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
                <div class="filter-vacancy__title">Work experience</div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label " for="zero">No experience </label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="zero" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label " for="small">1-3 years </label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="small" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label" for="medium">3-6 years</label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="medium" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy__card-label " name="large">Over 6 years</label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="large" />
                </div>
            </div>
            <div class="filter-vacancy__type">
                <div class="filter-vacancy__title">Salary level</div>
                <div class="filter__card-salary">
                    <input class="filter-vacancy__input-salary" type="number" placeholder="From" />
                    <input class="filter-vacancy__input-salary" type="number" placeholder="To" /></div>
                <div class="filter-vacancy__point1">
                    <label class="filter-vacancy-label" for="salary">With salary</label>
                    <input class="filter-vacancy__card-input form-check-input" type="checkbox"
                        name="salary" />
                </div>
            </div>
            <div class="filter-vacancy__type">
                <div class="filter-vacancy__title">Work format</div>
                <div class="filter-vacancy__point1">
                    <label class="filter__card-label">Distant</label>
                    <input class="filter__card-input form-check-input" type="checkbox" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter__card-label">Office</label>
                    <input class="filter__card-input form-check-input" type="checkbox" />
                </div>
                <div class="filter-vacancy__point1">
                    <label class="filter__card-label">Hybrid</label>
                    <input class="filter__card-input form-check-input" type="checkbox" />
                </div>
            </div>
            <div class="filter-vacancy__btns">
                <div class="filter-vacancy__change">Apply</div>
                <div class="filter-vacancy__throwoff">Reset</div>
            </div>
        </div>
    </div>
        `;
    }
}

let vacamob = window.matchMedia("(max-width: 797px)");
vacafiltermobile(vacamob);
vacamob.addEventListener("DOMContentLoaded", vacafiltermobile);

function filtermobile() {
var ele = document.querySelector(".filter-vacancy__all1");
var text = document.querySelector(".btnvacafilter1");
if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "Filter";
  }
else {
    ele.style.display = "block";
    text.innerHTML = "Close";
}
}
document.getElementById ('btnvacafilter').addEventListener('click', () => {
    filtermobile();
  });
