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
    if (event.keyCode === 40) {
      moveScroll('down');
    } else if (event.keyCode === 38) {
      moveScroll('up');
    }
  })
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC5qcyIsIm1lbnUuanMiLCJuYXYuanMiLCJvbmVQYWdlU2Nyb2xsLmpzIiwib3JkZXIuanMiLCJwcm9kdWN0LmpzIiwicmV2aWV3cy5qcyIsInRlYW0uanMiLCJ2aWRlby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0NyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcblx0eW1hcHMucmVhZHkoaW5pdCk7XHJcblx0ZnVuY3Rpb24gaW5pdCgpIHtcclxuXHRcdGxldCBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ21hcCcsIHtcclxuXHRcdFx0Y2VudGVyOiBbNTUuNzQ4NiwgMzcuNTk4Nl0sXHJcblx0XHRcdHpvb206IDE0XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBwb2ludHMgPSBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHR4OiA1NS43NTcyLFxyXG5cdFx0XHRcdHk6IDM3LjYxNTgsXHJcblx0XHRcdFx0YWRkcmVzczogJ9GD0LsuINCe0YXQvtGC0L3Ri9C5INGA0Y/QtCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHg6IDU1Ljc0NTAsXHJcblx0XHRcdFx0eTogMzcuNjAwOCxcclxuXHRcdFx0XHRhZGRyZXNzOiAn0JPQvtCz0L7Qu9C10LLRgdC60LjQuSDQsdGD0LvRjNCy0LDRgCdcclxuXHRcdFx0fVxyXG5cdFx0XVxyXG5cclxuXHRcdHBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcclxuXHRcdFx0bXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFtwb2ludC54LCBwb2ludC55XSwge1xyXG5cdFx0XHRcdGJhbGxvb25Db250ZW50OiBwb2ludC5hZGRyZXNzXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcblx0XHRcdFx0aWNvbkltYWdlSHJlZjogJ2ltZy9tYXAvY2hvY2NvUG9pbnQucG5nJyxcclxuXHRcdFx0XHRoaWRlSWNvbk9uQmFsbG9vbk9wZW46IGZhbHNlLFxyXG5cdFx0XHRcdGljb25JbWFnZU9mZnNldDogWy0xNywgLTQwXVxyXG5cdFx0XHR9KSxcclxuXHJcblx0XHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQbGFjZW1hcmspO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59KSgpIiwiKGZ1bmN0aW9uKCkgeyAgICBcclxuICBjb25zdCBtZW51VG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX19saXN0JyksXHJcbiAgICAgICAgbWVudUl0ZW1BbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1hY2NvcmRpb25fX2l0ZW0nKSxcclxuICAgICAgICBtZW51VG9nZ2xlQWN0aXZlID0gJ21lbnUtYWNjb3JkaW9uX19pdGVtLS1hY3RpdmUnLFxyXG4gICAgICAgIG1lbnVCdXR0b24gPSAnbWVudS1hY2NvcmRpb25fX2J0bicsXHJcbiAgICAgICAgbWVudUJ1dHRvblNwYW4gPSAnbWVudS1hY2NvcmRpb25fX3RpdGxlJyxcclxuICAgICAgICBtZW51Q2xvc2VCdXR0b24gPSAnbWVudS1hY2NvcmRpb25fX2Nsb3NlLWJ0bic7XHJcbiAgXHJcbiAgbGV0IGxhc3RNZW51QWN0aXZlID0gbnVsbCwgLy8g0YLQtdC60YPRidCw0Y8g0L7RgtC60YDRi9GC0LDRjyDRgdC10LrRhtC40Y8gKGxpKVxyXG4gICAgICBtZW51QWN0aXZlID0gZmFsc2UsIC8vIHNldFRpbWVvdXQg0L/RgNC4INC+0YLQutGA0YvRgtC40Lgg0LLRgtC+0YDQvtC5INGB0LXQutGG0LjQuCAobGkpXHJcbiAgICAgIGRlZnVsdENvbnRlbnRXaWR0aCA9IDUyMCwgLy8g0YjQuNGA0LjQvdCwINC60L7QvdGC0LXQvdGC0LAg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICAgICAgYnJlYWtQb2ludFBob25lID0gNDgwLFxyXG4gICAgICBtZW51V2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLmNsaWVudFdpZHRoLCAvLyDRiNC40YDQuNC90LAg0LHQu9C+0LrQsCDQvNC10L3RjlxyXG4gICAgICBtZW51VG9nZ2xlV2lkdGggPSBtZW51SXRlbUFsbFswXS5jbGllbnRXaWR0aCwgLy8g0YjQuNGA0LjQvdCwINC+0LTQvdC+0LkgbGlcclxuICAgICAgbWVudUFsbFRvZ2dsZVdpZHRoID0gbWVudVRvZ2dsZVdpZHRoICogbWVudUl0ZW1BbGwubGVuZ3RoLCAvLyDRiNC40YDQuNC90LAg0LLRgdC10YUgbGlcclxuICAgICAgbWVudU9wZW5XaWR0aCA9IGRlZnVsdENvbnRlbnRXaWR0aCArIG1lbnVBbGxUb2dnbGVXaWR0aDsgLy8g0YjQuNGA0LjQvdCwINC+0YLQutGA0YvRgtC+0Lkg0YHQtdC60YbQuNC4ICsg0LLRgdC10YUgbGlcclxuICBcclxuICBtZW51VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KT0+e1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LFxyXG4gICAgbWVudUl0ZW0gPSAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1hY2NvcmRpb25fX2J0bicpKSA/IHRhcmdldC5wYXJlbnROb2RlIDogdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSwgLy8g0YDQvtC00LjRgtC10LvRjCAobGkpXHJcbiAgICBtZW51Q29udGVudCA9IG1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fY29udGVudCcpOyAvLyBkaXYg0YEg0LrQvtC90YLQtdC90YLQvtC8XHJcbiAgICBcclxuICAgIC8vINC60LvQuNC6INC/0L4g0LrQvdC+0L/QutC1INC40LvQuCDRgdC/0LDQvdGDXHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhtZW51QnV0dG9uKSB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKG1lbnVCdXR0b25TcGFuKSkge1xyXG4gICAgICAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INC90LDQttCw0YLQuNC1INC/0YDQvtC40LfQvtGI0LvQviDQv9C+INCw0LrRgtC40LLQvdC+0Lkg0YHQtdC60YbQuNC4XHJcbiAgICAgIGlmIChtZW51SXRlbS5jbGFzc0xpc3QuY29udGFpbnMobWVudVRvZ2dsZUFjdGl2ZSkpIHtcclxuICAgICAgICByZW1vdmVUb2dnbGUobWVudUl0ZW0pO1xyXG4gICAgICAgIG1lbnVBY3RpdmUgPSAhbWVudUFjdGl2ZTtcclxuICAgICAgICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INC10YHRgtGMINC+0YLQutGA0YvRgtGL0Lkg0Y3Qu9C10LzQtdC90YJcclxuICAgICAgICBpZiAobGFzdE1lbnVBY3RpdmUpIHtcclxuICAgICAgICAgIHJlbW92ZVRvZ2dsZShsYXN0TWVudUFjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC10YHQu9C4IHRydWUsINGC0L4g0YDQsNC30LzQtdGAINGN0LrRgNCw0L3QsCDQvNC10L3RjNGI0LUg0YfQtdC8INGA0LDQt9C80LXRgCDQvtGC0LrRgNGL0YLQvtCz0L4g0LzQtdC90Y4g0Lgg0LHQvtC70YzRiNC1INGH0LXQvCDQsdGA0LXQutC/0L7QuNC90YJcclxuICAgICAgICBpZiAobWVudVdpZHRoIDwgbWVudU9wZW5XaWR0aCAmJiBtZW51V2lkdGggPiBicmVha1BvaW50UGhvbmUpIHsgICAgICAgIFxyXG4gICAgICAgICAgbWVudUNvbnRlbnQuc3R5bGUud2lkdGggPSBtZW51V2lkdGggLSBtZW51QWxsVG9nZ2xlV2lkdGggKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWVudVdpZHRoIDw9IGJyZWFrUG9pbnRQaG9uZSkgeyAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INC60L7QvdGC0LXQvdGCINCy0L4g0LLRgdGOINGI0LjRgNC40L3RgyDRgNC+0LTQuNGC0LXQu9GPXHJcbiAgICAgICAgICBtZW51VG9nZ2xlV2lkdGggPSBtZW51SXRlbUFsbFswXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2ltZycpLmNsaWVudFdpZHRoOyBcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVudUl0ZW1BbGwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG1lbnVJdGVtQWxsW2ldID09PSBtZW51SXRlbSkgeyAvLyDQvdCw0LbQsNGC0LDRjyjQsNC60YLQuNCy0L3QsNGPKSBsaVxyXG4gICAgICAgICAgICAgIG1lbnVJdGVtQWxsW2ldLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fY29udGVudCcpLnN0eWxlLndpZHRoID0gbWVudVdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBtZW51SXRlbUFsbFtpXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX3RpdGxlJykuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgbWVudUl0ZW1BbGxbaV0ucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX19pbWcnKS5zdHlsZS53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDQtdGB0YLRjCDQvtGC0LrRgNGL0YLRi9C5INGN0LvQtdC80LXQvdGCLiDQndC+0LLQvtC1INC+0YLQutGA0YvQstCw0LXQvCDQv9C+0YHQu9C1INC30LDQutGA0YvRgtC40Y8g0L/RgNC10LTRi9C00YPRidC10LPQvlxyXG4gICAgICAgIGlmIChtZW51QWN0aXZlKXtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBtZW51SXRlbS5jbGFzc0xpc3QuYWRkKG1lbnVUb2dnbGVBY3RpdmUpO1xyXG4gICAgICAgICAgfSwgMjUwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWVudUl0ZW0uY2xhc3NMaXN0LmFkZChtZW51VG9nZ2xlQWN0aXZlKVxyXG4gICAgICAgICAgbWVudUFjdGl2ZSA9ICFtZW51QWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0TWVudUFjdGl2ZSA9IG1lbnVJdGVtO1xyXG4gICAgICAgIFxyXG4gICAgICB9ICBcclxuICAgICAgLy8g0LrQu9C40Log0L/QviDQutGA0LXRgdGC0LjQutGDINCyINC60L7QvdGC0LXQvdGC0LVcclxuICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKG1lbnVDbG9zZUJ1dHRvbikpe1xyXG4gICAgICByZW1vdmVUb2dnbGUodGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSk7XHJcbiAgICAgIG1lbnVBY3RpdmUgPSAhbWVudUFjdGl2ZTtcclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICBmdW5jdGlvbiByZW1vdmVUb2dnbGUobGkpIHtcclxuICAgIGxpLmNsYXNzTGlzdC5yZW1vdmUobWVudVRvZ2dsZUFjdGl2ZSk7IC8vIChsaSlcclxuICAgIGxpLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fY29udGVudCcpLnN0eWxlLndpZHRoID0gbnVsbDsgLy8gZGl2INGBINC60L7QvdGC0LXQvdGC0L7QvFxyXG4gICAgbGFzdE1lbnVBY3RpdmUgPSBudWxsOyAgICBcclxuICAgIGlmIChtZW51V2lkdGggPD0gYnJlYWtQb2ludFBob25lKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVudUl0ZW1BbGwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIG1lbnVJdGVtQWxsW2ldLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fdGl0bGUnKS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgIG1lbnVJdGVtQWxsW2ldLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9faW1nJykuc3R5bGUud2lkdGggPSBtZW51VG9nZ2xlV2lkdGggKyAncHgnOyAgICAgICAgXHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgfSAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCk9PntcclxuICAgIG1lbnVXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JykuY2xpZW50V2lkdGgsIC8vINGI0LjRgNC40L3QsCDQsdC70L7QutCwINC80LXQvdGOXHJcbiAgICBtZW51QWxsVG9nZ2xlV2lkdGggPSBtZW51SXRlbUFsbFswXS5jbGllbnRXaWR0aCAqIG1lbnVJdGVtQWxsLmxlbmd0aCwgLy8g0YjQuNGA0LjQvdCwINCy0YHQtdGFIGxpXHJcbiAgICBtZW51T3BlbldpZHRoID0gZGVmdWx0Q29udGVudFdpZHRoICsgbWVudUFsbFRvZ2dsZVdpZHRoOyAvLyDRiNC40YDQuNC90LAg0L7RgtC60YDRi9GC0L7QuSDRgdC10LrRhtC40LggKyDQstGB0LXRhSBsaVxyXG4gIH0pO1xyXG59KSgpXHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbmNvbnN0IGhlYWRlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hdicpLFxyXG4gICAgICBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2JyksXHJcbiAgICAgIG5hdkxpbmsgPSAnYS5uYXZfX2xpbmsnXHJcbiAgICAgIG5hdkFjdGl2ZSA9ICduYXYtLWFjdGl2ZScsXHJcbiAgICAgIGJ0bkhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2hhbWJ1cmdlcicpLFxyXG4gICAgICBidG5IYW1idXJnZXJNYXRjaGVzID0gJ2J1dHRvbi5oZWFkZXJfX2hhbWJ1cmdlcicsXHJcbiAgICAgIGJ0bkhhbWJ1cmdlckNsb3NlID0gJ2J0bi1oYW1idXJnZXItLWNsb3NlJyxcclxuICAgICAgbm9TY3JvbGwgPSAnbm8tc2Nyb2xsJztcclxuXHJcbmhlYWRlck5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gIGlmIChldmVudC50YXJnZXQubWF0Y2hlcyhidG5IYW1idXJnZXJNYXRjaGVzKSkgbmF2VG9nZ2xlKCk7XHJcbiAgZWxzZSBpZiAobmF2LmNsYXNzTGlzdC5jb250YWlucyhuYXZBY3RpdmUpICYmIGV2ZW50LnRhcmdldC5tYXRjaGVzKG5hdkxpbmspKSBuYXZUb2dnbGUoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBuYXZUb2dnbGUoKSB7XHJcbiAgbmF2LmNsYXNzTGlzdC50b2dnbGUobmF2QWN0aXZlKTtcclxuICBidG5IYW1idXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShidG5IYW1idXJnZXJDbG9zZSk7XHJcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKG5vU2Nyb2xsKTtcclxufVxyXG5cclxufSkoKSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3Qgc2VjdGlvbkNvdW50ID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWN0aW9uJykubGVuZ3RoIC0gMSkgKiAtMSwgLy8g0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtC/0YDQtdC00LXQu9C10L3QuNGPINC60L7QvdGG0LAg0YHRgtGA0LDQvdC40YbRiy4gLTEg0L/QvtGC0L7QvNGDINGH0YLQviDQvdCwINC/0LXRgNCy0L7QuSDRgdGC0YDQsNC90LjRhtC1IHRyYW5zZm9ybSDQvdC1INC/0YDQuNC80LXQvdGP0LXRgtGB0Y8uINGD0LzQvdC+0LbQsNC10Lwg0L3QsCAtMSjQv9C+0LvRg9GH0LDQtdC8INC+0YLRgNC40YbQsNGC0LXQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUpLCDRh9GC0L4g0LHRiyDQsiDQtNCw0LvRjNC90LXQudGI0LXQvCDRgdGA0LDQstC90LjQstCw0YLRjCDQutC+0LvQuNGH0LXRgdGC0LLQviDRgdC10LrRhtC40Lkg0YEg0L3QvtC80LXRgNC+0Lwg0YLQtdC60YPRidC10Lkg0YHQtdC60YbQuNC4XHJcbiAgICAgICAgcGFnaW5hdGlvbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbl9fbGlzdCcpLFxyXG4gICAgICAgIG5hdkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19saXN0JyksXHJcbiAgICAgICAgb3JkZXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjcm9sbC1vcmRlcicpLCAvLyDQutC90L7Qv9C60Lgg0LfQsNC60LDQt9Cw0YLRjCDQsiDRgdC10LrRhtC40LggcHJvbW8g0LggcHJvZHVjdFxyXG4gICAgICAgIHBhZ2luYXRpb25BbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFnaW5hdGlvbl9faXRlbScpLFxyXG4gICAgICAgIHBhZ2luYXRpb25BY3RpdmUgPSAncGFnaW5hdGlvbl9faXRlbS0tYWN0aXZlJztcclxuICBsZXQgY3VycmVudEFjdGl2ZSA9IDAsIC8vINC90L7QvNC10YAg0YLQtdC60YPRidC10Lkg0YHQtdC60YbQuNC4XHJcbiAgICAgIGxhc3RBY3RpdmUgPSAwLCAvLyDQv9C+0YHQu9C10LTQvdGP0Y8g0LDQutGC0LjQstC90LDRjyDRgdC10LrRhtC40Y8gKNC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0YLQvtCz0L4sINGH0YLQviDQsdGLINGD0LHRgNCw0YLRjCDQsNC60YLQuNCy0L3Ri9C5INC60LvQsNGB0YEg0YEg0L/QsNCz0LjQvdCw0YbQuNC4KVxyXG4gICAgICBpc1Njcm9sbCA9IGZhbHNlO1xyXG5cclxuICBmdW5jdGlvbiBtb3ZlU2Nyb2xsKGRpcmVjdGlvbikge1xyXG4gICAgaWYoaXNTY3JvbGwpIHJldHVyblxyXG4gICBcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJykge1xyXG4gICAgICBjdXJyZW50QWN0aXZlLS07XHJcbiAgICAgIHNjcm9sbCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudEFjdGl2ZSsrO1xyXG4gICAgICBzY3JvbGwoKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gc2Nyb2xsKCkge1xyXG4gICAgLy/Qv9GA0L7QstC10YDRj9C10Lwg0L3Rg9C20L3QviDQu9C4INCy0YvQv9C+0LvQvdGP0YLRjCDRgdC60YDQvtC70LtcclxuICAgIGlmKGN1cnJlbnRBY3RpdmUgPCBzZWN0aW9uQ291bnQpIHJldHVybiBjdXJyZW50QWN0aXZlID0gc2VjdGlvbkNvdW50OyAvLyDQutC+0L3QtdGGINGB0YLRgNCw0L3QuNGG0YtcclxuICAgIGlmKGN1cnJlbnRBY3RpdmUgPiAwKSByZXR1cm4gY3VycmVudEFjdGl2ZSA9IDA7IC8vINC90LDRh9Cw0LvQviDRgdGC0YDQsNC90LjRhtGLXHJcblxyXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XHJcbiAgICBtYWluLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7Y3VycmVudEFjdGl2ZSAqIDEwMH0lKWA7XHJcbiAgICBcclxuICAgIGlzU2Nyb2xsID0gIWlzU2Nyb2xsO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHBhZ2luYXRpb25BbGxbbGFzdEFjdGl2ZV0uY2xhc3NMaXN0LnRvZ2dsZShwYWdpbmF0aW9uQWN0aXZlKTsgLy8g0YPQtNCw0LvRj9C10Lwg0LrQu9Cw0YHRgVxyXG4gICAgICBsYXN0QWN0aXZlID0gY3VycmVudEFjdGl2ZSAqIC0xOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQu9GP0LXQvCDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgIHBhZ2luYXRpb25BbGxbbGFzdEFjdGl2ZV0uY2xhc3NMaXN0LnRvZ2dsZShwYWdpbmF0aW9uQWN0aXZlKTsgLy8g0LTQvtCx0LDQstC70Y/QtdC8INC60LvQsNGB0YFcclxuXHJcbiAgICAgIGlzU2Nyb2xsID0gIWlzU2Nyb2xsO1xyXG4gICAgfSwgNjUwKTtcclxuICB9XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGV2ZW50KSA9PntcclxuICAgIGNvbnN0IGRlbHRhID0gZXZlbnQuZGVsdGFZLFxyXG4gICAgICAgICAgc2Nyb2xsID0gKGRlbHRhID4gMCkgPyAnZG93bicgOiAndXAnO1xyXG4gICAgaWYgKGV2ZW50LnBhdGhbMF0ubWF0Y2hlcygneW1hcHMnKSkgcmV0dXJuXHJcbiAgICBtb3ZlU2Nyb2xsKHNjcm9sbCk7ICAgIFxyXG4gIH0pO1xyXG4gIHBhZ2luYXRpb25MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGFnaW5hdGlvbl9fbGluaycpKSB7XHJcbiAgICAgIGN1cnJlbnRBY3RpdmUgPSAtdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsO1xyXG4gICAgICBzY3JvbGwoKTsgICAgICBcclxuICAgIH1cclxuICB9KTtcclxuICBuYXZMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmF2X19saW5rJykpIHtcclxuICAgICAgY3VycmVudEFjdGl2ZSA9IC10YXJnZXQuZGF0YXNldC5zY3JvbGw7XHJcbiAgICAgIHNjcm9sbCgpOyAgICAgIFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIG9yZGVyQnV0dG9ucy5mb3JFYWNoKG9yZGVyQnV0dG9uID0+IHtcclxuICAgIG9yZGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBjdXJyZW50QWN0aXZlID0gLW9yZGVyQnV0dG9uLmRhdGFzZXQuc2Nyb2xsO1xyXG4gICAgICBzY3JvbGwoKTtcclxuICAgIH0pXHJcbiAgfSk7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDQwKSB7XHJcbiAgICAgIG1vdmVTY3JvbGwoJ2Rvd24nKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzgpIHtcclxuICAgICAgbW92ZVNjcm9sbCgndXAnKTtcclxuICAgIH1cclxuICB9KVxyXG59KSgpIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgXHJcbiAgY29uc3Qgb3JkZXJGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9yZGVyLWZvcm0nKSxcclxuICAgICAgICBvcmRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlci1mb3JtX19zdWJtaXQnKTtcclxuXHJcbiAgb3JkZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgaWYgKHZhbGlkYXRlRm9ybShvcmRlckZvcm0pKSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgbmFtZTogb3JkZXJGb3JtLmVsZW1lbnRzLm5hbWUudmFsdWUsXHJcbiAgICAgICAgcGhvbmU6IG9yZGVyRm9ybS5lbGVtZW50cy5waG9uZS52YWx1ZSxcclxuICAgICAgICAvLyBzdHJlZXQ6IG9yZGVyRm9ybS5lbGVtZW50cy5zdHJlZXQudmFsdWUsXHJcbiAgICAgICAgLy8gaG91c2U6IG9yZGVyRm9ybS5lbGVtZW50cy5ob3VzZS52YWx1ZSxcclxuICAgICAgICAvLyBib2R5OiBvcmRlckZvcm0uZWxlbWVudHMuYm9keS52YWx1ZSxcclxuICAgICAgICAvLyBmbGF0OiBvcmRlckZvcm0uZWxlbWVudHMuZmxhdC52YWx1ZSxcclxuICAgICAgICAvLyBmbG9vcjogb3JkZXJGb3JtLmVsZW1lbnRzLmZsb29yLnZhbHVlLFxyXG4gICAgICAgIGNvbW1lbnQ6IG9yZGVyRm9ybS5lbGVtZW50cy5jb21tZW50LnZhbHVlLFxyXG4gICAgICAgIGVtYWlsOiAnZW1haWxAdGVzdCdcclxuICAgICAgfTtcclxuICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIGRhdGEubmFtZSk7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGhvbmUnLCBkYXRhLnBob25lKTtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdjb21tZW50JywgZGF0YS5jb21tZW50KTtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdlbWFpbCcsIGRhdGEuZW1haWwpO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XHJcbiAgICAgIHhoci5vcGVuKCdQT1NUJywgJ2h0dHBzOi8vd2ViZGV2LWFwaS5sb2Z0c2Nob29sLmNvbS9zZW5kbWFpbC9mYWlsJyk7XHJcbiAgICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcclxuICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKT0+IHtcclxuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlLnN0YXR1cykge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVNb2RhbCh4aHIucmVzcG9uc2UubWVzc2FnZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZU1vZGFsKHhoci5yZXNwb25zZS5tZXNzYWdlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICB9KVxyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGVGb3JtKGZvcm0pIHtcclxuICAgIGxldCB2YWxpZCA9IHRydWU7XHJcblxyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLm5hbWUuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5waG9uZS5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLnN0cmVldC5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLmhvdXNlLmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMuYm9keS5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLmZsYXQuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5mbG9vci5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLmNvbW1lbnQuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuXHJcbiAgICByZXR1cm4gdmFsaWRcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVNb2RhbChjb250ZW50KSB7XHJcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbF9fY29udGFpbmVyJyk7XHJcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgICBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsX190aXRsZScpO1xyXG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gY29udGVudDtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdtb2RhbF9fYnV0dG9uJyk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJyk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuLS1jb2xvci0tZ3JlZW4nKTtcclxuICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XHJcbiAgICBidXR0b24uaW5uZXJUZXh0ID0gJ9CX0LDQutGA0YvRgtGMJztcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHJcbiAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PntcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICBpZiAoISh0YXJnZXQgPT09IGNvbnRhaW5lciB8fCB0YXJnZXQgPT09IHRpdGxlKSkge1xyXG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgIC8vICAgbW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgIC8vIH1cclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIG1vZGFsXHJcbiAgfTtcclxuXHJcbn0pKClcclxuIiwiKGZ1bmN0aW9uKCkgeyAgICBcclxuICBjb25zdCBwcm9kdWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2NvbnRhaW5lcicpLFxyXG4gICAgICAgIHByb2R1Y3RJdGVtQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3RfX2l0ZW0nKSxcclxuICAgICAgICBidG5QcmV2aW91cyA9ICdidXR0b24ucHJvZHVjdF9fcHJldmlvdXMnLFxyXG4gICAgICAgIGJ0bk5leHQgPSAnYnV0dG9uLnByb2R1Y3RfX25leHQnLFxyXG4gICAgICAgIHByb2R1Y3RJaXRlbUFjdGl2ZSA9ICdwcm9kdWN0X19pdGVtLS1hY3RpdmUnO1xyXG4gIGxldCBpQWN0aXZlID0gMDtcclxuXHJcbiAgcHJvZHVjdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gICAgLy8g0L/RgNC10LTRi9C00YPRidC40Lkg0YHQu9Cw0LnQtFxyXG4gICAgaWYoZXZlbnQudGFyZ2V0Lm1hdGNoZXMoYnRuUHJldmlvdXMpKXtcclxuICAgICAgaWYgKHByb2R1Y3RJdGVtQWxsW2lBY3RpdmUgLSAxXSkge1xyXG4gICAgICAgIHByb2R1Y3RUb2dnbGUoaUFjdGl2ZSAtIDEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2R1Y3RUb2dnbGUocHJvZHVjdEl0ZW1BbGwubGVuZ3RoIC0gMSk7XHJcbiAgICAgIH1cclxuICAgIC8vINGB0LvQtdC00YPRjtGJ0LjQuSDRgdC70LDQudC0ICBcclxuICAgIH0gZWxzZSBpZihldmVudC50YXJnZXQubWF0Y2hlcyhidG5OZXh0KSl7XHJcbiAgICAgIGlmIChwcm9kdWN0SXRlbUFsbFtpQWN0aXZlICsgMV0pIHtcclxuICAgICAgICBwcm9kdWN0VG9nZ2xlKGlBY3RpdmUgKyAxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9kdWN0VG9nZ2xlKDApO1xyXG4gICAgICB9XHJcbiAgICB9ICBcclxuICB9KVxyXG5cclxuICBmdW5jdGlvbiBwcm9kdWN0VG9nZ2xlKGlOZXh0KSB7XHJcbiAgICBwcm9kdWN0SXRlbUFsbFtpQWN0aXZlXS5jbGFzc0xpc3QudG9nZ2xlKHByb2R1Y3RJaXRlbUFjdGl2ZSk7XHJcbiAgICBpQWN0aXZlID0gaU5leHQ7XHJcbiAgICBwcm9kdWN0SXRlbUFsbFtpQWN0aXZlXS5jbGFzc0xpc3QudG9nZ2xlKHByb2R1Y3RJaXRlbUFjdGl2ZSk7XHJcbiAgfVxyXG59KSgpIiwiKGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IHJldmlld3NXcmFwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fd3JhcGVyJyksXHJcbiAgICAgICAgZmVlZGJhY2tBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmVlZGJhY2snKSxcclxuXHJcbiAgICAgICAgcmV2aWV3c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fbGlzdCcpLFxyXG4gICAgICAgIHJldmlld3NBbGwgPSByZXZpZXdzTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcucmV2aWV3c19faXRlbScpLFxyXG4gICAgICAgIHJldmlld3NBY3RpdmUgPSAncmV2aWV3c19faXRlbS0tYWN0aXZlJywgICAgICAgIFxyXG5cclxuICAgICAgICByZXZpZXdzQnV0dG9uID0gJ3Jldmlld3NfX2J1dHRvbic7XHJcblxyXG4gIGxldCBsYXN0QWN0aXZlID0gMCxcclxuICAgICAgcmV2aWV3c0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fY29udGVudCcpLmNsaWVudFdpZHRoO1xyXG5cclxuICByZXZpZXdzV3JhcGVyLnN0eWxlLndpZHRoID0gcmV2aWV3c0NvbnRlbnQgKiBmZWVkYmFja0FsbC5sZW5ndGggKyAncHgnO1xyXG5cclxuICByZXZpZXdzTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PntcclxuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlOyAvLyBidXR0b25cclxuICAgIFxyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMocmV2aWV3c0J1dHRvbikpIHtcclxuICAgICAgcmV2aWV3c1RvZ2dsZSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykgLSAxKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHJldmlld3NUb2dnbGUobmV4dEFjdGl2ZSkge1xyXG4gICAgcmV2aWV3c0FsbFtsYXN0QWN0aXZlXS5jbGFzc0xpc3QucmVtb3ZlKHJldmlld3NBY3RpdmUpO1xyXG4gICAgbGFzdEFjdGl2ZSA9IG5leHRBY3RpdmU7IC8vINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgcmV2aWV3c0FsbFtuZXh0QWN0aXZlXS5jbGFzc0xpc3QuYWRkKHJldmlld3NBY3RpdmUpO1xyXG4gICAgXHJcbiAgICByZXZpZXdzV3JhcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyAtIHJldmlld3NDb250ZW50ICogbmV4dEFjdGl2ZSArICdweCknO1xyXG4gIH07XHJcbiAgXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpPT57XHJcbiAgICByZXZpZXdzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19jb250ZW50JykuY2xpZW50V2lkdGgsXHJcbiAgICBcclxuICAgIHJldmlld3NXcmFwZXIuc3R5bGUud2lkdGggPSByZXZpZXdzQ29udGVudCAqIGZlZWRiYWNrQWxsLmxlbmd0aCArICdweCc7XHJcbiAgICByZXZpZXdzV3JhcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyAtIHJldmlld3NDb250ZW50ICogbGFzdEFjdGl2ZSArICdweCknO1xyXG4gIH0pO1xyXG4gICAgXHJcbn0pKCkiLCIoZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgdGVhbVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZWFtX19saXN0JylcclxuICAgICAgICB0ZWFtQnV0dG9uID0gJ2EudGVhbV9fbmFtZScsXHJcbiAgICAgICAgdGVhbVRvZ2dsZUFjdGl2ZSA9ICd0ZWFtX19pdGVtLS1hY3RpdmUnO1xyXG4gIGxldCBwcmV2aW91c0NsaWNrID0gbnVsbDtcclxuXHJcbiAgdGVhbVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PnsgIFxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmKGV2ZW50LnRhcmdldC5tYXRjaGVzKHRlYW1CdXR0b24pKSB7XHJcbiAgICAgIC8vINC10YHQu9C4IHRydWUsINGC0L4g0L3QsNC20LDRgtC40LUg0L/RgNC+0LjQt9C+0YjQu9C+INC/0L4g0LDQutGC0LjQstC90L7QvNGDINGN0LvQtdC80LXQvdGC0YNcclxuICAgICAgaWYgKGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRlYW1Ub2dnbGVBY3RpdmUpKSB7XHJcbiAgICAgICAgcmVtb3ZlVG9nZ2xlKGV2ZW50LnRhcmdldCkgICAgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDRg9Cx0LjRgNCw0LXQvCDRgdGC0LjQu9C4INGBINC/0YDQtdC00YvQtNGD0YnQtdCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcclxuICAgICAgICBpZiAocHJldmlvdXNDbGljaykge1xyXG4gICAgICAgICAgcmVtb3ZlVG9nZ2xlKHByZXZpb3VzQ2xpY2spXHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7ICBcclxuICAgICAgICAgICAgYWRkVG9nZ2xlKGV2ZW50LnRhcmdldCkgICAgIFxyXG4gICAgICAgICAgfSwgMjkwKTtcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgYWRkVG9nZ2xlKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlVG9nZ2xlKGVsZW1lbnQpIHtcclxuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUodGVhbVRvZ2dsZUFjdGl2ZSk7ICBcclxuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnN0eWxlLmhlaWdodCA9IG51bGw7IFxyXG4gICAgcHJldmlvdXNDbGljayA9IG51bGw7IFxyXG4gIH1cclxuICBmdW5jdGlvbiBhZGRUb2dnbGUoZWxlbWVudCkge1xyXG4gICAgbGV0IGltZ0hlaWdodCA9IGVsZW1lbnQucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLm9mZnNldEhlaWdodCwgXHJcbiAgICAgICAgaW5mb0hlaWdodCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLm9mZnNldEhlaWdodCxcclxuICAgICAgICBuZXdJbWdIZWlnaHQgPSBpbWdIZWlnaHQgLSBpbmZvSGVpZ2h0O1xyXG5cclxuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUodGVhbVRvZ2dsZUFjdGl2ZSk7ICAgICAgICBcclxuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnN0eWxlLmhlaWdodCA9IG5ld0ltZ0hlaWdodCArICdweCc7XHJcbiAgICBwcmV2aW91c0NsaWNrID0gZWxlbWVudDsgXHJcbiAgfVxyXG4gICAgXHJcbn0pKCkiLCIoZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgcHJvZ3Jlc3NDb250cm9sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzX192YWx1ZScpLFxyXG4gICAgICAgIHNvdW5kQ29udHJvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb3VuZF9fdmFsdWUnKTtcclxuICBsZXQgdmlkZW8sIGludGVydmFsSWQsIHNvdW5kVmFsdWU7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHZpZGVvV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fd3JhcHBlcicpO1xyXG4gICAgXHJcbiAgICB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fcGxheWVyJyk7XHJcblxyXG4gICAgcHJvZ3Jlc3NDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpPT57XHJcbiAgICAgIC8v0L7QsdC90YPQu9GP0LXQvCDQt9C90LDRh9C10L3QuNGPLCDRh9GC0L4g0LHRiyDQv9GA0L7QuNC30LLQtdGB0YLQuCDQstGL0YfQuNGB0LvQtdC90LjRj1xyXG4gICAgICBwcm9ncmVzc0NvbnRyb2wudmFsdWUgPSAwO1xyXG4gICAgICBwcm9ncmVzc0NvbnRyb2wubWF4ID0gMTAwO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgdmlkZW9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgLy8g0LrQvdC+0L/QutC4IHBsYXlcclxuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZpZGVvX19wbGF5ZXInKSB8fFxyXG4gICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxheScpKSB7XHJcbiAgICAgICAgcGxheVN0b3AoKTsgICAgICAgIFxyXG4gICAgICB9IFxyXG4gICAgICAvLyBpbnB1dCDQv9GA0L7QtNC+0LvQttC40YLQtdC70YzQvdC+0YHRgtC4INCy0LjQtNC10L5cclxuICAgICAgZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvZ3Jlc3NfX3ZhbHVlJykpe1xyXG4gICAgICAgIHNldFByb2dyZXNzQ29udHJvbCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyDQutC90L7Qv9C60LAg0LPRgNC+0LzQutC+0YHRgtC4XHJcbiAgICAgIGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NvdW5kX19tdXRlJykpIHtcclxuICAgICAgICBzb3VuZE11dGUoKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBpbnB1dCDQs9GA0L7QvNC60L7RgdGC0Lgg0LLQuNC00LXQvlxyXG4gICAgICBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3VuZF9fdmFsdWUnKSl7XHJcbiAgICAgICAgc2V0U291bmRDb250cm9sKCkgIFxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICB9KTtcclxuICBmdW5jdGlvbiBwbGF5U3RvcCgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fcGxheScpLmNsYXNzTGlzdC50b2dnbGUoJ3ZpZGVvX19wbGF5LS1kaXNhYmxlZCcpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzX19wbGF5JykuY2xhc3NMaXN0LnRvZ2dsZSgncHJvZ3Jlc3NfX3BsYXktLWFjdGl2ZScpO1xyXG4gICAgXHJcbiAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgIGlmIChwcm9ncmVzc0NvbnRyb2wubWF4ID09PSAnJykgLy8g0LXRgdC70Lgg0LLQuNC00LXQviDQt9Cw0L/Rg9GJ0LXQvdC+INGBINC90LDRh9Cw0LvQsCBcclxuICAgICAgICBwcm9ncmVzc0NvbnRyb2wubWF4ID0gdmlkZW8uZHVyYXRpb247XHJcbiAgICBcclxuICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodXBkYXRlUHJvZ3Jlc3NDb250cm9sLCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzQ29udHJvbCgpIHtcclxuICAgIHByb2dyZXNzQ29udHJvbC52YWx1ZSA9IHZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gIH0gXHJcbiAgZnVuY3Rpb24gc2V0UHJvZ3Jlc3NDb250cm9sKCkge1xyXG4gICAgbGV0IHByb2dyZXNzID0gdmlkZW8uZHVyYXRpb247XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wubWF4ID0gdmlkZW8uZHVyYXRpb247IFxyXG5cclxuICAgIC8vIGlucHV0Lm1heCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDRgNCw0LLQtdC9IDEwMCDQv9C+0Y3RgtC+0LzRgyDQv9C+0YHQu9C1INC60LvQuNC60LAg0L/QviDQvdC10LzRgyDQvNGLINC40LzQtdC10LxcclxuICAgIC8vIG4tJSDQvtGCIDEwMCUsINGC0LXQv9C10YDRjCDQvdCw0YXQvtC00LjQvCDRjdGC0L7RgiDQttC1ICUg0LIg0L3QsNGI0LXQvCDQstC40LTQtdC+XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wudmFsdWUgPSBwcm9ncmVzcyAqIHByb2dyZXNzQ29udHJvbC52YWx1ZSAvIDEwMDtcclxuICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gcHJvZ3Jlc3NDb250cm9sLnZhbHVlO1xyXG4gICAgY29uc29sZS5sb2cocHJvZ3Jlc3NDb250cm9sLnZhbHVlKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gc291bmRNdXRlKCkge1xyXG4gICAgaWYgKHZpZGVvLnZvbHVtZSA9PT0gMCkge1xyXG4gICAgICB2aWRlby52b2x1bWUgPSBzb3VuZFZhbHVlO1xyXG4gICAgICBzb3VuZENvbnRyb2wudmFsdWUgPSBzb3VuZFZhbHVlICogMTA7ICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzb3VuZFZhbHVlID0gdmlkZW8udm9sdW1lO1xyXG4gICAgICB2aWRlby52b2x1bWUgPSAwO1xyXG4gICAgICBzb3VuZENvbnRyb2wudmFsdWUgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBzZXRTb3VuZENvbnRyb2woKSB7XHJcbiAgICB2aWRlby52b2x1bWUgPSBzb3VuZENvbnRyb2wudmFsdWUgLyAxMDtcclxuICB9XHJcbn0pKCkiXX0=
