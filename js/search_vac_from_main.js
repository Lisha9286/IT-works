document.querySelector(".btn__search-appmain").addEventListener("click", () => {
    localStorage.setItem("searchRequest", document.querySelector("#searchRequest").value);
    document.querySelector("#searchRequest").value = "";
    document.location.href = "./views/search_vacancies.html";
});

document.querySelector("#searchRequest").addEventListener("keyup", (event) => {
    localStorage.setItem("searchRequest", document.querySelector("#searchRequest").value);
    if (event.key == "Enter") {
        document.querySelector("#searchRequest").value = "";
        document.location.href = "./views/search_vacancies.html";
    }
});

document.querySelectorAll(".popular__titles").forEach((item) => {
    item.addEventListener("click", (e) => {
        if (e.target) {
            localStorage.setItem("searchRequest", item.innerText);
            document.location.href = "./views/search_vacancies.html";
        }
    });
});
