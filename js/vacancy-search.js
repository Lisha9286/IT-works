const { async } = require("regenerator-runtime");

let btn = document.querySelector('.header-search__btn'), keyword;
btn.addEventListener('click', (e)=>{
    e.preventDefault();
    keyWord();
    getResultArr()
})


 function keyWord() {
    let input = document.querySelector('.header-search__form').value,
    list = document.querySelector('.search-container');
    list.innerHTML="";
    input.value = "";
    keyword = input.toLowerCase();
    console.log(keyword);
return keyword}

    async function fetchToDo () {
    const responce = await fetch('https://raw.githubusercontent.com/nas-tay/WorkIT-project/main/js/data.json')
    try {
      data = await responce.json()
    return data
    } catch (error) {
      console.log(error)
    }}

    async function getResultArr(){
        const data = await fetchToDo()
        let resultArr = [];
        data.forEach((el) => {
            if(el.title.includes(keyword)){
        resultArr.push(el)};
        });
        
     console.log(resultArr);
     }

