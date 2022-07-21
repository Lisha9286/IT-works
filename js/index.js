
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
    getvaca();
});

function getvaca() {
    fetch('./data.json')
        .then(response => response.json())
        .then(vacas => {
            let vacaCards = '';
            for (let vaca of vacas) {
                heroesCards += `
                <div class="card">
                    <img class="card__img" src="${vaca.albumId}" alt="image">
                    <div class="card__content">
                        <p class="card__text">albumId: ${vaca.albumId}</p>
                        <p class="card__text">title: ${vaca.albumId}</p>
                    </div>
                </div>
                    `

            }
            container.innerHTML = vacaCards;

        })
        .catch(error => console.log(error));
}