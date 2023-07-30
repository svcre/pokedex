// parallax 
let title = document.querySelector(".logo");
let raikou = document.querySelector(".raikou");
let rayquaza = document.querySelector(".rayquaza");
let lugia = document.querySelector(".lugia");
let star = document.querySelector(".star");

window.addEventListener('scroll', function() {
    let value = window.scrollY;

    title.style.marginTop = value * -0.5 + 'px';

    raikou.style.marginBottom = value * -0.15 + 'px';
    raikou.style.marginLeft = value * -0.25 + 'px';

    rayquaza.style.marginBottom = value * 0.75 + 'px';
    rayquaza.style.left = value * 0.15 + 'px';

    lugia.style.marginBottom = value * -0.65 + 'px';
    lugia.style.marginRight = value * -0.52 + 'px';

    star.style.marginBottom = value * -0.5 + 'px';
    star.style.marginRight = value * 2.5 + 'px';
})

// sticky infobox
window.addEventListener("scroll", (event) => {
    let scroll = window.scrollY;
    const element = document.querySelector(".right")

    if (scroll >= 897) {
        element.style.position = "sticky";
        element.style.top = "20px";
    }