let cards, card
const list = document.querySelector('#cards');

function searchResult(element) {
        list.innerHTML += `
        <div class="search__card">
            <div>
                <h5 class="search__card-title card-title">${element.occupation}<span class="card-title"> ${element.level}</span></h5>
                <div class="search__card-subtitle">Опыт работы</div>
                <div class="search__card-experience">${element.experience} (год/лет)</div>
                <div class="search__card-subtitle">Ожидаемая заработная плата</div>
                <div class="search__card-salary">${element.salary} $</div>
            </div>
        <image src="${element.photo}" class="search__card-photo" alt="photo" />
        </div>`;
    
}

document.addEventListener("DOMContentLoaded", async function () {
    let url = 'applicants.json';
    let response = await fetch(url);
    cards = await response.json();

    for (card of cards) {
        searchResult(card);
    };

    let arrCity = [];

    for (card of cards) {
        arrCity.push(card.city);
    }

    //получение массива уникальных городов соискателей
    let uniqArrCity = [...new Set(arrCity)];

    //создание выпадающего списка из массива уникальных городов
    for (uniqCity of uniqArrCity) {
        document.querySelector('#cities').innerHTML += `<option>${uniqCity}</option>`
    }
});


function serchApp() {
    list.innerHTML = "";
    const searchText = document.querySelector('#inputSearchApp').value;
    for (card of cards) {
        if (!searchText == "") {
            const search = new RegExp(searchText, "gi");
            const rez = search.test(card.keyWords);
            console.log(rez)
            if (rez) {
                searchResult(card);
            }
        }
        if (searchText == "") {
            searchResult(card);
        }

    };
}

function createObject() {
    //объект с параметрами из фильтра
    const filterObject = {
        city: document.querySelector('#city').value,
        jobFormat: [],
        level: [],
        minSalary: +document.querySelector('#minSalary').value,
        maxSalary: +document.querySelector('#maxSalary').value,
        experience: [],
    }

    // функция получения свойств-массивов объекта из фильтра
    function getFilter(filter, objectPush) {
        filter.forEach((element, index) => {
            if (element.checked) {
                objectPush.push(element.value);
            }
        });
    }

    const level = document.querySelectorAll('.level');
    const jobFormat = document.querySelectorAll('.format');
    const experience = document.querySelectorAll('.experience')

    getFilter(level, filterObject.level);
    getFilter(jobFormat, filterObject.jobFormat);
    getFilter(experience, filterObject.experience);
    console.log(filterObject);
}

const btnSearch = document.querySelector('#btnSearchApp');
const inputSearchApp = document.querySelector('#inputSearchApp');
const btnFilter = document.querySelector('#btnFilter');
const btnReboot = document.querySelector('#btnReboot');

btnSearch.addEventListener('click', () => {
    serchApp();
    createObject();
});
btnFilter.addEventListener('click', () => {
    createObject();
});
inputSearchApp.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        serchApp();
        createObject();
    }
});

btnReboot.addEventListener('click', () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(item => {
        item.checked = false;
        item.value = "";
    });
});