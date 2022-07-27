const { async } = require("regenerator-runtime");
const input = document.querySelector('.form-control');
function click(){
    keyWord();
    getResultArr()
}
let btn = document.querySelector('.header__btnvaca'), keyword;
btn.addEventListener('click', (e)=>{
    e.preventDefault();
    click()} );
input.addEventListener('keydown', (e)=>{
    if (e.keyCode === 13){
    e.preventDefault();
    click();}
  });

 function keyWord() {
    let key = input.value;
    keyword = key.toLowerCase();
    console.log(keyword);
    input.value = "";
    return keyword}

    async function fetchToDo () {
    const responce = await fetch('https://raw.githubusercontent.com/nas-tay/WorkIT-project/dasha-new/js/vac.json')
    try {
      data = await responce.json()
    return data
    } catch (error) {
      console.log(error)
    }}

    async function getResultArr(){
        document.querySelector('.search-container').innerHTML="";
        const data = await fetchToDo()
        let resultArr = [];
        data.forEach((el) => {
            if(el.keyWords.includes(keyword.toLowerCase())){
        resultArr.push(el)};
        });
        console.log(resultArr);
        resultArr.forEach(el => new Card(el.exp, el.level, el.title, el.url).newCard())
     }

   

            class Card{
                constructor(exp, level, title, photo){
                    this.exp = exp,
                    this.level=level,
                    this.title=title,
                    this.photo=photo;
                }
            newCard(){
                document.querySelector('.search-container').innerHTML+=`<div class='search__card'><div><h5 class='search__card-title card-title'>Должность <span class='card-title'>Уровень ${this.level}</span></h5>
                    <div class='search__card-subtitle'>Опыт работы</div>
                    <div class='search__card-experience'>${this.exp}</div>
                    <div class='search__card-subtitle'>${this.title}</div>
                    <div class='search__card-salary'>2000$</div>
                </div>
                <image src=${this.photo}
                    class='search__card-photo' alt='photo' />
            </div>`
            }
            }