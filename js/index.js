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

