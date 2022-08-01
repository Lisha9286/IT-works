let cards, card;
let newCards = [];
let newCard;
let firstCards;
const list = document.querySelector("#cards");

function searchResult(element) {
    list.innerHTML += `
        <div class="search__card">
            <div>
                <h5 class="search__card-title card-title">${element.occupation}<span class="card-title"> ${element.level}</span></h5>
                <div class="search__card-subtitle">Опыт работы</div>
                <div class="search__card-experience">${element.experience}</div>
                <div class="search__card-subtitle">Ожидаемая заработная плата</div>
                <div class="search__card-salary">${element.salary} $</div>
                <div class="search__card-subtitle">${element.city}</div>
            </div>
        <image src="${element.photo}" class="search__card-photo" alt="photo" />
        </div>`;
}

document.addEventListener("DOMContentLoaded", async function () {
    let url = "https://raw.githubusercontent.com/nas-tay/WorkIT-project/main/js/applicants.json";
    let response = await fetch(url);
    cards = await response.json();
    firstCards = cards;

    if (localStorage.getItem("searchRequest")) {
        document.querySelector("#inputSearchApp").value = localStorage.getItem("searchRequest");
        createObject();
        localStorage.removeItem("searchRequest");
    } else {
        for (card of cards) {
            searchResult(card);
        }
    }

    let arrCity = [];

    for (card of cards) {
        arrCity.push(card.city);
    }

    //получение массива уникальных городов соискателей
    let uniqArrCity = [...new Set(arrCity)];

    //создание выпадающего списка из массива уникальных городов
    for (uniqCity of uniqArrCity) {
        document.querySelector("#cities").innerHTML += `<option>${uniqCity}</option>`;
    }
});

function createObject() {
    //объект с параметрами из фильтра
    const filterObject = {
        city: document.querySelector("#city").value,
        experience: [],
        jobFormat: [],
        level: [],
        minSalary: +document.querySelector("#minSalary").value,
        maxSalary: +document.querySelector("#maxSalary").value,
    };

    // функция получения свойств-массивов объекта из фильтра
    function getFilter(filter, objectPush) {
        filter.forEach((element) => {
            if (element.checked) {
                objectPush.push(element.value);
            }
        });
    }

    const level = document.querySelectorAll(".level");
    const jobFormat = document.querySelectorAll(".format");
    const experience = document.querySelectorAll(".experience");

    getFilter(level, filterObject.level);
    getFilter(jobFormat, filterObject.jobFormat);
    getFilter(experience, filterObject.experience);

    console.log(filterObject);

    function searchApp() {
        list.innerHTML = "";
        const searchText = document.querySelector("#inputSearchApp").value;
        for (card of cards) {
            if (!searchText == "") {
                let search = new RegExp(searchText, "gi");
                const rez = search.test(card.keyWords);
                console.log(card.keyWords)
                if (rez) {
                    searchResult(card);
                    newCards.push(card);
                }
            }
            if (searchText == "") {
                searchResult(card);
                newCards.push(card);
            }
        }
        cards = newCards;
        newCards = [];
    }

    if (document.querySelector("#inputSearchApp").value !== "") {
        searchApp();
    }

    function searchCity() {
        list.innerHTML = "";
        for (card of cards) {
            if (card.city == filterObject.city) {
                searchResult(card);
                newCards.push(card);
            }
        }
        cards = newCards;
        newCards = [];
    }
    if (document.querySelector("#city").value !== "") {
        searchCity();
    }

    function searchLevel() {
        list.innerHTML = "";
        for (card of cards) {
            if (card.level == filterObject.level) {
                searchResult(card);
                newCards.push(card);
            }
        }
        cards = newCards;
        newCards = [];
    }
    if (filterObject.level.length !== 0) {
        searchLevel();
    }




    // function searchSalaryFact() {
    //     list.innerHTML = "";
    //     for (card of cards) {

    //             if (card.salary !== "") {
    //                 searchResult(card);
    //                 newCards.push(card);
    //             }
    //     }
    //     cards = newCards;
    //     newCards = [];
    // }
    // if (document.querySelector('#salary').checked) {
    //     searchSalaryFact();
    // }


    function serchSalary() {
        list.innerHTML = "";
        for (card of cards) {
            if (filterObject.minSalary !== 0 && card.salary >= filterObject.minSalary) {
                if (filterObject.maxSalary !== 0 && card.salary <= filterObject.minSalary) {
                    searchResult(card);
                    newCards.push(card);
                }
                if (filterObject.maxSalary == 0) {
                    searchResult(card);
                    newCards.push(card);
                }
            }
            if (filterObject.maxSalary !== 0 && card.salary <= filterObject.maxSalary) {
                if (filterObject.minSalary !== 0 && card.salary >= filterObject.minSalary) {
                    searchResult(card);
                    newCards.push(card);
                }
                if (filterObject.minSalary == 0) {
                    searchResult(card);
                    newCards.push(card);
                }
            }
        }
        cards = newCards;
        newCards = [];
    }

    if (filterObject.minSalary !== 0 || filterObject.maxSalary !== 0) {
        serchSalary();
    }

    function searchExperience() {
        list.innerHTML = "";
        for (card of cards) {
            let expYears = +card.experience.replace(/\D/g, "");
            console.log(expYears);
            if (document.querySelector("#zero").checked)
                if (expYears == 0) {
                    searchResult(card);
                    newCards.push(card);
                }
            if (document.querySelector("#small").checked) {
                if (expYears >= 1 && expYears <= 3) {
                    searchResult(card);
                    newCards.push(card);
                }
            }
            if (document.querySelector("#medium").checked) {
                if (expYears >= 3 && expYears <= 6) {
                    searchResult(card);
                    newCards.push(card);
                }
            }
            if (document.querySelector("#large").checked) {
                if (expYears >= 6) {
                    searchResult(card);
                    newCards.push(card);
                }
            }
        }
        cards = newCards;
        newCards = [];
    }

    if (filterObject.experience.length !== 0) {
        searchExperience();
    }

    function searchFormat() {
        list.innerHTML = "";
        for (card of cards) {
            if (document.querySelector("#distant").checked) {
                const search = new RegExp("удален", "gi");
                const rez = search.test(card.jobFormat);
                if (rez) {
                    searchResult(card);
                    newCards.push(card);
                }
            }
            if (document.querySelector("#office").checked) {
                const search = new RegExp("офис", "gi");
                const rez = search.test(card.jobFormat);
                if (rez) {
                    searchResult(card);
                    newCards.push(card);
                }
            }
            if (document.querySelector("#hybrid").checked) {
                const search = new RegExp("гибрид", "gi");
                const rez = search.test(card.jobFormat);
                if (rez) {
                    searchResult(card);
                    newCards.push(card);
                }
            }
        }
        cards = newCards;
        newCards = [];
    }
    if (filterObject.jobFormat.length !== 0) {
        searchFormat();
    }
}

