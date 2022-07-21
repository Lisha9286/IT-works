
const btn1=document.querySelector ('.filter-vacancy__filter-title')
const btn2=document.querySelector ('.filter-vacancy__filter-sectitle')


btn1.onclick = function()  {
    document.querySelector(".filter-vacancy__typies").setAttribute("style", "display: block; opacity:1; transition: 1s; height: 100%;");
    document.querySelector(".filter-vacancy__filter-title").setAttribute("style", "display: none");
    document.querySelector(".filter-vacancy__filter-sectitle").setAttribute("style", "display: block");
}

btn2.onclick = function()  {
    document.querySelector(".filter-vacancy__typies").setAttribute("style", "display: none");
    document.querySelector(".filter-vacancy__filter-sectitle").setAttribute("style", "display: none");
    document.querySelector(".filter-vacancy__filter-title").setAttribute("style", "display: block"); 
}

const container = document.querySelector('.search-container');

document.addEventListener("DOMContentLoaded", function (e) {
    getSuperheroes();
});

function getSuperheroes() {
    fetch('./data.json')
        .then(response => response.json())
        .then(heroes => {
            let heroesCards = '';
            for (let hero of heroes) {
                heroesCards += `
                <div class="card">
                    <img class="card__img" src="${hero.albumId}" alt="image">
                    <div class="card__content">
                        <p class="card__text">albumId: ${hero.albumId}</p>
                        <p class="card__text">title: ${hero.albumId}</p>
                    </div>
                </div>
                    `

            }
            container.innerHTML = heroesCards;

        })
        .catch(error => console.log(error));
}