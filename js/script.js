'esversion: 6'
window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item');
          tabsContent = document.querySelectorAll('.tabcontent');
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
            
        }); 
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }  
    
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer 

    const deadline = '2023-02-1';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000* 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60); 
        return {
            'total': t,
            'days' : days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };      
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
    updateClock();     

    function updateClock() {
        const t = getTimeRemaining(endtime);
              days.innerHTML = getZero(t.days);
              hours.innerHTML = getZero(t.hours);
              minutes.innerHTML = getZero(t.minutes);
              seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }

    }          
    }

    setClock('.timer', deadline);


    // Modal window
    /* сначала приписываем data-modal для кнопок через которые у нас будут открываться модальные окна и data-close для крестика который будет собтсвенно закрывать наше модальное окно */

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {  
        openModal();
        modalCloseBtn.addEventListener('click', (CloseModal));
        });
    });

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';   /* не прокручивает страницу при открытом модальном окне  */ 
        // clearInterval(modalTimerId);
    }
        // Функция модального окна если мы кликаем по любой другой области
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            CloseModal();
        }
    });
        // Функция для оптимизации кода (Если много повтоярется одного и того же - выносим отдельно)
    function CloseModal() {
        modal.classList.add('hide');
        modal.classList.remove('show'); 
        document.body.style.overflow = '';
    }
    // Функция для закрытия модального окна по клавие Esc 
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            CloseModal();
        }
    });

    // СЛАЙДЕР 

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // // примени стили в css, я туда их записал !!! /scss/style.scss
    // slidesField.style.width = 100 * slides.length + '%';
    // // ставим d:flex для того,чтобы картинки выстроились в одну строку, для перемотки
    // slidesField.style.display = 'flex';
    // slidesField.transition = '0.5s all'
    // slidesWrapper.style.overflow = 'hidden';
    // // перебор для удостоверения,что все слайдеры одной ширины
    
    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { /* возврат в начало когда сладер упёрся */
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0) { /* возврат в начало когда сладер упёрся */
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });


    
    // Возвращает слайдер в начальное положение, если слайды закончились)
    
//     showSlides(slideIndex);
// // Добавляет нули и кол-во слайдера на данный момент из всех
//  if (slides.length < 10) {
//         total.textContent = `0${slides.length}`;
//     } else {
//         total.textContent = slides.length;
//     }   
    
//     function showSlides(n) {
//         if (n > slides.length) {
//             slideIndex = 1;
//         }

//         if (n < 1) {
//             slideIndex = slides.length;
//         }

//         slides.forEach(item => item.style.display = 'none');

//         slides[slideIndex - 1].style.display = 'block';
// //      счётчик слайдера
//         if (slides.length < 10) {
//             current.textContent = `0${slideIndex}`;
//         } else {
//             current.textContent = slideIndex;
//         } 
//     }

//     function plusSlides(n) {
//         showSlides(slideIndex += n);
//     }

//     prev.addEventListener('click', () => {
//         plusSlides(-1);
//     });

//     next.addEventListener('click', () => {
//         plusSlides(1);
//     });

    



















    // Вызов модального окна после определенного времени
    // const modalTimerId = setTimeout(openModal, 1000);


    // показ меню при прокрутке вниз до конца
    // window.addEventListener('scroll', () => {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         openModal(); 
    //     }
    // });
    

    // // Используем классы для карточек menu__item 
    // class MenuCard {
    //     constructor(src, alt, tittle, descr, price, parentSelector) {
    //          this.src = src;
    //          this.alt = alt;
    //          this.tittle = tittle;
    //          this.descr = descr;
    //          this.price = price;
    //          this.parent = document.querySelector(parentSelector);
    //          this.transfer = 27;
    //          this.changeToUAH();
    //     }
    //     // конвертация цены в другую валюту
    //     changeToUAH() {
    //         this.price = this.price * this.transfer;
    //     }

    //     render() {
    //         const element = document.createElement('div');
    //         element.innerHTML = `<div class="menu__item">
    //         <img src=${this.src} alt=${this.alt}>
    //         <h3 class="menu__item-subtitle">${this.tittle}"</h3>
    //         <div class="menu__item-descr">${this.descr} - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    //         </div>
    //     </div>`;
        
    // }

    // }

          
});
