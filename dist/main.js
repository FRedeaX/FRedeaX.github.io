(function () {
	ymaps.ready(init);
	function init() {
		let myMap = new ymaps.Map('map', {
			center: [55.7486, 37.5986],
			zoom: 14
		});

		const points = [
			{
				x: 55.7572,
				y: 37.6158,
				address: 'ул. Охотный ряд'
			},
			{
				x: 55.7450,
				y: 37.6008,
				address: 'Гоголевский бульвар'
			}
		]

		points.forEach(point => {
			myPlacemark = new ymaps.Placemark([point.x, point.y], {
				balloonContent: point.address
			}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/map/choccoPoint.png',
				hideIconOnBalloonOpen: false,
				iconImageOffset: [-17, -40]
			}),

				myMap.geoObjects.add(myPlacemark);
		});
	}
})();(function() {    
  const menuToggle = document.querySelector('.menu-accordion__list'),
        menuItemAll = document.querySelectorAll('.menu-accordion__item'),
        menuToggleActive = 'menu-accordion__item--active',
        menuButton = 'menu-accordion__btn',
        menuButtonSpan = 'menu-accordion__title',
        menuCloseButton = 'menu-accordion__close-btn';
  
  let lastMenuActive = null, // текущая открытая секция (li)
      menuActive = false, // setTimeout при открытии второй секции (li)
      defultContentWidth = 520, // ширина контента по умолчанию
      breakPointPhone = 480,
      menuWidth = document.querySelector('.menu').clientWidth, // ширина блока меню
      menuToggleWidth = menuItemAll[0].clientWidth, // ширина одной li
      menuAllToggleWidth = menuToggleWidth * menuItemAll.length, // ширина всех li
      menuOpenWidth = defultContentWidth + menuAllToggleWidth; // ширина открытой секции + всех li
  
  menuToggle.addEventListener('click', (event)=>{
    const target = event.target,
    menuItem = (target.classList.contains('menu-accordion__btn')) ? target.parentNode : target.parentNode.parentNode, // родитель (li)
    menuContent = menuItem.querySelector('.menu-accordion__content'); // div с контентом
    
    // клик по кнопке или спану
    if (target.classList.contains(menuButton) || target.classList.contains(menuButtonSpan)) {
      // если true, то нажатие произошло по активной секции
      if (menuItem.classList.contains(menuToggleActive)) {
        removeToggle(menuItem);
        menuActive = !menuActive;
        
      } else {
        // если true, то есть открытый элемент
        if (lastMenuActive) {
          removeToggle(lastMenuActive);
        }
        // если true, то размер экрана меньше чем размер открытого меню и больше чем брекпоинт
        if (menuWidth < menuOpenWidth && menuWidth > breakPointPhone) {        
          menuContent.style.width = menuWidth - menuAllToggleWidth + 'px';
        } else if (menuWidth <= breakPointPhone) { // если true, то контент во всю ширину родителя
          menuToggleWidth = menuItemAll[0].querySelector('.menu-accordion__img').clientWidth; 
          for (let i = 0; i < menuItemAll.length; i++) {
            if (menuItemAll[i] === menuItem) { // нажатая(активная) li
              menuItemAll[i].querySelector('.menu-accordion__content').style.width = menuWidth + 'px';
            } else {
              menuItemAll[i].querySelector('.menu-accordion__title').style.opacity = 0;
              menuItemAll[i].querySelector('.menu-accordion__img').style.width = 0;
            }
          }
        }
        // если true, то есть открытый элемент. Новое открываем после закрытия предыдущего
        if (menuActive){
          setTimeout(() => {
            menuItem.classList.add(menuToggleActive);
          }, 250);
        } else {
          menuItem.classList.add(menuToggleActive)
          menuActive = !menuActive;
        }
        lastMenuActive = menuItem;
        
      }  
      // клик по крестику в контенте
    } else if(target.classList.contains(menuCloseButton)){
      removeToggle(target.parentNode.parentNode);
      menuActive = !menuActive;
    }
  });
  
  function removeToggle(li) {
    li.classList.remove(menuToggleActive); // (li)
    li.querySelector('.menu-accordion__content').style.width = null; // div с контентом
    lastMenuActive = null;    
    if (menuWidth <= breakPointPhone) {
      for (let i = 0; i < menuItemAll.length; i++) {
        setTimeout(() => {
          menuItemAll[i].querySelector('.menu-accordion__title').style.opacity = 1;
          menuItemAll[i].querySelector('.menu-accordion__img').style.width = menuToggleWidth + 'px';        
        }, 300);
      }      
    }
  }
  
  window.addEventListener('resize', ()=>{
    menuWidth = document.querySelector('.menu').clientWidth, // ширина блока меню
    menuAllToggleWidth = menuItemAll[0].clientWidth * menuItemAll.length, // ширина всех li
    menuOpenWidth = defultContentWidth + menuAllToggleWidth; // ширина открытой секции + всех li
  });
})()

