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
    const target = event.target;
    if (target.classList.contains('pagination__link')) {
      currentActive = -target.dataset.scroll;
      scroll();      
    }
  })
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC5qcyIsIm1lbnUuanMiLCJuYXYuanMiLCJvbmVQYWdlU2Nyb2xsLmpzIiwib3JkZXIuanMiLCJwcm9kdWN0LmpzIiwicmV2aWV3cy5qcyIsInRlYW0uanMiLCJ2aWRlby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0NyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0MvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0MzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuXHR5bWFwcy5yZWFkeShpbml0KTtcclxuXHRmdW5jdGlvbiBpbml0KCkge1xyXG5cdFx0bGV0IG15TWFwID0gbmV3IHltYXBzLk1hcCgnbWFwJywge1xyXG5cdFx0XHRjZW50ZXI6IFs1NS43NDg2LCAzNy41OTg2XSxcclxuXHRcdFx0em9vbTogMTRcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IHBvaW50cyA9IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHg6IDU1Ljc1NzIsXHJcblx0XHRcdFx0eTogMzcuNjE1OCxcclxuXHRcdFx0XHRhZGRyZXNzOiAn0YPQuy4g0J7RhdC+0YLQvdGL0Lkg0YDRj9C0J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0eDogNTUuNzQ1MCxcclxuXHRcdFx0XHR5OiAzNy42MDA4LFxyXG5cdFx0XHRcdGFkZHJlc3M6ICfQk9C+0LPQvtC70LXQstGB0LrQuNC5INCx0YPQu9GM0LLQsNGAJ1xyXG5cdFx0XHR9XHJcblx0XHRdXHJcblxyXG5cdFx0cG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG5cdFx0XHRteVBsYWNlbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoW3BvaW50LngsIHBvaW50LnldLCB7XHJcblx0XHRcdFx0YmFsbG9vbkNvbnRlbnQ6IHBvaW50LmFkZHJlc3NcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuXHRcdFx0XHRpY29uSW1hZ2VIcmVmOiAnaW1nL21hcC9jaG9jY29Qb2ludC5wbmcnLFxyXG5cdFx0XHRcdGhpZGVJY29uT25CYWxsb29uT3BlbjogZmFsc2UsXHJcblx0XHRcdFx0aWNvbkltYWdlT2Zmc2V0OiBbLTE3LCAtNDBdXHJcblx0XHRcdH0pLFxyXG5cclxuXHRcdFx0XHRteU1hcC5nZW9PYmplY3RzLmFkZChteVBsYWNlbWFyayk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn0pKCkiLCIoZnVuY3Rpb24oKSB7ICAgIFxyXG4gIGNvbnN0IG1lbnVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2xpc3QnKSxcclxuICAgICAgICBtZW51SXRlbUFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWFjY29yZGlvbl9faXRlbScpLFxyXG4gICAgICAgIG1lbnVUb2dnbGVBY3RpdmUgPSAnbWVudS1hY2NvcmRpb25fX2l0ZW0tLWFjdGl2ZScsXHJcbiAgICAgICAgbWVudUJ1dHRvbiA9ICdtZW51LWFjY29yZGlvbl9fYnRuJyxcclxuICAgICAgICBtZW51QnV0dG9uU3BhbiA9ICdtZW51LWFjY29yZGlvbl9fdGl0bGUnLFxyXG4gICAgICAgIG1lbnVDbG9zZUJ1dHRvbiA9ICdtZW51LWFjY29yZGlvbl9fY2xvc2UtYnRuJztcclxuICBcclxuICBsZXQgbGFzdE1lbnVBY3RpdmUgPSBudWxsLCAvLyDRgtC10LrRg9GJ0LDRjyDQvtGC0LrRgNGL0YLQsNGPINGB0LXQutGG0LjRjyAobGkpXHJcbiAgICAgIG1lbnVBY3RpdmUgPSBmYWxzZSwgLy8gc2V0VGltZW91dCDQv9GA0Lgg0L7RgtC60YDRi9GC0LjQuCDQstGC0L7RgNC+0Lkg0YHQtdC60YbQuNC4IChsaSlcclxuICAgICAgZGVmdWx0Q29udGVudFdpZHRoID0gNTIwLCAvLyDRiNC40YDQuNC90LAg0LrQvtC90YLQtdC90YLQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG4gICAgICBicmVha1BvaW50UGhvbmUgPSA0ODAsXHJcbiAgICAgIG1lbnVXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JykuY2xpZW50V2lkdGgsIC8vINGI0LjRgNC40L3QsCDQsdC70L7QutCwINC80LXQvdGOXHJcbiAgICAgIG1lbnVUb2dnbGVXaWR0aCA9IG1lbnVJdGVtQWxsWzBdLmNsaWVudFdpZHRoLCAvLyDRiNC40YDQuNC90LAg0L7QtNC90L7QuSBsaVxyXG4gICAgICBtZW51QWxsVG9nZ2xlV2lkdGggPSBtZW51VG9nZ2xlV2lkdGggKiBtZW51SXRlbUFsbC5sZW5ndGgsIC8vINGI0LjRgNC40L3QsCDQstGB0LXRhSBsaVxyXG4gICAgICBtZW51T3BlbldpZHRoID0gZGVmdWx0Q29udGVudFdpZHRoICsgbWVudUFsbFRvZ2dsZVdpZHRoOyAvLyDRiNC40YDQuNC90LAg0L7RgtC60YDRi9GC0L7QuSDRgdC10LrRhtC40LggKyDQstGB0LXRhSBsaVxyXG4gIFxyXG4gIG1lbnVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57XHJcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQsXHJcbiAgICBtZW51SXRlbSA9ICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWFjY29yZGlvbl9fYnRuJykpID8gdGFyZ2V0LnBhcmVudE5vZGUgOiB0YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLCAvLyDRgNC+0LTQuNGC0LXQu9GMIChsaSlcclxuICAgIG1lbnVDb250ZW50ID0gbWVudUl0ZW0ucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX19jb250ZW50Jyk7IC8vIGRpdiDRgSDQutC+0L3RgtC10L3RgtC+0LxcclxuICAgIFxyXG4gICAgLy8g0LrQu9C40Log0L/QviDQutC90L7Qv9C60LUg0LjQu9C4INGB0L/QsNC90YNcclxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKG1lbnVCdXR0b24pIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMobWVudUJ1dHRvblNwYW4pKSB7XHJcbiAgICAgIC8vINC10YHQu9C4IHRydWUsINGC0L4g0L3QsNC20LDRgtC40LUg0L/RgNC+0LjQt9C+0YjQu9C+INC/0L4g0LDQutGC0LjQstC90L7QuSDRgdC10LrRhtC40LhcclxuICAgICAgaWYgKG1lbnVJdGVtLmNsYXNzTGlzdC5jb250YWlucyhtZW51VG9nZ2xlQWN0aXZlKSkge1xyXG4gICAgICAgIHJlbW92ZVRvZ2dsZShtZW51SXRlbSk7XHJcbiAgICAgICAgbWVudUFjdGl2ZSA9ICFtZW51QWN0aXZlO1xyXG4gICAgICAgIFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vINC10YHQu9C4IHRydWUsINGC0L4g0LXRgdGC0Ywg0L7RgtC60YDRi9GC0YvQuSDRjdC70LXQvNC10L3RglxyXG4gICAgICAgIGlmIChsYXN0TWVudUFjdGl2ZSkge1xyXG4gICAgICAgICAgcmVtb3ZlVG9nZ2xlKGxhc3RNZW51QWN0aXZlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDRgNCw0LfQvNC10YAg0Y3QutGA0LDQvdCwINC80LXQvdGM0YjQtSDRh9C10Lwg0YDQsNC30LzQtdGAINC+0YLQutGA0YvRgtC+0LPQviDQvNC10L3RjiDQuCDQsdC+0LvRjNGI0LUg0YfQtdC8INCx0YDQtdC60L/QvtC40L3RglxyXG4gICAgICAgIGlmIChtZW51V2lkdGggPCBtZW51T3BlbldpZHRoICYmIG1lbnVXaWR0aCA+IGJyZWFrUG9pbnRQaG9uZSkgeyAgICAgICAgXHJcbiAgICAgICAgICBtZW51Q29udGVudC5zdHlsZS53aWR0aCA9IG1lbnVXaWR0aCAtIG1lbnVBbGxUb2dnbGVXaWR0aCArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtZW51V2lkdGggPD0gYnJlYWtQb2ludFBob25lKSB7IC8vINC10YHQu9C4IHRydWUsINGC0L4g0LrQvtC90YLQtdC90YIg0LLQviDQstGB0Y4g0YjQuNGA0LjQvdGDINGA0L7QtNC40YLQtdC70Y9cclxuICAgICAgICAgIG1lbnVUb2dnbGVXaWR0aCA9IG1lbnVJdGVtQWxsWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9faW1nJykuY2xpZW50V2lkdGg7IFxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW51SXRlbUFsbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobWVudUl0ZW1BbGxbaV0gPT09IG1lbnVJdGVtKSB7IC8vINC90LDQttCw0YLQsNGPKNCw0LrRgtC40LLQvdCw0Y8pIGxpXHJcbiAgICAgICAgICAgICAgbWVudUl0ZW1BbGxbaV0ucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX19jb250ZW50Jykuc3R5bGUud2lkdGggPSBtZW51V2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG1lbnVJdGVtQWxsW2ldLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fdGl0bGUnKS5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICBtZW51SXRlbUFsbFtpXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2ltZycpLnN0eWxlLndpZHRoID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INC10YHRgtGMINC+0YLQutGA0YvRgtGL0Lkg0Y3Qu9C10LzQtdC90YIuINCd0L7QstC+0LUg0L7RgtC60YDRi9Cy0LDQtdC8INC/0L7RgdC70LUg0LfQsNC60YDRi9GC0LjRjyDQv9GA0LXQtNGL0LTRg9GJ0LXQs9C+XHJcbiAgICAgICAgaWYgKG1lbnVBY3RpdmUpe1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtLmNsYXNzTGlzdC5hZGQobWVudVRvZ2dsZUFjdGl2ZSk7XHJcbiAgICAgICAgICB9LCAyNTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtZW51SXRlbS5jbGFzc0xpc3QuYWRkKG1lbnVUb2dnbGVBY3RpdmUpXHJcbiAgICAgICAgICBtZW51QWN0aXZlID0gIW1lbnVBY3RpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RNZW51QWN0aXZlID0gbWVudUl0ZW07XHJcbiAgICAgICAgXHJcbiAgICAgIH0gIFxyXG4gICAgICAvLyDQutC70LjQuiDQv9C+INC60YDQtdGB0YLQuNC60YMg0LIg0LrQvtC90YLQtdC90YLQtVxyXG4gICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMobWVudUNsb3NlQnV0dG9uKSl7XHJcbiAgICAgIHJlbW92ZVRvZ2dsZSh0YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlKTtcclxuICAgICAgbWVudUFjdGl2ZSA9ICFtZW51QWN0aXZlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gIGZ1bmN0aW9uIHJlbW92ZVRvZ2dsZShsaSkge1xyXG4gICAgbGkuY2xhc3NMaXN0LnJlbW92ZShtZW51VG9nZ2xlQWN0aXZlKTsgLy8gKGxpKVxyXG4gICAgbGkucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX19jb250ZW50Jykuc3R5bGUud2lkdGggPSBudWxsOyAvLyBkaXYg0YEg0LrQvtC90YLQtdC90YLQvtC8XHJcbiAgICBsYXN0TWVudUFjdGl2ZSA9IG51bGw7ICAgIFxyXG4gICAgaWYgKG1lbnVXaWR0aCA8PSBicmVha1BvaW50UGhvbmUpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW51SXRlbUFsbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgbWVudUl0ZW1BbGxbaV0ucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX190aXRsZScpLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgbWVudUl0ZW1BbGxbaV0ucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX19pbWcnKS5zdHlsZS53aWR0aCA9IG1lbnVUb2dnbGVXaWR0aCArICdweCc7ICAgICAgICBcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICB9ICAgICAgXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKT0+e1xyXG4gICAgbWVudVdpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKS5jbGllbnRXaWR0aCwgLy8g0YjQuNGA0LjQvdCwINCx0LvQvtC60LAg0LzQtdC90Y5cclxuICAgIG1lbnVBbGxUb2dnbGVXaWR0aCA9IG1lbnVJdGVtQWxsWzBdLmNsaWVudFdpZHRoICogbWVudUl0ZW1BbGwubGVuZ3RoLCAvLyDRiNC40YDQuNC90LAg0LLRgdC10YUgbGlcclxuICAgIG1lbnVPcGVuV2lkdGggPSBkZWZ1bHRDb250ZW50V2lkdGggKyBtZW51QWxsVG9nZ2xlV2lkdGg7IC8vINGI0LjRgNC40L3QsCDQvtGC0LrRgNGL0YLQvtC5INGB0LXQutGG0LjQuCArINCy0YHQtdGFIGxpXHJcbiAgfSk7XHJcbn0pKClcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuY29uc3QgaGVhZGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2JyksXHJcbiAgICAgIG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKSxcclxuICAgICAgbmF2TGluayA9ICdhLm5hdl9fbGluaydcclxuICAgICAgbmF2QWN0aXZlID0gJ25hdi0tYWN0aXZlJyxcclxuICAgICAgYnRuSGFtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9faGFtYnVyZ2VyJyksXHJcbiAgICAgIGJ0bkhhbWJ1cmdlck1hdGNoZXMgPSAnYnV0dG9uLmhlYWRlcl9faGFtYnVyZ2VyJyxcclxuICAgICAgYnRuSGFtYnVyZ2VyQ2xvc2UgPSAnYnRuLWhhbWJ1cmdlci0tY2xvc2UnLFxyXG4gICAgICBub1Njcm9sbCA9ICduby1zY3JvbGwnO1xyXG5cclxuaGVhZGVyTmF2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcbiAgaWYgKGV2ZW50LnRhcmdldC5tYXRjaGVzKGJ0bkhhbWJ1cmdlck1hdGNoZXMpKSBuYXZUb2dnbGUoKTtcclxuICBlbHNlIGlmIChuYXYuY2xhc3NMaXN0LmNvbnRhaW5zKG5hdkFjdGl2ZSkgJiYgZXZlbnQudGFyZ2V0Lm1hdGNoZXMobmF2TGluaykpIG5hdlRvZ2dsZSgpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIG5hdlRvZ2dsZSgpIHtcclxuICBuYXYuY2xhc3NMaXN0LnRvZ2dsZShuYXZBY3RpdmUpO1xyXG4gIGJ0bkhhbWJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKGJ0bkhhbWJ1cmdlckNsb3NlKTtcclxuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUobm9TY3JvbGwpO1xyXG59XHJcblxyXG59KSgpIiwiKGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBzZWN0aW9uQ291bnQgPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlY3Rpb24nKS5sZW5ndGggLSAxKSAqIC0xLCAvLyDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINC+0L/RgNC10LTQtdC70LXQvdC40Y8g0LrQvtC90YbQsCDRgdGC0YDQsNC90LjRhtGLLiAtMSDQv9C+0YLQvtC80YMg0YfRgtC+INC90LAg0L/QtdGA0LLQvtC5INGB0YLRgNCw0L3QuNGG0LUgdHJhbnNmb3JtINC90LUg0L/RgNC40LzQtdC90Y/QtdGC0YHRjy4g0YPQvNC90L7QttCw0LXQvCDQvdCwIC0xKNC/0L7Qu9GD0YfQsNC10Lwg0L7RgtGA0LjRhtCw0YLQtdC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSksINGH0YLQviDQsdGLINCyINC00LDQu9GM0L3QtdC50YjQtdC8INGB0YDQsNCy0L3QuNCy0LDRgtGMINC60L7Qu9C40YfQtdGB0YLQstC+INGB0LXQutGG0LjQuSDRgSDQvdC+0LzQtdGA0L7QvCDRgtC10LrRg9GJ0LXQuSDRgdC10LrRhtC40LhcclxuICAgICAgICBwYWdpbmF0aW9uTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uX19saXN0JyksXHJcbiAgICAgICAgcGFnaW5hdGlvbkFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdpbmF0aW9uX19pdGVtJyksXHJcbiAgICAgICAgcGFnaW5hdGlvbkFjdGl2ZSA9ICdwYWdpbmF0aW9uX19pdGVtLS1hY3RpdmUnO1xyXG4gIGxldCBjdXJyZW50QWN0aXZlID0gMCwgLy8g0L3QvtC80LXRgCDRgtC10LrRg9GJ0LXQuSDRgdC10LrRhtC40LhcclxuICAgICAgbGFzdEFjdGl2ZSA9IDAsIC8vINC/0L7RgdC70LXQtNC90Y/RjyDQsNC60YLQuNCy0L3QsNGPINGB0LXQutGG0LjRjyAo0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDRgtC+0LPQviwg0YfRgtC+INCx0Ysg0YPQsdGA0LDRgtGMINCw0LrRgtC40LLQvdGL0Lkg0LrQu9Cw0YHRgSDRgSDQv9Cw0LPQuNC90LDRhtC40LgpXHJcbiAgICAgIGlzU2Nyb2xsID0gZmFsc2U7XHJcblxyXG4gIGZ1bmN0aW9uIG1vdmVTY3JvbGwoZGlyZWN0aW9uKSB7XHJcbiAgICBpZihpc1Njcm9sbCkgcmV0dXJuXHJcbiAgIFxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nKSB7XHJcbiAgICAgIGN1cnJlbnRBY3RpdmUtLTtcclxuICAgICAgc2Nyb2xsKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjdXJyZW50QWN0aXZlKys7XHJcbiAgICAgIHNjcm9sbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBzY3JvbGwoKSB7XHJcbiAgICAvL9C/0YDQvtCy0LXRgNGP0LXQvCDQvdGD0LbQvdC+INC70Lgg0LLRi9C/0L7Qu9C90Y/RgtGMINGB0LrRgNC+0LvQu1xyXG4gICAgaWYoY3VycmVudEFjdGl2ZSA8IHNlY3Rpb25Db3VudCkgcmV0dXJuIGN1cnJlbnRBY3RpdmUgPSBzZWN0aW9uQ291bnQ7IC8vINC60L7QvdC10YYg0YHRgtGA0LDQvdC40YbRi1xyXG4gICAgaWYoY3VycmVudEFjdGl2ZSA+IDApIHJldHVybiBjdXJyZW50QWN0aXZlID0gMDsgLy8g0L3QsNGH0LDQu9C+INGB0YLRgNCw0L3QuNGG0YtcclxuXHJcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcclxuICAgIG1haW4uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtjdXJyZW50QWN0aXZlICogMTAwfSUpYDtcclxuICAgIFxyXG4gICAgaXNTY3JvbGwgPSAhaXNTY3JvbGw7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgcGFnaW5hdGlvbkFsbFtsYXN0QWN0aXZlXS5jbGFzc0xpc3QudG9nZ2xlKHBhZ2luYXRpb25BY3RpdmUpOyAvLyDRg9C00LDQu9GP0LXQvCDQutC70LDRgdGBXHJcbiAgICAgIGxhc3RBY3RpdmUgPSBjdXJyZW50QWN0aXZlICogLTE7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L7QsdC90L7QstC70Y/QtdC8INC30L3QsNGH0LXQvdC40LVcclxuICAgICAgcGFnaW5hdGlvbkFsbFtsYXN0QWN0aXZlXS5jbGFzc0xpc3QudG9nZ2xlKHBhZ2luYXRpb25BY3RpdmUpOyAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0LrQu9Cw0YHRgVxyXG5cclxuICAgICAgaXNTY3JvbGwgPSAhaXNTY3JvbGw7XHJcbiAgICB9LCA2NTApO1xyXG4gIH1cclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZXZlbnQpID0+e1xyXG4gICAgY29uc3QgZGVsdGEgPSBldmVudC5kZWx0YVksXHJcbiAgICAgICAgICBzY3JvbGwgPSAoZGVsdGEgPiAwKSA/ICdkb3duJyA6ICd1cCc7XHJcbiAgICBpZiAoZXZlbnQucGF0aFswXS5tYXRjaGVzKCd5bWFwcycpKSByZXR1cm5cclxuICAgIG1vdmVTY3JvbGwoc2Nyb2xsKTsgICAgXHJcbiAgfSk7XHJcbiAgcGFnaW5hdGlvbkxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYWdpbmF0aW9uX19saW5rJykpIHtcclxuICAgICAgY3VycmVudEFjdGl2ZSA9IC10YXJnZXQuZGF0YXNldC5zY3JvbGw7XHJcbiAgICAgIHNjcm9sbCgpOyAgICAgIFxyXG4gICAgfVxyXG4gIH0pXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDQwKSB7XHJcbiAgICAgIG1vdmVTY3JvbGwoJ2Rvd24nKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzgpIHtcclxuICAgICAgbW92ZVNjcm9sbCgndXAnKTtcclxuICAgIH1cclxuICB9KVxyXG59KSgpIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgXHJcbiAgY29uc3Qgb3JkZXJGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9yZGVyLWZvcm0nKSxcclxuICAgICAgICBvcmRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlci1mb3JtX19zdWJtaXQnKTtcclxuXHJcbiAgb3JkZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgaWYgKHZhbGlkYXRlRm9ybShvcmRlckZvcm0pKSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgbmFtZTogb3JkZXJGb3JtLmVsZW1lbnRzLm5hbWUudmFsdWUsXHJcbiAgICAgICAgcGhvbmU6IG9yZGVyRm9ybS5lbGVtZW50cy5waG9uZS52YWx1ZSxcclxuICAgICAgICAvLyBzdHJlZXQ6IG9yZGVyRm9ybS5lbGVtZW50cy5zdHJlZXQudmFsdWUsXHJcbiAgICAgICAgLy8gaG91c2U6IG9yZGVyRm9ybS5lbGVtZW50cy5ob3VzZS52YWx1ZSxcclxuICAgICAgICAvLyBib2R5OiBvcmRlckZvcm0uZWxlbWVudHMuYm9keS52YWx1ZSxcclxuICAgICAgICAvLyBmbGF0OiBvcmRlckZvcm0uZWxlbWVudHMuZmxhdC52YWx1ZSxcclxuICAgICAgICAvLyBmbG9vcjogb3JkZXJGb3JtLmVsZW1lbnRzLmZsb29yLnZhbHVlLFxyXG4gICAgICAgIGNvbW1lbnQ6IG9yZGVyRm9ybS5lbGVtZW50cy5jb21tZW50LnZhbHVlLFxyXG4gICAgICAgIGVtYWlsOiAnZW1haWxAdGVzdCdcclxuICAgICAgfTtcclxuICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIGRhdGEubmFtZSk7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGhvbmUnLCBkYXRhLnBob25lKTtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdjb21tZW50JywgZGF0YS5jb21tZW50KTtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdlbWFpbCcsIGRhdGEuZW1haWwpO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XHJcbiAgICAgIHhoci5vcGVuKCdQT1NUJywgJ2h0dHBzOi8vd2ViZGV2LWFwaS5sb2Z0c2Nob29sLmNvbS9zZW5kbWFpbC9mYWlsJyk7XHJcbiAgICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcclxuICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKT0+IHtcclxuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlLnN0YXR1cykge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVNb2RhbCh4aHIucmVzcG9uc2UubWVzc2FnZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZU1vZGFsKHhoci5yZXNwb25zZS5tZXNzYWdlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICB9KVxyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGVGb3JtKGZvcm0pIHtcclxuICAgIGxldCB2YWxpZCA9IHRydWU7XHJcblxyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLm5hbWUuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5waG9uZS5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLnN0cmVldC5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLmhvdXNlLmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMuYm9keS5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLmZsYXQuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5mbG9vci5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLmNvbW1lbnQuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuXHJcbiAgICByZXR1cm4gdmFsaWRcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVNb2RhbChjb250ZW50KSB7XHJcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbF9fY29udGFpbmVyJyk7XHJcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgICBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsX190aXRsZScpO1xyXG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gY29udGVudDtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdtb2RhbF9fYnV0dG9uJyk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJyk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuLS1jb2xvci0tZ3JlZW4nKTtcclxuICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XHJcbiAgICBidXR0b24uaW5uZXJUZXh0ID0gJ9CX0LDQutGA0YvRgtGMJztcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHJcbiAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PntcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICBpZiAoISh0YXJnZXQgPT09IGNvbnRhaW5lciB8fCB0YXJnZXQgPT09IHRpdGxlKSkge1xyXG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgIC8vICAgbW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgIC8vIH1cclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIG1vZGFsXHJcbiAgfTtcclxuXHJcbn0pKClcclxuIiwiKGZ1bmN0aW9uKCkgeyAgICBcclxuICBjb25zdCBwcm9kdWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2NvbnRhaW5lcicpLFxyXG4gICAgICAgIHByb2R1Y3RJdGVtQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3RfX2l0ZW0nKSxcclxuICAgICAgICBidG5QcmV2aW91cyA9ICdidXR0b24ucHJvZHVjdF9fcHJldmlvdXMnLFxyXG4gICAgICAgIGJ0bk5leHQgPSAnYnV0dG9uLnByb2R1Y3RfX25leHQnLFxyXG4gICAgICAgIHByb2R1Y3RJaXRlbUFjdGl2ZSA9ICdwcm9kdWN0X19pdGVtLS1hY3RpdmUnO1xyXG4gIGxldCBpQWN0aXZlID0gMDtcclxuXHJcbiAgcHJvZHVjdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gICAgLy8g0L/RgNC10LTRi9C00YPRidC40Lkg0YHQu9Cw0LnQtFxyXG4gICAgaWYoZXZlbnQudGFyZ2V0Lm1hdGNoZXMoYnRuUHJldmlvdXMpKXtcclxuICAgICAgaWYgKHByb2R1Y3RJdGVtQWxsW2lBY3RpdmUgLSAxXSkge1xyXG4gICAgICAgIHByb2R1Y3RUb2dnbGUoaUFjdGl2ZSAtIDEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2R1Y3RUb2dnbGUocHJvZHVjdEl0ZW1BbGwubGVuZ3RoIC0gMSk7XHJcbiAgICAgIH1cclxuICAgIC8vINGB0LvQtdC00YPRjtGJ0LjQuSDRgdC70LDQudC0ICBcclxuICAgIH0gZWxzZSBpZihldmVudC50YXJnZXQubWF0Y2hlcyhidG5OZXh0KSl7XHJcbiAgICAgIGlmIChwcm9kdWN0SXRlbUFsbFtpQWN0aXZlICsgMV0pIHtcclxuICAgICAgICBwcm9kdWN0VG9nZ2xlKGlBY3RpdmUgKyAxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9kdWN0VG9nZ2xlKDApO1xyXG4gICAgICB9XHJcbiAgICB9ICBcclxuICB9KVxyXG5cclxuICBmdW5jdGlvbiBwcm9kdWN0VG9nZ2xlKGlOZXh0KSB7XHJcbiAgICBwcm9kdWN0SXRlbUFsbFtpQWN0aXZlXS5jbGFzc0xpc3QudG9nZ2xlKHByb2R1Y3RJaXRlbUFjdGl2ZSk7XHJcbiAgICBpQWN0aXZlID0gaU5leHQ7XHJcbiAgICBwcm9kdWN0SXRlbUFsbFtpQWN0aXZlXS5jbGFzc0xpc3QudG9nZ2xlKHByb2R1Y3RJaXRlbUFjdGl2ZSk7XHJcbiAgfVxyXG59KSgpIiwiKGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IHJldmlld3NXcmFwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fd3JhcGVyJyksXHJcbiAgICAgICAgZmVlZGJhY2tBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmVlZGJhY2snKSxcclxuXHJcbiAgICAgICAgcmV2aWV3c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fbGlzdCcpLFxyXG4gICAgICAgIHJldmlld3NBbGwgPSByZXZpZXdzTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcucmV2aWV3c19faXRlbScpLFxyXG4gICAgICAgIHJldmlld3NBY3RpdmUgPSAncmV2aWV3c19faXRlbS0tYWN0aXZlJywgICAgICAgIFxyXG5cclxuICAgICAgICByZXZpZXdzQnV0dG9uID0gJ3Jldmlld3NfX2J1dHRvbic7XHJcblxyXG4gIGxldCBsYXN0QWN0aXZlID0gMCxcclxuICAgICAgcmV2aWV3c0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fY29udGVudCcpLmNsaWVudFdpZHRoO1xyXG5cclxuICByZXZpZXdzV3JhcGVyLnN0eWxlLndpZHRoID0gcmV2aWV3c0NvbnRlbnQgKiBmZWVkYmFja0FsbC5sZW5ndGggKyAncHgnO1xyXG5cclxuICByZXZpZXdzTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PntcclxuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlOyAvLyBidXR0b25cclxuICAgIFxyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMocmV2aWV3c0J1dHRvbikpIHtcclxuICAgICAgcmV2aWV3c1RvZ2dsZSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykgLSAxKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHJldmlld3NUb2dnbGUobmV4dEFjdGl2ZSkge1xyXG4gICAgcmV2aWV3c0FsbFtsYXN0QWN0aXZlXS5jbGFzc0xpc3QucmVtb3ZlKHJldmlld3NBY3RpdmUpO1xyXG4gICAgbGFzdEFjdGl2ZSA9IG5leHRBY3RpdmU7IC8vINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgcmV2aWV3c0FsbFtuZXh0QWN0aXZlXS5jbGFzc0xpc3QuYWRkKHJldmlld3NBY3RpdmUpO1xyXG4gICAgXHJcbiAgICByZXZpZXdzV3JhcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyAtIHJldmlld3NDb250ZW50ICogbmV4dEFjdGl2ZSArICdweCknO1xyXG4gIH07XHJcbiAgXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpPT57XHJcbiAgICByZXZpZXdzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19jb250ZW50JykuY2xpZW50V2lkdGgsXHJcbiAgICBcclxuICAgIHJldmlld3NXcmFwZXIuc3R5bGUud2lkdGggPSByZXZpZXdzQ29udGVudCAqIGZlZWRiYWNrQWxsLmxlbmd0aCArICdweCc7XHJcbiAgICByZXZpZXdzV3JhcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyAtIHJldmlld3NDb250ZW50ICogbGFzdEFjdGl2ZSArICdweCknO1xyXG4gIH0pO1xyXG4gICAgXHJcbn0pKCkiLCIoZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgdGVhbVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZWFtX19saXN0JylcclxuICAgICAgICB0ZWFtQnV0dG9uID0gJ2EudGVhbV9fbmFtZScsXHJcbiAgICAgICAgdGVhbVRvZ2dsZUFjdGl2ZSA9ICd0ZWFtX19pdGVtLS1hY3RpdmUnO1xyXG4gIGxldCBwcmV2aW91c0NsaWNrID0gbnVsbDtcclxuXHJcbiAgdGVhbVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PnsgIFxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmKGV2ZW50LnRhcmdldC5tYXRjaGVzKHRlYW1CdXR0b24pKSB7XHJcbiAgICAgIC8vINC10YHQu9C4IHRydWUsINGC0L4g0L3QsNC20LDRgtC40LUg0L/RgNC+0LjQt9C+0YjQu9C+INC/0L4g0LDQutGC0LjQstC90L7QvNGDINGN0LvQtdC80LXQvdGC0YNcclxuICAgICAgaWYgKGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRlYW1Ub2dnbGVBY3RpdmUpKSB7XHJcbiAgICAgICAgcmVtb3ZlVG9nZ2xlKGV2ZW50LnRhcmdldCkgICAgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDRg9Cx0LjRgNCw0LXQvCDRgdGC0LjQu9C4INGBINC/0YDQtdC00YvQtNGD0YnQtdCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcclxuICAgICAgICBpZiAocHJldmlvdXNDbGljaykge1xyXG4gICAgICAgICAgcmVtb3ZlVG9nZ2xlKHByZXZpb3VzQ2xpY2spXHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7ICBcclxuICAgICAgICAgICAgYWRkVG9nZ2xlKGV2ZW50LnRhcmdldCkgICAgIFxyXG4gICAgICAgICAgfSwgMjkwKTtcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgYWRkVG9nZ2xlKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlVG9nZ2xlKGVsZW1lbnQpIHtcclxuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUodGVhbVRvZ2dsZUFjdGl2ZSk7ICBcclxuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnN0eWxlLmhlaWdodCA9IG51bGw7IFxyXG4gICAgcHJldmlvdXNDbGljayA9IG51bGw7IFxyXG4gIH1cclxuICBmdW5jdGlvbiBhZGRUb2dnbGUoZWxlbWVudCkge1xyXG4gICAgbGV0IGltZ0hlaWdodCA9IGVsZW1lbnQucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLm9mZnNldEhlaWdodCwgXHJcbiAgICAgICAgaW5mb0hlaWdodCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLm9mZnNldEhlaWdodCxcclxuICAgICAgICBuZXdJbWdIZWlnaHQgPSBpbWdIZWlnaHQgLSBpbmZvSGVpZ2h0O1xyXG5cclxuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUodGVhbVRvZ2dsZUFjdGl2ZSk7ICAgICAgICBcclxuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnN0eWxlLmhlaWdodCA9IG5ld0ltZ0hlaWdodCArICdweCc7XHJcbiAgICBwcmV2aW91c0NsaWNrID0gZWxlbWVudDsgXHJcbiAgfVxyXG4gICAgXHJcbn0pKCkiLCIoZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgcHJvZ3Jlc3NDb250cm9sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzX192YWx1ZScpLFxyXG4gICAgICAgIHNvdW5kQ29udHJvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb3VuZF9fdmFsdWUnKTtcclxuICBsZXQgdmlkZW8sIGludGVydmFsSWQsIHNvdW5kVmFsdWU7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHZpZGVvV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fd3JhcHBlcicpO1xyXG4gICAgXHJcbiAgICB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fcGxheWVyJyk7XHJcblxyXG4gICAgcHJvZ3Jlc3NDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpPT57XHJcbiAgICAgIC8v0L7QsdC90YPQu9GP0LXQvCDQt9C90LDRh9C10L3QuNGPLCDRh9GC0L4g0LHRiyDQv9GA0L7QuNC30LLQtdGB0YLQuCDQstGL0YfQuNGB0LvQtdC90LjRj1xyXG4gICAgICBwcm9ncmVzc0NvbnRyb2wudmFsdWUgPSAwO1xyXG4gICAgICBwcm9ncmVzc0NvbnRyb2wubWF4ID0gMTAwO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgdmlkZW9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgLy8g0LrQvdC+0L/QutC4IHBsYXlcclxuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZpZGVvX19wbGF5ZXInKSB8fFxyXG4gICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxheScpKSB7XHJcbiAgICAgICAgcGxheVN0b3AoKTsgICAgICAgIFxyXG4gICAgICB9IFxyXG4gICAgICAvLyBpbnB1dCDQv9GA0L7QtNC+0LvQttC40YLQtdC70YzQvdC+0YHRgtC4INCy0LjQtNC10L5cclxuICAgICAgZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvZ3Jlc3NfX3ZhbHVlJykpe1xyXG4gICAgICAgIHNldFByb2dyZXNzQ29udHJvbCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyDQutC90L7Qv9C60LAg0LPRgNC+0LzQutC+0YHRgtC4XHJcbiAgICAgIGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NvdW5kX19tdXRlJykpIHtcclxuICAgICAgICBzb3VuZE11dGUoKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBpbnB1dCDQs9GA0L7QvNC60L7RgdGC0Lgg0LLQuNC00LXQvlxyXG4gICAgICBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3VuZF9fdmFsdWUnKSl7XHJcbiAgICAgICAgc2V0U291bmRDb250cm9sKCkgIFxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICB9KTtcclxuICBmdW5jdGlvbiBwbGF5U3RvcCgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fcGxheScpLmNsYXNzTGlzdC50b2dnbGUoJ3ZpZGVvX19wbGF5LS1kaXNhYmxlZCcpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzX19wbGF5JykuY2xhc3NMaXN0LnRvZ2dsZSgncHJvZ3Jlc3NfX3BsYXktLWFjdGl2ZScpO1xyXG4gICAgXHJcbiAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgIGlmIChwcm9ncmVzc0NvbnRyb2wubWF4ID09PSAnJykgLy8g0LXRgdC70Lgg0LLQuNC00LXQviDQt9Cw0L/Rg9GJ0LXQvdC+INGBINC90LDRh9Cw0LvQsCBcclxuICAgICAgICBwcm9ncmVzc0NvbnRyb2wubWF4ID0gdmlkZW8uZHVyYXRpb247XHJcbiAgICBcclxuICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodXBkYXRlUHJvZ3Jlc3NDb250cm9sLCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzQ29udHJvbCgpIHtcclxuICAgIHByb2dyZXNzQ29udHJvbC52YWx1ZSA9IHZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gIH0gXHJcbiAgZnVuY3Rpb24gc2V0UHJvZ3Jlc3NDb250cm9sKCkge1xyXG4gICAgbGV0IHByb2dyZXNzID0gdmlkZW8uZHVyYXRpb247XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wubWF4ID0gdmlkZW8uZHVyYXRpb247IFxyXG5cclxuICAgIC8vIGlucHV0Lm1heCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDRgNCw0LLQtdC9IDEwMCDQv9C+0Y3RgtC+0LzRgyDQv9C+0YHQu9C1INC60LvQuNC60LAg0L/QviDQvdC10LzRgyDQvNGLINC40LzQtdC10LxcclxuICAgIC8vIG4tJSDQvtGCIDEwMCUsINGC0LXQv9C10YDRjCDQvdCw0YXQvtC00LjQvCDRjdGC0L7RgiDQttC1ICUg0LIg0L3QsNGI0LXQvCDQstC40LTQtdC+XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wudmFsdWUgPSBwcm9ncmVzcyAqIHByb2dyZXNzQ29udHJvbC52YWx1ZSAvIDEwMDtcclxuICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gcHJvZ3Jlc3NDb250cm9sLnZhbHVlO1xyXG4gICAgY29uc29sZS5sb2cocHJvZ3Jlc3NDb250cm9sLnZhbHVlKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gc291bmRNdXRlKCkge1xyXG4gICAgaWYgKHZpZGVvLnZvbHVtZSA9PT0gMCkge1xyXG4gICAgICB2aWRlby52b2x1bWUgPSBzb3VuZFZhbHVlO1xyXG4gICAgICBzb3VuZENvbnRyb2wudmFsdWUgPSBzb3VuZFZhbHVlICogMTA7ICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzb3VuZFZhbHVlID0gdmlkZW8udm9sdW1lO1xyXG4gICAgICB2aWRlby52b2x1bWUgPSAwO1xyXG4gICAgICBzb3VuZENvbnRyb2wudmFsdWUgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBzZXRTb3VuZENvbnRyb2woKSB7XHJcbiAgICB2aWRlby52b2x1bWUgPSBzb3VuZENvbnRyb2wudmFsdWUgLyAxMDtcclxuICB9XHJcbn0pKCkiXX0=
