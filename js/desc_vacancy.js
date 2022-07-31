let cards, card;
const catalog = document.querySelector("#descr-vacancy");
const catalog2 = document.querySelector(".searching__filters")

function descard(element) {
    catalog.innerHTML += `<div class="search__card1">
                    <div>
                        <h5 class="search__card-title1 card-title1">${element.occupation}</h5>
                        <div class="search__card-subtitle1">Ожидаемая заработная плата</div>
                        <div class="search__card-salary1">${element.salary} $</div>
                        <div class="search__card-subtitle1">Требования</div>
                        <ul class="search__card-subcontainer">
                        <li class="search__card-list">
                        <span class="search__card-vacspan"> ${element.requirement}</span>
                        </li>
                        <li class="search__card-list">
                        <span class="search__card-vacspan"> ${element.requirement2}</span>
                        </li>
                        <li class="search__card-list">
                        <span class="search__card-vacspan"> ${element.requirement3}</span>
                        </li>
                        <li class="search__card-list">
                        <span class="search__card-vacspan"> ${element.requirement4}</span>
                        </li>
                        </ul>
                        <div class="search__card-subtitle1">Местоположение и тип занятости</div>
                        <ul class="search__card-subcontainer">
                        <li class="search__card-list">
                        <span class="search__card-vacspan"> ${element.city}</span>
                        </li>
                        <li class="search__card-list">
                        <span class="search__card-vacspan"> ${element.jobFormat1}</span>
                        </li>
                        <li class="search__card-list">
                        <span class="search__card-vacspan"> ${element.jobFormat2}</span>
                        </li>
                        </ul>
                    </div>
                </div>
                <div class="search__card">
                    <div>
                    <div class="search__card-descriptvaca">Описание вакансии</div>
                        <div class="search__card-descriptvacasubtitle">Мы ожидаем, что Вы:</div>
                        <ul  class="search__card-subcontainer2">
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.expectation1}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.expectation2}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.expectation3}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.expectation4}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.expectation5}</span>
                        </li>
                        </ul>
                        <div class="search__card-descriptvacasubtitle">Вам предстоит:</div>
                        <ul  class="search__card-subcontainer2">
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.work1}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.work2}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.work3}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.work4}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.work5}</span>
                        </li>
                        </ul>
                        <div class="search__card-descriptvacasubtitle">Работа у нас — это:</div>
                        <ul  class="search__card-subcontainer2">
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.advantages1}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.advantages2}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.advantages3}</span>
                        </li>
                        <li class="search__card-list2">
                        <span class="search__card-vacspan2"> ${element.advantages4}</span>
                        </li>
                        </ul>
                    </div>
                </div>`;
                catalog2.innerHTML += `<div class="search__card2">
                    <div>
                    <image src="${element.logo}" class="search__card-logocomp" alt="photo" />
                    <div class="search__card-companydis">${element.company}</div>
                        <div class="search__card-aboutcomp">${element.about} </div>
                        <a href="${element.href}" class="search__card-hrefcopm">${element.href2}</a>
                    </div>`;
}



document.addEventListener("DOMContentLoaded", async function () {
    let url = "./desc_vacancy.json";
    let response = await fetch(url);
    cards = await response.json();
        for (card of cards) {
            descard(card);
        }
});