const btnSearch = document.querySelector("#btnSearchApp");
const inputSearchApp = document.querySelector("#inputSearchApp");
const btnFilter = document.querySelector("#btnFilter");
const btnReboot = document.querySelector("#btnReboot");



inputSearchApp.onchange = () => {
    cards = firstCards;
    createObject();
}

btnSearch.addEventListener("click", () => {
    cards = firstCards;
    createObject();
});
btnFilter.addEventListener("click", () => {
    cards = firstCards;
    createObject();
});
inputSearchApp.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        cards = firstCards;
        createObject();
    }
});

btnReboot.addEventListener("click", () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((item) => {
        item.checked = false;
        item.value = "";
    });
    cards = firstCards;
    for (card of cards) {
        searchResult(card);
    };
});

function vacafiltermobile(screen) {
    if (screen.matches) {
        document.querySelector(".filter-vacancy__filter-mobile").innerHTML = `
        <div class="filter">
        <div class="filter-vacancy__title btnappfilter1">Фильтр</div>
        <div class="filter-vacancy__all1">
                        <div class="filter-vacancy__type">
                            <div class="filter-vacancy__title">Город</div>
                            <input type="text" name="city" id="city" placeholder="Город" list="cities">
                            <datalist id="cities">

                            </datalist>
                        </div>
                        <div class=" filter__card">
                            <div class="filter-vacancy__title">Уровень позиции</div>
                            <div><input class="filter__card-input form-check-input level" id="junior" value="junior"
                                    type="radio" name="level" />
                                <label class="filter__card-label" for="junior">Junior</label></div>
                            <div><input class="filter__card-input form-check-input level" id="middle" value="middle"
                                    type="radio" name="level" />
                                <label class="filter__card-label" for="middle">Middle</label></div>
                            <div><input class="filter__card-input form-check-input level" id="senior" value="senior"
                                    type="radio" name="level" />
                                <label class="filter__card-label" for="senior">Senior</label></div>
                        </div>
                        <div class="filter__card">
                            <div class="filter-vacancy__title">Опыт работы</div>
                            <div><input class="filter__card-input form-check-input experience" type="radio"
                                    name="experience" value="zero" id="zero" />
                                <label class="filter__card-label " for="zero"> Менее года</label></div>
                            <div><input class="filter__card-input form-check-input experience" type="radio"
                                    name="experience" value="medium" id="medium" />
                                <label class="filter__card-label " for="medium"> От 3 до 6 лет</label></div>
                            <div><input class="filter__card-input form-check-input experience" type="radio"
                                    name="experience" value="large" id="large" />
                                <label class="filter__card-label " name="large"> Более 6 лет</label></div>
                        </div>
                        <div class="filter__card">
                            <div class="filter-vacancy__title">Уровень дохода $</div>
                            <div class="filter__card-salary">
                                <input class="filter-vacancy__input-salary" type="number" placeholder="From"
                                    id="minSalary" />
                                <input class="filter-vacancy__input-salary" type="number" placeholder="To"
                                    id="maxSalary" /></div>
                            <div>
                                <input class="filter__card-input form-check-input" type="checkbox" name="salary" />
                                <label class="filter__card-label" for="salary">Указан доход</label></div>
                        </div>
                        <div class="filter__card">
                            <div class="filter-vacancy__title">Формат работы</div>
                            <div><input class="filter__card-input form-check-input format" id="distant"
                                    value="удаленный" type="checkbox" />
                                <label class="filter__card-label">Удаленный</label></div>
                            <div><input class="filter__card-input form-check-input format" id="office" value="офис"
                                    type="checkbox" />
                                <label class="filter__card-label">Офис</label></div>
                            <div><input class="filter__card-input form-check-input format" id="hybrid" value="гибрид"
                                    type="checkbox" />
                                <label class="filter__card-label">Гибрид</label></div>
                        </div>
                        <div class="filter-vacancy__btns">
                            <div class="filter-vacancy__change" id="btnFilter">Применить</div>
                            <div class="filter-vacancy__throwoff" id="btnReboot">Сбросить</div>
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
    var text = document.querySelector(".btnappfilter1");
    if (ele.style.display == "block") {
        ele.style.display = "none";
        text.innerHTML = "Фильтр";
    } else {
        ele.style.display = "block";
        text.innerHTML = "Скрыть фильтр";
    }
}
document.getElementById('btnappfilter').addEventListener('click', () => {
    filtermobile();
});