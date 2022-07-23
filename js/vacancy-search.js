let btn = document.querySelector('.header-search__btn');
btn.addEventListener('click', (e)=>{
    e.preventDefault();
    keyWord();
})
fu

 function keyWord() {
    let input = document.querySelector('.header-search__form').value;
    let keyword = input.toLowerCase();
    console.log(keyword);
    const json = `./data.json`;  
    let data = JSON.parse(json);
    let resultArr = data.filter(el => el.title === keyword);
     console.log(resultArr);
}