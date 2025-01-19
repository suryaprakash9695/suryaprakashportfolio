
let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
const span = document.querySelector('#intro')
// intro animation section --------------------
// const span = document.querySelector('span');
const wordsList = ["Surya Prakash \nSingh",'Developer', 'Coder', 'Explorer'];
// const word = 'Surya Prakash Singh';
// span.innerText=wordsList[0];
// var count = 0;
let wordIndex = 0;
let characterIndex = 0;
let skipUpdate = 0;
let reverseType = false;
// let wordCount=word.length;
setInterval(() => {
    if (skipUpdate) {
        skipUpdate--
        return;
    }
    if (!reverseType) {
        skipUpdate = 1;
        if(wordsList[wordIndex][characterIndex]==' '){
        span.innerText +=' ';
        characterIndex++;
        }else{
            span.innerText += wordsList[wordIndex][characterIndex];
        characterIndex++;
        }
        
    } else {
        span.innerText = span.innerText.slice(0, span.innerText.length - 1);
        characterIndex--
    }

    if (span.innerText.length === 0 && reverseType) {
        reverseType = false;
        characterIndex = 0;
        if (wordIndex == wordsList.length - 1) {
            wordIndex = 0;
        } else {
            wordIndex++;
        }
    }

    if (characterIndex === wordsList[wordIndex].length) {
        reverseType = true;
        skipUpdate = 30;
        characterIndex--;
    }




}, 100);


// -----------------------------------------



window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

menu.onclick = () => {
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    navbar.classList.remove('active');
}

// Dark Mode
let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if (darkmode.classList.contains('bx-moon')) {
        darkmode.classList.replace('bx-moon', 'bx-sun');
        document.body.classList.add('active');
    } else {
        darkmode.classList.replace('bx-sun', 'bx-moon');
        document.body.classList.remove('active');
    }
}