;(function() {
const headerNav = document.querySelector('.header__nav'),
      nav = document.querySelector('.nav'),
      navLink = 'a.nav__link'
      navActive = 'nav--active',
      btnHamburger = document.querySelector('.header__hamburger'),
      btnHamburgerMatches = 'button.header__hamburger',
      btnHamburgerClose = 'btn-hamburger--close',
      noScroll = 'no-scroll';

headerNav.addEventListener('click', (e)=>{
  if (event.target.matches(btnHamburgerMatches)) navToggle();
  else if (nav.classList.contains(navActive) && event.target.matches(navLink)) navToggle();
});

function navToggle() {
  nav.classList.toggle(navActive);
  btnHamburger.classList.toggle(btnHamburgerClose);
  document.body.classList.toggle(noScroll);
}

})();(function () {
  const sectionCount = (document.querySelectorAll('.section').length - 1) * -1, // используется для определения конца страницы. -1 потому что на первой странице transform не применяется. умножаем на -1(получаем отрицательное значение), что бы в дальнейшем сравнивать количество секций с номером текущей секции
        paginationList = document.querySelector('.pagination__list'),
        navList = document.querySelector('.nav__list'),
        orderButtons = document.querySelectorAll('.scroll-order'), // кнопки заказать в секции promo и product
        paginationAll = document.querySelectorAll('.pagination__item'),
        paginationActive = 'pagination__item--active';
  let currentActive = 0, // номер текущей секции
      touch = [], // запоминаем 2 значение clientY при событии touch для определения направления сколла
      lastActive = 0, // последняя активная секция (используется для того, что бы убрать активный класс с пагинации)
      isScroll = false;
       

  function moveScroll(direction) {
    if(isScroll) return
   
    if (direction === 'down') {
      currentActive--;
      scroll();
    } else {
      currentActive++;
      scroll();
    }
  }
  
  function scroll() {
    //проверяем нужно ли выполнять скролл
    if(currentActive < sectionCount) return currentActive = sectionCount; // конец страницы
    if(currentActive > 0) return currentActive = 0; // начало страницы

    const main = document.querySelector('.main');
    main.style.transform = `translateY(${currentActive * 100}%)`;
    
    isScroll = !isScroll;
    setTimeout(() => {
      paginationAll[lastActive].classList.toggle(paginationActive); // удаляем класс
      lastActive = currentActive * -1;                              // обновляем значение
      paginationAll[lastActive].classList.toggle(paginationActive); // добавляем класс

      isScroll = !isScroll;
      touch = [];
    }, 650);
  }

  document.addEventListener('wheel', (event) =>{
    const delta = event.deltaY,
          scroll = (delta > 0) ? 'down' : 'up';
    if (event.path[0].matches('ymaps')) return
    moveScroll(scroll);    
  });
  paginationList.addEventListener('click', (event) => {
    event.preventDefault()
    const target = event.target;
    if (target.classList.contains('pagination__link')) {
      currentActive = -target.dataset.scroll;
      scroll();      
    }
  });
  navList.addEventListener('click', (event) => {
    event.preventDefault()
    const target = event.target;
    if (target.classList.contains('nav__link')) {
      currentActive = -target.dataset.scroll;
      scroll();      
    }
  });
  orderButtons.forEach(orderButton => {
    orderButton.addEventListener('click', () => {
      currentActive = -orderButton.dataset.scroll;
      scroll();
    })
  });
  document.addEventListener('keydown', (event) => {
    const tagName = event.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === 'input' || tagName === 'textarea';

    if (userTypingInInputs) return
    
    if (event.keyCode === 40) {
      moveScroll('down');
    } else if (event.keyCode === 38) {
      moveScroll('up');
    }
  })
  document.addEventListener("touchmove", (event) =>{
    const deltaY = event.changedTouches[0].clientY; 
    touch.push(deltaY);
    if (touch.length === 2) {
      const scroll = (touch[0] > touch[1]) ? 'down' : 'up';
      moveScroll(scroll);
      return
    }
  });
  
})();(function() {
    
  const orderForm = document.querySelector('.order-form'),
        orderButton = document.querySelector('.order-form__submit');

  orderButton.addEventListener('click', (event)=>{
    event.preventDefault()

    if (validateForm(orderForm)) {
      const data = {
        name: orderForm.elements.name.value,
        phone: orderForm.elements.phone.value,
        // street: orderForm.elements.street.value,
        // house: orderForm.elements.house.value,
        // body: orderForm.elements.body.value,
        // flat: orderForm.elements.flat.value,
        // floor: orderForm.elements.floor.value,
        comment: orderForm.elements.comment.value,
        email: 'email@test'
      };
      let formData = new FormData();
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('comment', data.comment);
      formData.append('email', data.email);
      
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
      xhr.send(formData);
      xhr.addEventListener('load', ()=> {
        if (xhr.response.status) {
          document.body.appendChild(createModal(xhr.response.message));
        } else {
          document.body.appendChild(createModal(xhr.response.message));
        }
        
      })
    };
  });

  function validateForm(form) {
    let valid = true;

    if (!form.elements.name.checkValidity()) valid = !valid;
    if (!form.elements.phone.checkValidity()) valid = !valid;
    if (!form.elements.street.checkValidity()) valid = !valid;
    if (!form.elements.house.checkValidity()) valid = !valid;
    if (!form.elements.body.checkValidity()) valid = !valid;
    if (!form.elements.flat.checkValidity()) valid = !valid;
    if (!form.elements.floor.checkValidity()) valid = !valid;
    if (!form.elements.comment.checkValidity()) valid = !valid;

    return valid
  };

  function createModal(content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const container = document.createElement('div');
    container.classList.add('modal__container');
    modal.appendChild(container);

    const title = document.createElement('div'),
          button = document.createElement('button');
    title.classList.add('modal__title');
    title.innerText = content;
    button.classList.add('modal__button');
    button.classList.add('btn');
    button.classList.add('btn--color--green');
    button.type = 'button';
    button.innerText = 'Закрыть';
    container.appendChild(title);
    container.appendChild(button);

    modal.addEventListener('click', (event)=>{
      const target = event.target;
      if (!(target === container || target === title)) {
        modal.remove();
      }
      // if (e.keyCode === 27) {
      //   modal.remove();
      // }
    })

    return modal
  };

})()
;(function() {    
  const productContainer = document.querySelector('.product__container'),
        productItemAll = document.querySelectorAll('.product__item'),
        btnPrevious = 'button.product__previous',
        btnNext = 'button.product__next',
        productIitemActive = 'product__item--active';
  let iActive = 0;

  productContainer.addEventListener('click', (e)=>{
    // предыдущий слайд
    if(event.target.matches(btnPrevious)){
      if (productItemAll[iActive - 1]) {
        productToggle(iActive - 1);
      } else {
        productToggle(productItemAll.length - 1);
      }
    // следующий слайд  
    } else if(event.target.matches(btnNext)){
      if (productItemAll[iActive + 1]) {
        productToggle(iActive + 1);
      } else {
        productToggle(0);
      }
    }  
  })

  function productToggle(iNext) {
    productItemAll[iActive].classList.toggle(productIitemActive);
    iActive = iNext;
    productItemAll[iActive].classList.toggle(productIitemActive);
  }
})();(function() {
  const reviewsWraper = document.querySelector('.reviews__wraper'),
        feedbackAll = document.querySelectorAll('.feedback'),

        reviewsList = document.querySelector('.reviews__list'),
        reviewsAll = reviewsList.querySelectorAll('.reviews__item'),
        reviewsActive = 'reviews__item--active',        

        reviewsButton = 'reviews__button';

  let lastActive = 0,
      reviewsContent = document.querySelector('.reviews__content').clientWidth;

  reviewsWraper.style.width = reviewsContent * feedbackAll.length + 'px';

  reviewsList.addEventListener('click', (event)=>{
    const target = event.target.parentNode; // button
    
    if (target.classList.contains(reviewsButton)) {
      reviewsToggle(target.getAttribute('data-id') - 1);
    };
  });

  function reviewsToggle(nextActive) {
    reviewsAll[lastActive].classList.remove(reviewsActive);
    lastActive = nextActive; // новое значение
    reviewsAll[nextActive].classList.add(reviewsActive);
    
    reviewsWraper.style.transform = 'translateX(' + - reviewsContent * nextActive + 'px)';
  };
  
  window.addEventListener('resize', ()=>{
    reviewsContent = document.querySelector('.reviews__content').clientWidth,
    
    reviewsWraper.style.width = reviewsContent * feedbackAll.length + 'px';
    reviewsWraper.style.transform = 'translateX(' + - reviewsContent * lastActive + 'px)';
  });
    
})();(function() {
  const teamToggle = document.querySelector('.team__list')
        teamButton = 'a.team__name',
        teamToggleActive = 'team__item--active';
  let previousClick = null;

  teamToggle.addEventListener('click', (event)=>{  
    event.preventDefault();
    if(event.target.matches(teamButton)) {
      // если true, то нажатие произошло по активному элементу
      if (event.target.parentNode.parentNode.classList.contains(teamToggleActive)) {
        removeToggle(event.target)    
      } else {
        // если true, то убираем стили с предыдущего активного элемента
        if (previousClick) {
          removeToggle(previousClick)

          setTimeout(() => {  
            addToggle(event.target)     
          }, 290);
        }       
        else {
          addToggle(event.target);
        }
      }
    }
  })

  function removeToggle(element) {
    element.parentNode.parentNode.classList.toggle(teamToggleActive);  
    element.parentNode.previousElementSibling.style.height = null; 
    previousClick = null; 
  }
  function addToggle(element) {
    let imgHeight = element.parentNode.previousElementSibling.offsetHeight, 
        infoHeight = element.nextElementSibling.offsetHeight,
        newImgHeight = imgHeight - infoHeight;

    element.parentNode.parentNode.classList.toggle(teamToggleActive);        
    element.parentNode.previousElementSibling.style.height = newImgHeight + 'px';
    previousClick = element; 
  }
    
})();(function() {
  const progressControl = document.querySelector('.progress__value'),
        soundControl = document.querySelector('.sound__value');
  let video, intervalId, soundValue;
  document.addEventListener('DOMContentLoaded', () => {
    const videoWrapper = document.querySelector('.video__wrapper');
    
    video = document.querySelector('.video__player');

    progressControl.addEventListener('mousedown', ()=>{
      //обнуляем значения, что бы произвести вычисления
      progressControl.value = 0;
      progressControl.max = 100;
    })
    
    videoWrapper.addEventListener('click', (event) => {
      const target = event.target;
      // кнопки play
      if (target.classList.contains('video__player') ||
          target.classList.contains('play')) {
        playStop();        
      } 
      // input продолжительности видео
      else if (target.classList.contains('progress__value')){
        setProgressControl();
      }

      // кнопка громкости
      else if (target.classList.contains('sound__mute')) {
        soundMute();
      }
      // input громкости видео
      else if (target.classList.contains('sound__value')){
        setSoundControl()  
      }
    })

  });
  function playStop() {
    document.querySelector('.video__play').classList.toggle('video__play--disabled');
    document.querySelector('.progress__play').classList.toggle('progress__play--active');
    
    if (video.paused) {
      if (progressControl.max === '') // если видео запущено с начала 
        progressControl.max = video.duration;
    
      video.play();
      intervalId = setInterval(updateProgressControl, 1000);
    } else {
      video.pause();
      clearInterval(intervalId);
    }
  }
  function updateProgressControl() {
    progressControl.value = video.currentTime;
  } 
  function setProgressControl() {
    let progress = video.duration;
    progressControl.max = video.duration; 

    // input.max по умолчанию равен 100 поэтому после клика по нему мы имеем
    // n-% от 100%, теперь находим этот же % в нашем видео
    progressControl.value = progress * progressControl.value / 100;
    video.currentTime = progressControl.value;
    console.log(progressControl.value);
  }
  function soundMute() {
    if (video.volume === 0) {
      video.volume = soundValue;
      soundControl.value = soundValue * 10;      
    } else {
      soundValue = video.volume;
      video.volume = 0;
      soundControl.value = 0;
    }
  }
  function setSoundControl() {
    video.volume = soundControl.value / 10;
  }
})()
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC5qcyIsIm1lbnUuanMiLCJuYXYuanMiLCJvbmVQYWdlU2Nyb2xsLmpzIiwib3JkZXIuanMiLCJwcm9kdWN0LmpzIiwicmV2aWV3cy5qcyIsInRlYW0uanMiLCJ2aWRlby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0NyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcblx0eW1hcHMucmVhZHkoaW5pdCk7XHJcblx0ZnVuY3Rpb24gaW5pdCgpIHtcclxuXHRcdGxldCBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ21hcCcsIHtcclxuXHRcdFx0Y2VudGVyOiBbNTUuNzQ4NiwgMzcuNTk4Nl0sXHJcblx0XHRcdHpvb206IDE0XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBwb2ludHMgPSBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHR4OiA1NS43NTcyLFxyXG5cdFx0XHRcdHk6IDM3LjYxNTgsXHJcblx0XHRcdFx0YWRkcmVzczogJ9GD0LsuINCe0YXQvtGC0L3Ri9C5INGA0Y/QtCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHg6IDU1Ljc0NTAsXHJcblx0XHRcdFx0eTogMzcuNjAwOCxcclxuXHRcdFx0XHRhZGRyZXNzOiAn0JPQvtCz0L7Qu9C10LLRgdC60LjQuSDQsdGD0LvRjNCy0LDRgCdcclxuXHRcdFx0fVxyXG5cdFx0XVxyXG5cclxuXHRcdHBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcclxuXHRcdFx0bXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFtwb2ludC54LCBwb2ludC55XSwge1xyXG5cdFx0XHRcdGJhbGxvb25Db250ZW50OiBwb2ludC5hZGRyZXNzXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcblx0XHRcdFx0aWNvbkltYWdlSHJlZjogJ2ltZy9tYXAvY2hvY2NvUG9pbnQucG5nJyxcclxuXHRcdFx0XHRoaWRlSWNvbk9uQmFsbG9vbk9wZW46IGZhbHNlLFxyXG5cdFx0XHRcdGljb25JbWFnZU9mZnNldDogWy0xNywgLTQwXVxyXG5cdFx0XHR9KSxcclxuXHJcblx0XHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQbGFjZW1hcmspO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59KSgpIiwiKGZ1bmN0aW9uKCkgeyAgICBcclxuICBjb25zdCBtZW51VG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX19saXN0JyksXHJcbiAgICAgICAgbWVudUl0ZW1BbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1hY2NvcmRpb25fX2l0ZW0nKSxcclxuICAgICAgICBtZW51VG9nZ2xlQWN0aXZlID0gJ21lbnUtYWNjb3JkaW9uX19pdGVtLS1hY3RpdmUnLFxyXG4gICAgICAgIG1lbnVCdXR0b24gPSAnbWVudS1hY2NvcmRpb25fX2J0bicsXHJcbiAgICAgICAgbWVudUJ1dHRvblNwYW4gPSAnbWVudS1hY2NvcmRpb25fX3RpdGxlJyxcclxuICAgICAgICBtZW51Q2xvc2VCdXR0b24gPSAnbWVudS1hY2NvcmRpb25fX2Nsb3NlLWJ0bic7XHJcbiAgXHJcbiAgbGV0IGxhc3RNZW51QWN0aXZlID0gbnVsbCwgLy8g0YLQtdC60YPRidCw0Y8g0L7RgtC60YDRi9GC0LDRjyDRgdC10LrRhtC40Y8gKGxpKVxyXG4gICAgICBtZW51QWN0aXZlID0gZmFsc2UsIC8vIHNldFRpbWVvdXQg0L/RgNC4INC+0YLQutGA0YvRgtC40Lgg0LLRgtC+0YDQvtC5INGB0LXQutGG0LjQuCAobGkpXHJcbiAgICAgIGRlZnVsdENvbnRlbnRXaWR0aCA9IDUyMCwgLy8g0YjQuNGA0LjQvdCwINC60L7QvdGC0LXQvdGC0LAg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICAgICAgYnJlYWtQb2ludFBob25lID0gNDgwLFxyXG4gICAgICBtZW51V2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLmNsaWVudFdpZHRoLCAvLyDRiNC40YDQuNC90LAg0LHQu9C+0LrQsCDQvNC10L3RjlxyXG4gICAgICBtZW51VG9nZ2xlV2lkdGggPSBtZW51SXRlbUFsbFswXS5jbGllbnRXaWR0aCwgLy8g0YjQuNGA0LjQvdCwINC+0LTQvdC+0LkgbGlcclxuICAgICAgbWVudUFsbFRvZ2dsZVdpZHRoID0gbWVudVRvZ2dsZVdpZHRoICogbWVudUl0ZW1BbGwubGVuZ3RoLCAvLyDRiNC40YDQuNC90LAg0LLRgdC10YUgbGlcclxuICAgICAgbWVudU9wZW5XaWR0aCA9IGRlZnVsdENvbnRlbnRXaWR0aCArIG1lbnVBbGxUb2dnbGVXaWR0aDsgLy8g0YjQuNGA0LjQvdCwINC+0YLQutGA0YvRgtC+0Lkg0YHQtdC60YbQuNC4ICsg0LLRgdC10YUgbGlcclxuICBcclxuICBtZW51VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KT0+e1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LFxyXG4gICAgbWVudUl0ZW0gPSAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1hY2NvcmRpb25fX2J0bicpKSA/IHRhcmdldC5wYXJlbnROb2RlIDogdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSwgLy8g0YDQvtC00LjRgtC10LvRjCAobGkpXHJcbiAgICBtZW51Q29udGVudCA9IG1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fY29udGVudCcpOyAvLyBkaXYg0YEg0LrQvtC90YLQtdC90YLQvtC8XHJcbiAgICBcclxuICAgIC8vINC60LvQuNC6INC/0L4g0LrQvdC+0L/QutC1INC40LvQuCDRgdC/0LDQvdGDXHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhtZW51QnV0dG9uKSB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKG1lbnVCdXR0b25TcGFuKSkge1xyXG4gICAgICAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INC90LDQttCw0YLQuNC1INC/0YDQvtC40LfQvtGI0LvQviDQv9C+INCw0LrRgtC40LLQvdC+0Lkg0YHQtdC60YbQuNC4XHJcbiAgICAgIGlmIChtZW51SXRlbS5jbGFzc0xpc3QuY29udGFpbnMobWVudVRvZ2dsZUFjdGl2ZSkpIHtcclxuICAgICAgICByZW1vdmVUb2dnbGUobWVudUl0ZW0pO1xyXG4gICAgICAgIG1lbnVBY3RpdmUgPSAhbWVudUFjdGl2ZTtcclxuICAgICAgICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INC10YHRgtGMINC+0YLQutGA0YvRgtGL0Lkg0Y3Qu9C10LzQtdC90YJcclxuICAgICAgICBpZiAobGFzdE1lbnVBY3RpdmUpIHtcclxuICAgICAgICAgIHJlbW92ZVRvZ2dsZShsYXN0TWVudUFjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC10YHQu9C4IHRydWUsINGC0L4g0YDQsNC30LzQtdGAINGN0LrRgNCw0L3QsCDQvNC10L3RjNGI0LUg0YfQtdC8INGA0LDQt9C80LXRgCDQvtGC0LrRgNGL0YLQvtCz0L4g0LzQtdC90Y4g0Lgg0LHQvtC70YzRiNC1INGH0LXQvCDQsdGA0LXQutC/0L7QuNC90YJcclxuICAgICAgICBpZiAobWVudVdpZHRoIDwgbWVudU9wZW5XaWR0aCAmJiBtZW51V2lkdGggPiBicmVha1BvaW50UGhvbmUpIHsgICAgICAgIFxyXG4gICAgICAgICAgbWVudUNvbnRlbnQuc3R5bGUud2lkdGggPSBtZW51V2lkdGggLSBtZW51QWxsVG9nZ2xlV2lkdGggKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWVudVdpZHRoIDw9IGJyZWFrUG9pbnRQaG9uZSkgeyAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INC60L7QvdGC0LXQvdGCINCy0L4g0LLRgdGOINGI0LjRgNC40L3RgyDRgNC+0LTQuNGC0LXQu9GPXHJcbiAgICAgICAgICBtZW51VG9nZ2xlV2lkdGggPSBtZW51SXRlbUFsbFswXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2ltZycpLmNsaWVudFdpZHRoOyBcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVudUl0ZW1BbGwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG1lbnVJdGVtQWxsW2ldID09PSBtZW51SXRlbSkgeyAvLyDQvdCw0LbQsNGC0LDRjyjQsNC60YLQuNCy0L3QsNGPKSBsaVxyXG4gICAgICAgICAgICAgIG1lbnVJdGVtQWxsW2ldLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fY29udGVudCcpLnN0eWxlLndpZHRoID0gbWVudVdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBtZW51SXRlbUFsbFtpXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX3RpdGxlJykuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgbWVudUl0ZW1BbGxbaV0ucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX19pbWcnKS5zdHlsZS53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDQtdGB0YLRjCDQvtGC0LrRgNGL0YLRi9C5INGN0LvQtdC80LXQvdGCLiDQndC+0LLQvtC1INC+0YLQutGA0YvQstCw0LXQvCDQv9C+0YHQu9C1INC30LDQutGA0YvRgtC40Y8g0L/RgNC10LTRi9C00YPRidC10LPQvlxyXG4gICAgICAgIGlmIChtZW51QWN0aXZlKXtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBtZW51SXRlbS5jbGFzc0xpc3QuYWRkKG1lbnVUb2dnbGVBY3RpdmUpO1xyXG4gICAgICAgICAgfSwgMjUwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWVudUl0ZW0uY2xhc3NMaXN0LmFkZChtZW51VG9nZ2xlQWN0aXZlKVxyXG4gICAgICAgICAgbWVudUFjdGl2ZSA9ICFtZW51QWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0TWVudUFjdGl2ZSA9IG1lbnVJdGVtO1xyXG4gICAgICAgIFxyXG4gICAgICB9ICBcclxuICAgICAgLy8g0LrQu9C40Log0L/QviDQutGA0LXRgdGC0LjQutGDINCyINC60L7QvdGC0LXQvdGC0LVcclxuICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKG1lbnVDbG9zZUJ1dHRvbikpe1xyXG4gICAgICByZW1vdmVUb2dnbGUodGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSk7XHJcbiAgICAgIG1lbnVBY3RpdmUgPSAhbWVudUFjdGl2ZTtcclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICBmdW5jdGlvbiByZW1vdmVUb2dnbGUobGkpIHtcclxuICAgIGxpLmNsYXNzTGlzdC5yZW1vdmUobWVudVRvZ2dsZUFjdGl2ZSk7IC8vIChsaSlcclxuICAgIGxpLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fY29udGVudCcpLnN0eWxlLndpZHRoID0gbnVsbDsgLy8gZGl2INGBINC60L7QvdGC0LXQvdGC0L7QvFxyXG4gICAgbGFzdE1lbnVBY3RpdmUgPSBudWxsOyAgICBcclxuICAgIGlmIChtZW51V2lkdGggPD0gYnJlYWtQb2ludFBob25lKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVudUl0ZW1BbGwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIG1lbnVJdGVtQWxsW2ldLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fdGl0bGUnKS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgIG1lbnVJdGVtQWxsW2ldLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9faW1nJykuc3R5bGUud2lkdGggPSBtZW51VG9nZ2xlV2lkdGggKyAncHgnOyAgICAgICAgXHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgfSAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCk9PntcclxuICAgIG1lbnVXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JykuY2xpZW50V2lkdGgsIC8vINGI0LjRgNC40L3QsCDQsdC70L7QutCwINC80LXQvdGOXHJcbiAgICBtZW51QWxsVG9nZ2xlV2lkdGggPSBtZW51SXRlbUFsbFswXS5jbGllbnRXaWR0aCAqIG1lbnVJdGVtQWxsLmxlbmd0aCwgLy8g0YjQuNGA0LjQvdCwINCy0YHQtdGFIGxpXHJcbiAgICBtZW51T3BlbldpZHRoID0gZGVmdWx0Q29udGVudFdpZHRoICsgbWVudUFsbFRvZ2dsZVdpZHRoOyAvLyDRiNC40YDQuNC90LAg0L7RgtC60YDRi9GC0L7QuSDRgdC10LrRhtC40LggKyDQstGB0LXRhSBsaVxyXG4gIH0pO1xyXG59KSgpXHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbmNvbnN0IGhlYWRlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hdicpLFxyXG4gICAgICBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2JyksXHJcbiAgICAgIG5hdkxpbmsgPSAnYS5uYXZfX2xpbmsnXHJcbiAgICAgIG5hdkFjdGl2ZSA9ICduYXYtLWFjdGl2ZScsXHJcbiAgICAgIGJ0bkhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2hhbWJ1cmdlcicpLFxyXG4gICAgICBidG5IYW1idXJnZXJNYXRjaGVzID0gJ2J1dHRvbi5oZWFkZXJfX2hhbWJ1cmdlcicsXHJcbiAgICAgIGJ0bkhhbWJ1cmdlckNsb3NlID0gJ2J0bi1oYW1idXJnZXItLWNsb3NlJyxcclxuICAgICAgbm9TY3JvbGwgPSAnbm8tc2Nyb2xsJztcclxuXHJcbmhlYWRlck5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gIGlmIChldmVudC50YXJnZXQubWF0Y2hlcyhidG5IYW1idXJnZXJNYXRjaGVzKSkgbmF2VG9nZ2xlKCk7XHJcbiAgZWxzZSBpZiAobmF2LmNsYXNzTGlzdC5jb250YWlucyhuYXZBY3RpdmUpICYmIGV2ZW50LnRhcmdldC5tYXRjaGVzKG5hdkxpbmspKSBuYXZUb2dnbGUoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBuYXZUb2dnbGUoKSB7XHJcbiAgbmF2LmNsYXNzTGlzdC50b2dnbGUobmF2QWN0aXZlKTtcclxuICBidG5IYW1idXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShidG5IYW1idXJnZXJDbG9zZSk7XHJcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKG5vU2Nyb2xsKTtcclxufVxyXG5cclxufSkoKSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3Qgc2VjdGlvbkNvdW50ID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWN0aW9uJykubGVuZ3RoIC0gMSkgKiAtMSwgLy8g0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtC/0YDQtdC00LXQu9C10L3QuNGPINC60L7QvdGG0LAg0YHRgtGA0LDQvdC40YbRiy4gLTEg0L/QvtGC0L7QvNGDINGH0YLQviDQvdCwINC/0LXRgNCy0L7QuSDRgdGC0YDQsNC90LjRhtC1IHRyYW5zZm9ybSDQvdC1INC/0YDQuNC80LXQvdGP0LXRgtGB0Y8uINGD0LzQvdC+0LbQsNC10Lwg0L3QsCAtMSjQv9C+0LvRg9GH0LDQtdC8INC+0YLRgNC40YbQsNGC0LXQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUpLCDRh9GC0L4g0LHRiyDQsiDQtNCw0LvRjNC90LXQudGI0LXQvCDRgdGA0LDQstC90LjQstCw0YLRjCDQutC+0LvQuNGH0LXRgdGC0LLQviDRgdC10LrRhtC40Lkg0YEg0L3QvtC80LXRgNC+0Lwg0YLQtdC60YPRidC10Lkg0YHQtdC60YbQuNC4XHJcbiAgICAgICAgcGFnaW5hdGlvbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbl9fbGlzdCcpLFxyXG4gICAgICAgIG5hdkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19saXN0JyksXHJcbiAgICAgICAgb3JkZXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjcm9sbC1vcmRlcicpLCAvLyDQutC90L7Qv9C60Lgg0LfQsNC60LDQt9Cw0YLRjCDQsiDRgdC10LrRhtC40LggcHJvbW8g0LggcHJvZHVjdFxyXG4gICAgICAgIHBhZ2luYXRpb25BbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFnaW5hdGlvbl9faXRlbScpLFxyXG4gICAgICAgIHBhZ2luYXRpb25BY3RpdmUgPSAncGFnaW5hdGlvbl9faXRlbS0tYWN0aXZlJztcclxuICBsZXQgY3VycmVudEFjdGl2ZSA9IDAsIC8vINC90L7QvNC10YAg0YLQtdC60YPRidC10Lkg0YHQtdC60YbQuNC4XHJcbiAgICAgIHRvdWNoID0gW10sIC8vINC30LDQv9C+0LzQuNC90LDQtdC8IDIg0LfQvdCw0YfQtdC90LjQtSBjbGllbnRZINC/0YDQuCDRgdC+0LHRi9GC0LjQuCB0b3VjaCDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQvdCw0L/RgNCw0LLQu9C10L3QuNGPINGB0LrQvtC70LvQsFxyXG4gICAgICBsYXN0QWN0aXZlID0gMCwgLy8g0L/QvtGB0LvQtdC00L3Rj9GPINCw0LrRgtC40LLQvdCw0Y8g0YHQtdC60YbQuNGPICjQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINGC0L7Qs9C+LCDRh9GC0L4g0LHRiyDRg9Cx0YDQsNGC0Ywg0LDQutGC0LjQstC90YvQuSDQutC70LDRgdGBINGBINC/0LDQs9C40L3QsNGG0LjQuClcclxuICAgICAgaXNTY3JvbGwgPSBmYWxzZTtcclxuICAgICAgIFxyXG5cclxuICBmdW5jdGlvbiBtb3ZlU2Nyb2xsKGRpcmVjdGlvbikge1xyXG4gICAgaWYoaXNTY3JvbGwpIHJldHVyblxyXG4gICBcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJykge1xyXG4gICAgICBjdXJyZW50QWN0aXZlLS07XHJcbiAgICAgIHNjcm9sbCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudEFjdGl2ZSsrO1xyXG4gICAgICBzY3JvbGwoKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gc2Nyb2xsKCkge1xyXG4gICAgLy/Qv9GA0L7QstC10YDRj9C10Lwg0L3Rg9C20L3QviDQu9C4INCy0YvQv9C+0LvQvdGP0YLRjCDRgdC60YDQvtC70LtcclxuICAgIGlmKGN1cnJlbnRBY3RpdmUgPCBzZWN0aW9uQ291bnQpIHJldHVybiBjdXJyZW50QWN0aXZlID0gc2VjdGlvbkNvdW50OyAvLyDQutC+0L3QtdGGINGB0YLRgNCw0L3QuNGG0YtcclxuICAgIGlmKGN1cnJlbnRBY3RpdmUgPiAwKSByZXR1cm4gY3VycmVudEFjdGl2ZSA9IDA7IC8vINC90LDRh9Cw0LvQviDRgdGC0YDQsNC90LjRhtGLXHJcblxyXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XHJcbiAgICBtYWluLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7Y3VycmVudEFjdGl2ZSAqIDEwMH0lKWA7XHJcbiAgICBcclxuICAgIGlzU2Nyb2xsID0gIWlzU2Nyb2xsO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHBhZ2luYXRpb25BbGxbbGFzdEFjdGl2ZV0uY2xhc3NMaXN0LnRvZ2dsZShwYWdpbmF0aW9uQWN0aXZlKTsgLy8g0YPQtNCw0LvRj9C10Lwg0LrQu9Cw0YHRgVxyXG4gICAgICBsYXN0QWN0aXZlID0gY3VycmVudEFjdGl2ZSAqIC0xOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQu9GP0LXQvCDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgIHBhZ2luYXRpb25BbGxbbGFzdEFjdGl2ZV0uY2xhc3NMaXN0LnRvZ2dsZShwYWdpbmF0aW9uQWN0aXZlKTsgLy8g0LTQvtCx0LDQstC70Y/QtdC8INC60LvQsNGB0YFcclxuXHJcbiAgICAgIGlzU2Nyb2xsID0gIWlzU2Nyb2xsO1xyXG4gICAgICB0b3VjaCA9IFtdO1xyXG4gICAgfSwgNjUwKTtcclxuICB9XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGV2ZW50KSA9PntcclxuICAgIGNvbnN0IGRlbHRhID0gZXZlbnQuZGVsdGFZLFxyXG4gICAgICAgICAgc2Nyb2xsID0gKGRlbHRhID4gMCkgPyAnZG93bicgOiAndXAnO1xyXG4gICAgaWYgKGV2ZW50LnBhdGhbMF0ubWF0Y2hlcygneW1hcHMnKSkgcmV0dXJuXHJcbiAgICBtb3ZlU2Nyb2xsKHNjcm9sbCk7ICAgIFxyXG4gIH0pO1xyXG4gIHBhZ2luYXRpb25MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGFnaW5hdGlvbl9fbGluaycpKSB7XHJcbiAgICAgIGN1cnJlbnRBY3RpdmUgPSAtdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsO1xyXG4gICAgICBzY3JvbGwoKTsgICAgICBcclxuICAgIH1cclxuICB9KTtcclxuICBuYXZMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmF2X19saW5rJykpIHtcclxuICAgICAgY3VycmVudEFjdGl2ZSA9IC10YXJnZXQuZGF0YXNldC5zY3JvbGw7XHJcbiAgICAgIHNjcm9sbCgpOyAgICAgIFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIG9yZGVyQnV0dG9ucy5mb3JFYWNoKG9yZGVyQnV0dG9uID0+IHtcclxuICAgIG9yZGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBjdXJyZW50QWN0aXZlID0gLW9yZGVyQnV0dG9uLmRhdGFzZXQuc2Nyb2xsO1xyXG4gICAgICBzY3JvbGwoKTtcclxuICAgIH0pXHJcbiAgfSk7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgdGFnTmFtZSA9IGV2ZW50LnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCB1c2VyVHlwaW5nSW5JbnB1dHMgPSB0YWdOYW1lID09PSAnaW5wdXQnIHx8IHRhZ05hbWUgPT09ICd0ZXh0YXJlYSc7XHJcblxyXG4gICAgaWYgKHVzZXJUeXBpbmdJbklucHV0cykgcmV0dXJuXHJcbiAgICBcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA0MCkge1xyXG4gICAgICBtb3ZlU2Nyb2xsKCdkb3duJyk7XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM4KSB7XHJcbiAgICAgIG1vdmVTY3JvbGwoJ3VwJyk7XHJcbiAgICB9XHJcbiAgfSlcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIChldmVudCkgPT57XHJcbiAgICBjb25zdCBkZWx0YVkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZOyBcclxuICAgIHRvdWNoLnB1c2goZGVsdGFZKTtcclxuICAgIGlmICh0b3VjaC5sZW5ndGggPT09IDIpIHtcclxuICAgICAgY29uc3Qgc2Nyb2xsID0gKHRvdWNoWzBdID4gdG91Y2hbMV0pID8gJ2Rvd24nIDogJ3VwJztcclxuICAgICAgbW92ZVNjcm9sbChzY3JvbGwpO1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICB9KTtcclxuICBcclxufSkoKSIsIihmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gIGNvbnN0IG9yZGVyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlci1mb3JtJyksXHJcbiAgICAgICAgb3JkZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3JkZXItZm9ybV9fc3VibWl0Jyk7XHJcblxyXG4gIG9yZGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KT0+e1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgIGlmICh2YWxpZGF0ZUZvcm0ob3JkZXJGb3JtKSkge1xyXG4gICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgIG5hbWU6IG9yZGVyRm9ybS5lbGVtZW50cy5uYW1lLnZhbHVlLFxyXG4gICAgICAgIHBob25lOiBvcmRlckZvcm0uZWxlbWVudHMucGhvbmUudmFsdWUsXHJcbiAgICAgICAgLy8gc3RyZWV0OiBvcmRlckZvcm0uZWxlbWVudHMuc3RyZWV0LnZhbHVlLFxyXG4gICAgICAgIC8vIGhvdXNlOiBvcmRlckZvcm0uZWxlbWVudHMuaG91c2UudmFsdWUsXHJcbiAgICAgICAgLy8gYm9keTogb3JkZXJGb3JtLmVsZW1lbnRzLmJvZHkudmFsdWUsXHJcbiAgICAgICAgLy8gZmxhdDogb3JkZXJGb3JtLmVsZW1lbnRzLmZsYXQudmFsdWUsXHJcbiAgICAgICAgLy8gZmxvb3I6IG9yZGVyRm9ybS5lbGVtZW50cy5mbG9vci52YWx1ZSxcclxuICAgICAgICBjb21tZW50OiBvcmRlckZvcm0uZWxlbWVudHMuY29tbWVudC52YWx1ZSxcclxuICAgICAgICBlbWFpbDogJ2VtYWlsQHRlc3QnXHJcbiAgICAgIH07XHJcbiAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBkYXRhLm5hbWUpO1xyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob25lJywgZGF0YS5waG9uZSk7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnY29tbWVudCcsIGRhdGEuY29tbWVudCk7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZW1haWwnLCBkYXRhLmVtYWlsKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG4gICAgICB4aHIub3BlbignUE9TVCcsICdodHRwczovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vc2VuZG1haWwvZmFpbCcpO1xyXG4gICAgICB4aHIuc2VuZChmb3JtRGF0YSk7XHJcbiAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PiB7XHJcbiAgICAgICAgaWYgKHhoci5yZXNwb25zZS5zdGF0dXMpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlTW9kYWwoeGhyLnJlc3BvbnNlLm1lc3NhZ2UpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVNb2RhbCh4aHIucmVzcG9uc2UubWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgfSlcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHZhbGlkYXRlRm9ybShmb3JtKSB7XHJcbiAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG5cclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5uYW1lLmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMucGhvbmUuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5zdHJlZXQuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5ob3VzZS5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLmJvZHkuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5mbGF0LmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMuZmxvb3IuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5jb21tZW50LmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcblxyXG4gICAgcmV0dXJuIHZhbGlkXHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlTW9kYWwoY29udGVudCkge1xyXG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWxfX2NvbnRhaW5lcicpO1xyXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgICAgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbF9fdGl0bGUnKTtcclxuICAgIHRpdGxlLmlubmVyVGV4dCA9IGNvbnRlbnQ7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnbW9kYWxfX2J1dHRvbicpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi0tY29sb3ItLWdyZWVuJyk7XHJcbiAgICBidXR0b24udHlwZSA9ICdidXR0b24nO1xyXG4gICAgYnV0dG9uLmlubmVyVGV4dCA9ICfQl9Cw0LrRgNGL0YLRjCc7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgaWYgKCEodGFyZ2V0ID09PSBjb250YWluZXIgfHwgdGFyZ2V0ID09PSB0aXRsZSkpIHtcclxuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBpZiAoZS5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAvLyAgIG1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICAvLyB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBtb2RhbFxyXG4gIH07XHJcblxyXG59KSgpXHJcbiIsIihmdW5jdGlvbigpIHsgICAgXHJcbiAgY29uc3QgcHJvZHVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19jb250YWluZXInKSxcclxuICAgICAgICBwcm9kdWN0SXRlbUFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0X19pdGVtJyksXHJcbiAgICAgICAgYnRuUHJldmlvdXMgPSAnYnV0dG9uLnByb2R1Y3RfX3ByZXZpb3VzJyxcclxuICAgICAgICBidG5OZXh0ID0gJ2J1dHRvbi5wcm9kdWN0X19uZXh0JyxcclxuICAgICAgICBwcm9kdWN0SWl0ZW1BY3RpdmUgPSAncHJvZHVjdF9faXRlbS0tYWN0aXZlJztcclxuICBsZXQgaUFjdGl2ZSA9IDA7XHJcblxyXG4gIHByb2R1Y3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICAgIC8vINC/0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LRcclxuICAgIGlmKGV2ZW50LnRhcmdldC5tYXRjaGVzKGJ0blByZXZpb3VzKSl7XHJcbiAgICAgIGlmIChwcm9kdWN0SXRlbUFsbFtpQWN0aXZlIC0gMV0pIHtcclxuICAgICAgICBwcm9kdWN0VG9nZ2xlKGlBY3RpdmUgLSAxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9kdWN0VG9nZ2xlKHByb2R1Y3RJdGVtQWxsLmxlbmd0aCAtIDEpO1xyXG4gICAgICB9XHJcbiAgICAvLyDRgdC70LXQtNGD0Y7RidC40Lkg0YHQu9Cw0LnQtCAgXHJcbiAgICB9IGVsc2UgaWYoZXZlbnQudGFyZ2V0Lm1hdGNoZXMoYnRuTmV4dCkpe1xyXG4gICAgICBpZiAocHJvZHVjdEl0ZW1BbGxbaUFjdGl2ZSArIDFdKSB7XHJcbiAgICAgICAgcHJvZHVjdFRvZ2dsZShpQWN0aXZlICsgMSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZHVjdFRvZ2dsZSgwKTtcclxuICAgICAgfVxyXG4gICAgfSAgXHJcbiAgfSlcclxuXHJcbiAgZnVuY3Rpb24gcHJvZHVjdFRvZ2dsZShpTmV4dCkge1xyXG4gICAgcHJvZHVjdEl0ZW1BbGxbaUFjdGl2ZV0uY2xhc3NMaXN0LnRvZ2dsZShwcm9kdWN0SWl0ZW1BY3RpdmUpO1xyXG4gICAgaUFjdGl2ZSA9IGlOZXh0O1xyXG4gICAgcHJvZHVjdEl0ZW1BbGxbaUFjdGl2ZV0uY2xhc3NMaXN0LnRvZ2dsZShwcm9kdWN0SWl0ZW1BY3RpdmUpO1xyXG4gIH1cclxufSkoKSIsIihmdW5jdGlvbigpIHtcclxuICBjb25zdCByZXZpZXdzV3JhcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX3dyYXBlcicpLFxyXG4gICAgICAgIGZlZWRiYWNrQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZlZWRiYWNrJyksXHJcblxyXG4gICAgICAgIHJldmlld3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2xpc3QnKSxcclxuICAgICAgICByZXZpZXdzQWxsID0gcmV2aWV3c0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnJldmlld3NfX2l0ZW0nKSxcclxuICAgICAgICByZXZpZXdzQWN0aXZlID0gJ3Jldmlld3NfX2l0ZW0tLWFjdGl2ZScsICAgICAgICBcclxuXHJcbiAgICAgICAgcmV2aWV3c0J1dHRvbiA9ICdyZXZpZXdzX19idXR0b24nO1xyXG5cclxuICBsZXQgbGFzdEFjdGl2ZSA9IDAsXHJcbiAgICAgIHJldmlld3NDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2NvbnRlbnQnKS5jbGllbnRXaWR0aDtcclxuXHJcbiAgcmV2aWV3c1dyYXBlci5zdHlsZS53aWR0aCA9IHJldmlld3NDb250ZW50ICogZmVlZGJhY2tBbGwubGVuZ3RoICsgJ3B4JztcclxuXHJcbiAgcmV2aWV3c0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57XHJcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTsgLy8gYnV0dG9uXHJcbiAgICBcclxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHJldmlld3NCdXR0b24pKSB7XHJcbiAgICAgIHJldmlld3NUb2dnbGUodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpIC0gMSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiByZXZpZXdzVG9nZ2xlKG5leHRBY3RpdmUpIHtcclxuICAgIHJldmlld3NBbGxbbGFzdEFjdGl2ZV0uY2xhc3NMaXN0LnJlbW92ZShyZXZpZXdzQWN0aXZlKTtcclxuICAgIGxhc3RBY3RpdmUgPSBuZXh0QWN0aXZlOyAvLyDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LVcclxuICAgIHJldmlld3NBbGxbbmV4dEFjdGl2ZV0uY2xhc3NMaXN0LmFkZChyZXZpZXdzQWN0aXZlKTtcclxuICAgIFxyXG4gICAgcmV2aWV3c1dyYXBlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgLSByZXZpZXdzQ29udGVudCAqIG5leHRBY3RpdmUgKyAncHgpJztcclxuICB9O1xyXG4gIFxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKT0+e1xyXG4gICAgcmV2aWV3c0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fY29udGVudCcpLmNsaWVudFdpZHRoLFxyXG4gICAgXHJcbiAgICByZXZpZXdzV3JhcGVyLnN0eWxlLndpZHRoID0gcmV2aWV3c0NvbnRlbnQgKiBmZWVkYmFja0FsbC5sZW5ndGggKyAncHgnO1xyXG4gICAgcmV2aWV3c1dyYXBlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgLSByZXZpZXdzQ29udGVudCAqIGxhc3RBY3RpdmUgKyAncHgpJztcclxuICB9KTtcclxuICAgIFxyXG59KSgpIiwiKGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IHRlYW1Ub2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVhbV9fbGlzdCcpXHJcbiAgICAgICAgdGVhbUJ1dHRvbiA9ICdhLnRlYW1fX25hbWUnLFxyXG4gICAgICAgIHRlYW1Ub2dnbGVBY3RpdmUgPSAndGVhbV9faXRlbS0tYWN0aXZlJztcclxuICBsZXQgcHJldmlvdXNDbGljayA9IG51bGw7XHJcblxyXG4gIHRlYW1Ub2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57ICBcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZihldmVudC50YXJnZXQubWF0Y2hlcyh0ZWFtQnV0dG9uKSkge1xyXG4gICAgICAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INC90LDQttCw0YLQuNC1INC/0YDQvtC40LfQvtGI0LvQviDQv9C+INCw0LrRgtC40LLQvdC+0LzRgyDRjdC70LXQvNC10L3RgtGDXHJcbiAgICAgIGlmIChldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucyh0ZWFtVG9nZ2xlQWN0aXZlKSkge1xyXG4gICAgICAgIHJlbW92ZVRvZ2dsZShldmVudC50YXJnZXQpICAgIFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vINC10YHQu9C4IHRydWUsINGC0L4g0YPQsdC40YDQsNC10Lwg0YHRgtC40LvQuCDRgSDQv9GA0LXQtNGL0LTRg9GJ0LXQs9C+INCw0LrRgtC40LLQvdC+0LPQviDRjdC70LXQvNC10L3RgtCwXHJcbiAgICAgICAgaWYgKHByZXZpb3VzQ2xpY2spIHtcclxuICAgICAgICAgIHJlbW92ZVRvZ2dsZShwcmV2aW91c0NsaWNrKVxyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAgXHJcbiAgICAgICAgICAgIGFkZFRvZ2dsZShldmVudC50YXJnZXQpICAgICBcclxuICAgICAgICAgIH0sIDI5MCk7XHJcbiAgICAgICAgfSAgICAgICBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGFkZFRvZ2dsZShldmVudC50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZVRvZ2dsZShlbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKHRlYW1Ub2dnbGVBY3RpdmUpOyAgXHJcbiAgICBlbGVtZW50LnBhcmVudE5vZGUucHJldmlvdXNFbGVtZW50U2libGluZy5zdHlsZS5oZWlnaHQgPSBudWxsOyBcclxuICAgIHByZXZpb3VzQ2xpY2sgPSBudWxsOyBcclxuICB9XHJcbiAgZnVuY3Rpb24gYWRkVG9nZ2xlKGVsZW1lbnQpIHtcclxuICAgIGxldCBpbWdIZWlnaHQgPSBlbGVtZW50LnBhcmVudE5vZGUucHJldmlvdXNFbGVtZW50U2libGluZy5vZmZzZXRIZWlnaHQsIFxyXG4gICAgICAgIGluZm9IZWlnaHQgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5vZmZzZXRIZWlnaHQsXHJcbiAgICAgICAgbmV3SW1nSGVpZ2h0ID0gaW1nSGVpZ2h0IC0gaW5mb0hlaWdodDtcclxuXHJcbiAgICBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKHRlYW1Ub2dnbGVBY3RpdmUpOyAgICAgICAgXHJcbiAgICBlbGVtZW50LnBhcmVudE5vZGUucHJldmlvdXNFbGVtZW50U2libGluZy5zdHlsZS5oZWlnaHQgPSBuZXdJbWdIZWlnaHQgKyAncHgnO1xyXG4gICAgcHJldmlvdXNDbGljayA9IGVsZW1lbnQ7IFxyXG4gIH1cclxuICAgIFxyXG59KSgpIiwiKGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IHByb2dyZXNzQ29udHJvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzc19fdmFsdWUnKSxcclxuICAgICAgICBzb3VuZENvbnRyb2wgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc291bmRfX3ZhbHVlJyk7XHJcbiAgbGV0IHZpZGVvLCBpbnRlcnZhbElkLCBzb3VuZFZhbHVlO1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB2aWRlb1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW9fX3dyYXBwZXInKTtcclxuICAgIFxyXG4gICAgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW9fX3BsYXllcicpO1xyXG5cclxuICAgIHByb2dyZXNzQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKT0+e1xyXG4gICAgICAvL9C+0LHQvdGD0LvRj9C10Lwg0LfQvdCw0YfQtdC90LjRjywg0YfRgtC+INCx0Ysg0L/RgNC+0LjQt9Cy0LXRgdGC0Lgg0LLRi9GH0LjRgdC70LXQvdC40Y9cclxuICAgICAgcHJvZ3Jlc3NDb250cm9sLnZhbHVlID0gMDtcclxuICAgICAgcHJvZ3Jlc3NDb250cm9sLm1heCA9IDEwMDtcclxuICAgIH0pXHJcbiAgICBcclxuICAgIHZpZGVvV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgIC8vINC60L3QvtC/0LrQuCBwbGF5XHJcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2aWRlb19fcGxheWVyJykgfHxcclxuICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXknKSkge1xyXG4gICAgICAgIHBsYXlTdG9wKCk7ICAgICAgICBcclxuICAgICAgfSBcclxuICAgICAgLy8gaW5wdXQg0L/RgNC+0LTQvtC70LbQuNGC0LXQu9GM0L3QvtGB0YLQuCDQstC40LTQtdC+XHJcbiAgICAgIGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2dyZXNzX192YWx1ZScpKXtcclxuICAgICAgICBzZXRQcm9ncmVzc0NvbnRyb2woKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8g0LrQvdC+0L/QutCwINCz0YDQvtC80LrQvtGB0YLQuFxyXG4gICAgICBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3VuZF9fbXV0ZScpKSB7XHJcbiAgICAgICAgc291bmRNdXRlKCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gaW5wdXQg0LPRgNC+0LzQutC+0YHRgtC4INCy0LjQtNC10L5cclxuICAgICAgZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc291bmRfX3ZhbHVlJykpe1xyXG4gICAgICAgIHNldFNvdW5kQ29udHJvbCgpICBcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgfSk7XHJcbiAgZnVuY3Rpb24gcGxheVN0b3AoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW9fX3BsYXknKS5jbGFzc0xpc3QudG9nZ2xlKCd2aWRlb19fcGxheS0tZGlzYWJsZWQnKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzc19fcGxheScpLmNsYXNzTGlzdC50b2dnbGUoJ3Byb2dyZXNzX19wbGF5LS1hY3RpdmUnKTtcclxuICAgIFxyXG4gICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICBpZiAocHJvZ3Jlc3NDb250cm9sLm1heCA9PT0gJycpIC8vINC10YHQu9C4INCy0LjQtNC10L4g0LfQsNC/0YPRidC10L3QviDRgSDQvdCw0YfQsNC70LAgXHJcbiAgICAgICAgcHJvZ3Jlc3NDb250cm9sLm1heCA9IHZpZGVvLmR1cmF0aW9uO1xyXG4gICAgXHJcbiAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHVwZGF0ZVByb2dyZXNzQ29udHJvbCwgMTAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiB1cGRhdGVQcm9ncmVzc0NvbnRyb2woKSB7XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wudmFsdWUgPSB2aWRlby5jdXJyZW50VGltZTtcclxuICB9IFxyXG4gIGZ1bmN0aW9uIHNldFByb2dyZXNzQ29udHJvbCgpIHtcclxuICAgIGxldCBwcm9ncmVzcyA9IHZpZGVvLmR1cmF0aW9uO1xyXG4gICAgcHJvZ3Jlc3NDb250cm9sLm1heCA9IHZpZGVvLmR1cmF0aW9uOyBcclxuXHJcbiAgICAvLyBpbnB1dC5tYXgg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0YDQsNCy0LXQvSAxMDAg0L/QvtGN0YLQvtC80YMg0L/QvtGB0LvQtSDQutC70LjQutCwINC/0L4g0L3QtdC80YMg0LzRiyDQuNC80LXQtdC8XHJcbiAgICAvLyBuLSUg0L7RgiAxMDAlLCDRgtC10L/QtdGA0Ywg0L3QsNGF0L7QtNC40Lwg0Y3RgtC+0YIg0LbQtSAlINCyINC90LDRiNC10Lwg0LLQuNC00LXQvlxyXG4gICAgcHJvZ3Jlc3NDb250cm9sLnZhbHVlID0gcHJvZ3Jlc3MgKiBwcm9ncmVzc0NvbnRyb2wudmFsdWUgLyAxMDA7XHJcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IHByb2dyZXNzQ29udHJvbC52YWx1ZTtcclxuICAgIGNvbnNvbGUubG9nKHByb2dyZXNzQ29udHJvbC52YWx1ZSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNvdW5kTXV0ZSgpIHtcclxuICAgIGlmICh2aWRlby52b2x1bWUgPT09IDApIHtcclxuICAgICAgdmlkZW8udm9sdW1lID0gc291bmRWYWx1ZTtcclxuICAgICAgc291bmRDb250cm9sLnZhbHVlID0gc291bmRWYWx1ZSAqIDEwOyAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc291bmRWYWx1ZSA9IHZpZGVvLnZvbHVtZTtcclxuICAgICAgdmlkZW8udm9sdW1lID0gMDtcclxuICAgICAgc291bmRDb250cm9sLnZhbHVlID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gc2V0U291bmRDb250cm9sKCkge1xyXG4gICAgdmlkZW8udm9sdW1lID0gc291bmRDb250cm9sLnZhbHVlIC8gMTA7XHJcbiAgfVxyXG59KSgpIl19
