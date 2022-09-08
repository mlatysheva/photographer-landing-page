import i18Obj from './translate.js';
let lang = '';
let theme = '';
if (localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang');
} else lang = 'en';

if (localStorage.getItem('theme')) {
  theme = localStorage.getItem('theme');
} else theme = 'dark';

setLocalStorage();
changeThemOnLoad(theme);
getTranslate(lang);

function toggleHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.querySelector(".body");

  hamburger.addEventListener("click", smallscreenMenu);

  function smallscreenMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.classList.toggle("opaque");
  }

  navMenu.addEventListener('click', closeMenu);


  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    body.classList.toggle("opaque");
  }
}

toggleHamburgerMenu();

function changePhotos() {
  const portfolioBtns = document.querySelector('.buttons-wrapper');
  portfolioBtns.addEventListener('click', changeImage);

  function changeImage(event) {
    if(event.target.classList.contains('season-button')) {
      changeClassActive('season-button', event.target);
      const season = event.target.dataset.season;
      const portfolioImages = document.querySelectorAll('.photo-image');
      portfolioImages.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
    }
  }
}

changePhotos();

function preloadImages() {
  const seasons = ['winter', 'spring', 'summer', 'autumn'];
  seasons.forEach ((season) => {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i}.jpg`;
    }
  })  
}
preloadImages();


function changeClassActive(className, target) {
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach((element) => {
    element.classList.remove('active');
    if (element === target) {
      element.classList.add('active');
    }
  })
}

function getTranslate(lang) {
  const fields = document.querySelectorAll('[data-i18]');
  fields.forEach((field) => {
    const key = field.dataset.i18;
    const languageObj = i18Obj[lang];
    field.innerHTML = languageObj[key];
    if (field.placeholder) {
      field.placeholder = languageObj[field.dataset.i18];
      field.textContent = '';
    }
  })
}

function translate() {
  const languageBtns = document.querySelectorAll('.lang');
  languageBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      lang = btn.innerText;
      // if (lang === 'Eng') {
      //   lang = 'en';
      // } else lang = 'ru';
      getTranslate(lang);
      changeClassActive('lang', btn);
      localStorage.setItem('lang', lang);
    })
  })
}

translate();

function changeThemOnLoad(theme) {
  const elements = document.querySelectorAll('.theme-body, .theme-section, .theme-section-title, .theme-section-title-span');
  const themeBtn = document.getElementById("theme-switch");
  const textElements = document.querySelectorAll('.theme-text');
  const seasonBtns = document.querySelectorAll('.season-button');

  if (theme === 'light') {
    themeBtn.classList.remove('active');
    elements.forEach(element => {
      element.classList.add('light-theme');
    })
    textElements.forEach(element => {
      element.classList.add('light-theme-white-text');
    })
    seasonBtns.forEach(element => {
      element.classList.add('light-theme-black-text');
    })
  }
}

function changeTheme() {
  const elements = document.querySelectorAll('.theme-body, .theme-section, .theme-section-title, .theme-section-title-span');
  const seasonBtns = document.querySelectorAll('.season-button');
  
  elements.forEach(element => {
    element.classList.toggle('light-theme');
  })
  const textElements = document.querySelectorAll('.theme-text');
  textElements.forEach(element => {
    element.classList.toggle('light-theme-white-text');
  })
  seasonBtns.forEach(element => {
    element.classList.toggle('light-theme-black-text');
  })
}

function changeThemeOnClick() {
  const themeBtn = document.getElementById("theme-switch");
  themeBtn.addEventListener('click', () => {
    if (themeBtn.classList.contains('active')) {
      themeBtn.classList.remove('active');
      theme = 'light';
    } else {
      themeBtn.classList.add('active');
      theme = 'dark';
    }
    localStorage.setItem('theme', theme);
    changeTheme();
  })  
}

changeThemeOnClick();

function setLocalStorage() {
  localStorage.setItem('lang', lang);
  localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  }
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
}
window.addEventListener('load', getLocalStorage);
