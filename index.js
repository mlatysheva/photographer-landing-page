// import i18Obj from './translate.js';
const i18Obj = {
  'Eng': {
    'skills': 'Skills',
    'portfolio': 'Portfolio',
    'video': 'Video',
    'price': 'Price',
    'contacts': 'Contacts',
    'hero-title': 'Alexa Rise',
    'hero-text': 'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
    'hire': 'Hire me',
    'skill-title-1': 'Digital photography',
    'skill-text-1': 'High-quality photos in the studio and on the nature',
    'skill-title-2': 'Video shooting',
    'skill-text-2': 'Capture your moments so that they always stay with you',
    'skill-title-3': 'Rotouch',
    'skill-text-3': 'I strive to make photography surpass reality',
    'skill-title-4': 'Audio',
    'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
    'winter': 'Winter',
    'spring': 'Spring',
    'summer': 'Summer',
    'autumn': 'Autumn',
    'price-description-1-span-1': 'One location',
    'price-description-1-span-2': '120 photos in color',
    'price-description-1-span-3': '12 photos in retouch',
    'price-description-1-span-4': 'Readiness 2-3 weeks',
    'price-description-1-span-5': 'Make up, visage',
    'price-description-2-span-1': 'One or two locations',
    'price-description-2-span-2': '200 photos in color',
    'price-description-2-span-3': '20 photos in retouch',
    'price-description-2-span-4': 'Readiness 1-2 weeks',
    'price-description-2-span-5': 'Make up, visage',
    'price-description-3-span-1': 'Three locations or more',
    'price-description-3-span-2': '300 photos in color',
    'price-description-3-span-3': '50 photos in retouch',
    'price-description-3-span-4': 'Readiness 1 week',
    'price-description-3-span-5': 'Make up, visage, hairstyle',
    'order': 'Order shooting',
    'contact-me': 'Contact me',
    'send-message': 'Send message',
    'message-text': 'Message',
    'phone': 'Phone'
  },
  'Rus': {
    'skills': 'Навыки',
    'portfolio': 'Портфолио',
    'video': 'Видео',
    'price': 'Цены',
    'contacts': 'Контакты',
    'hero-title': 'Алекса Райс',
    'hero-text': 'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
    'hire': 'Пригласить',
    'skill-title-1': 'Фотография',
    'skill-text-1': 'Высококачественные фото в студии и на природе',
    'skill-title-2': 'Видеосъемка',
    'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
    'skill-title-3': 'Ретушь',
    'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
    'skill-title-4': 'Звук',
    'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
    'winter': 'Зима',
    'spring': 'Весна',
    'summer': 'Лето',
    'autumn': 'Осень',
    'price-description-1-span-1': 'Одна локация',
    'price-description-1-span-2': '120 цветных фото',
    'price-description-1-span-3': '12 отретушированных фото',
    'price-description-1-span-4': 'Готовность через 2-3 недели',
    'price-description-1-span-5': 'Макияж, визаж',
    'price-description-2-span-1': 'Одна-две локации',
    'price-description-2-span-2': '200 цветных фото',
    'price-description-2-span-3': '20 отретушированных фото',
    'price-description-2-span-4': 'Готовность через 1-2 недели',
    'price-description-2-span-5': 'Макияж, визаж',
    'price-description-3-span-1': 'Три локации и больше',
    'price-description-3-span-2': '300 цветных фото',
    'price-description-3-span-3': '50 отретушированных фото',
    'price-description-3-span-4': 'Готовность через 1 неделю',
    'price-description-3-span-5': 'Макияж, визаж, прическа',
    'order': 'Заказать съемку',
    'contact-me': 'Свяжитесь со мной',
    'send-message': 'Отправить',
    'message-text': 'Сообщение',
    'phone': 'Телефон'
  }
}

let lang = '';
let theme = '';

if (localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang');
} else lang = 'Eng';

if (localStorage.getItem('theme')) {
  theme = localStorage.getItem('theme');
} else theme = 'dark';
console.log(`skills is : ${i18Obj.Rus.skills}`);

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
      console.log(`lang: ${lang}`);
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
