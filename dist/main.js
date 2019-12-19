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
    
})()
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC5qcyIsIm1lbnUuanMiLCJuYXYuanMiLCJvbmVQYWdlU2Nyb2xsLmpzIiwib3JkZXIuanMiLCJwcm9kdWN0LmpzIiwicmV2aWV3cy5qcyIsInRlYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG5cdHltYXBzLnJlYWR5KGluaXQpO1xyXG5cdGZ1bmN0aW9uIGluaXQoKSB7XHJcblx0XHRsZXQgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKCdtYXAnLCB7XHJcblx0XHRcdGNlbnRlcjogWzU1Ljc0ODYsIDM3LjU5ODZdLFxyXG5cdFx0XHR6b29tOiAxNFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3QgcG9pbnRzID0gW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0eDogNTUuNzU3MixcclxuXHRcdFx0XHR5OiAzNy42MTU4LFxyXG5cdFx0XHRcdGFkZHJlc3M6ICfRg9C7LiDQntGF0L7RgtC90YvQuSDRgNGP0LQnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHR4OiA1NS43NDUwLFxyXG5cdFx0XHRcdHk6IDM3LjYwMDgsXHJcblx0XHRcdFx0YWRkcmVzczogJ9CT0L7Qs9C+0LvQtdCy0YHQutC40Lkg0LHRg9C70YzQstCw0YAnXHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHJcblx0XHRwb2ludHMuZm9yRWFjaChwb2ludCA9PiB7XHJcblx0XHRcdG15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbcG9pbnQueCwgcG9pbnQueV0sIHtcclxuXHRcdFx0XHRiYWxsb29uQ29udGVudDogcG9pbnQuYWRkcmVzc1xyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0aWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG5cdFx0XHRcdGljb25JbWFnZUhyZWY6ICdpbWcvbWFwL2Nob2Njb1BvaW50LnBuZycsXHJcblx0XHRcdFx0aGlkZUljb25PbkJhbGxvb25PcGVuOiBmYWxzZSxcclxuXHRcdFx0XHRpY29uSW1hZ2VPZmZzZXQ6IFstMTcsIC00MF1cclxuXHRcdFx0fSksXHJcblxyXG5cdFx0XHRcdG15TWFwLmdlb09iamVjdHMuYWRkKG15UGxhY2VtYXJrKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSkoKSIsIihmdW5jdGlvbigpIHsgICAgXHJcbiAgY29uc3QgbWVudVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fbGlzdCcpLFxyXG4gICAgICAgIG1lbnVJdGVtQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtYWNjb3JkaW9uX19pdGVtJyksXHJcbiAgICAgICAgbWVudVRvZ2dsZUFjdGl2ZSA9ICdtZW51LWFjY29yZGlvbl9faXRlbS0tYWN0aXZlJyxcclxuICAgICAgICBtZW51QnV0dG9uID0gJ21lbnUtYWNjb3JkaW9uX19idG4nLFxyXG4gICAgICAgIG1lbnVCdXR0b25TcGFuID0gJ21lbnUtYWNjb3JkaW9uX190aXRsZScsXHJcbiAgICAgICAgbWVudUNsb3NlQnV0dG9uID0gJ21lbnUtYWNjb3JkaW9uX19jbG9zZS1idG4nO1xyXG4gIFxyXG4gIGxldCBsYXN0TWVudUFjdGl2ZSA9IG51bGwsIC8vINGC0LXQutGD0YnQsNGPINC+0YLQutGA0YvRgtCw0Y8g0YHQtdC60YbQuNGPIChsaSlcclxuICAgICAgbWVudUFjdGl2ZSA9IGZhbHNlLCAvLyBzZXRUaW1lb3V0INC/0YDQuCDQvtGC0LrRgNGL0YLQuNC4INCy0YLQvtGA0L7QuSDRgdC10LrRhtC40LggKGxpKVxyXG4gICAgICBkZWZ1bHRDb250ZW50V2lkdGggPSA1MjAsIC8vINGI0LjRgNC40L3QsCDQutC+0L3RgtC10L3RgtCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXHJcbiAgICAgIGJyZWFrUG9pbnRQaG9uZSA9IDQ4MCxcclxuICAgICAgbWVudVdpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKS5jbGllbnRXaWR0aCwgLy8g0YjQuNGA0LjQvdCwINCx0LvQvtC60LAg0LzQtdC90Y5cclxuICAgICAgbWVudVRvZ2dsZVdpZHRoID0gbWVudUl0ZW1BbGxbMF0uY2xpZW50V2lkdGgsIC8vINGI0LjRgNC40L3QsCDQvtC00L3QvtC5IGxpXHJcbiAgICAgIG1lbnVBbGxUb2dnbGVXaWR0aCA9IG1lbnVUb2dnbGVXaWR0aCAqIG1lbnVJdGVtQWxsLmxlbmd0aCwgLy8g0YjQuNGA0LjQvdCwINCy0YHQtdGFIGxpXHJcbiAgICAgIG1lbnVPcGVuV2lkdGggPSBkZWZ1bHRDb250ZW50V2lkdGggKyBtZW51QWxsVG9nZ2xlV2lkdGg7IC8vINGI0LjRgNC40L3QsCDQvtGC0LrRgNGL0YLQvtC5INGB0LXQutGG0LjQuCArINCy0YHQtdGFIGxpXHJcbiAgXHJcbiAgbWVudVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PntcclxuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCxcclxuICAgIG1lbnVJdGVtID0gKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtYWNjb3JkaW9uX19idG4nKSkgPyB0YXJnZXQucGFyZW50Tm9kZSA6IHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUsIC8vINGA0L7QtNC40YLQtdC70YwgKGxpKVxyXG4gICAgbWVudUNvbnRlbnQgPSBtZW51SXRlbS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2NvbnRlbnQnKTsgLy8gZGl2INGBINC60L7QvdGC0LXQvdGC0L7QvFxyXG4gICAgXHJcbiAgICAvLyDQutC70LjQuiDQv9C+INC60L3QvtC/0LrQtSDQuNC70Lgg0YHQv9Cw0L3Rg1xyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMobWVudUJ1dHRvbikgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhtZW51QnV0dG9uU3BhbikpIHtcclxuICAgICAgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDQvdCw0LbQsNGC0LjQtSDQv9GA0L7QuNC30L7RiNC70L4g0L/QviDQsNC60YLQuNCy0L3QvtC5INGB0LXQutGG0LjQuFxyXG4gICAgICBpZiAobWVudUl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKG1lbnVUb2dnbGVBY3RpdmUpKSB7XHJcbiAgICAgICAgcmVtb3ZlVG9nZ2xlKG1lbnVJdGVtKTtcclxuICAgICAgICBtZW51QWN0aXZlID0gIW1lbnVBY3RpdmU7XHJcbiAgICAgICAgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDQtdGB0YLRjCDQvtGC0LrRgNGL0YLRi9C5INGN0LvQtdC80LXQvdGCXHJcbiAgICAgICAgaWYgKGxhc3RNZW51QWN0aXZlKSB7XHJcbiAgICAgICAgICByZW1vdmVUb2dnbGUobGFzdE1lbnVBY3RpdmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INGA0LDQt9C80LXRgCDRjdC60YDQsNC90LAg0LzQtdC90YzRiNC1INGH0LXQvCDRgNCw0LfQvNC10YAg0L7RgtC60YDRi9GC0L7Qs9C+INC80LXQvdGOINC4INCx0L7Qu9GM0YjQtSDRh9C10Lwg0LHRgNC10LrQv9C+0LjQvdGCXHJcbiAgICAgICAgaWYgKG1lbnVXaWR0aCA8IG1lbnVPcGVuV2lkdGggJiYgbWVudVdpZHRoID4gYnJlYWtQb2ludFBob25lKSB7ICAgICAgICBcclxuICAgICAgICAgIG1lbnVDb250ZW50LnN0eWxlLndpZHRoID0gbWVudVdpZHRoIC0gbWVudUFsbFRvZ2dsZVdpZHRoICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKG1lbnVXaWR0aCA8PSBicmVha1BvaW50UGhvbmUpIHsgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDQutC+0L3RgtC10L3RgiDQstC+INCy0YHRjiDRiNC40YDQuNC90YMg0YDQvtC00LjRgtC10LvRj1xyXG4gICAgICAgICAgbWVudVRvZ2dsZVdpZHRoID0gbWVudUl0ZW1BbGxbMF0ucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX19pbWcnKS5jbGllbnRXaWR0aDsgXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbnVJdGVtQWxsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtZW51SXRlbUFsbFtpXSA9PT0gbWVudUl0ZW0pIHsgLy8g0L3QsNC20LDRgtCw0Y8o0LDQutGC0LjQstC90LDRjykgbGlcclxuICAgICAgICAgICAgICBtZW51SXRlbUFsbFtpXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2NvbnRlbnQnKS5zdHlsZS53aWR0aCA9IG1lbnVXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbWVudUl0ZW1BbGxbaV0ucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX190aXRsZScpLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgIG1lbnVJdGVtQWxsW2ldLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9faW1nJykuc3R5bGUud2lkdGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC10YHQu9C4IHRydWUsINGC0L4g0LXRgdGC0Ywg0L7RgtC60YDRi9GC0YvQuSDRjdC70LXQvNC10L3Rgi4g0J3QvtCy0L7QtSDQvtGC0LrRgNGL0LLQsNC10Lwg0L/QvtGB0LvQtSDQt9Cw0LrRgNGL0YLQuNGPINC/0YDQtdC00YvQtNGD0YnQtdCz0L5cclxuICAgICAgICBpZiAobWVudUFjdGl2ZSl7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbWVudUl0ZW0uY2xhc3NMaXN0LmFkZChtZW51VG9nZ2xlQWN0aXZlKTtcclxuICAgICAgICAgIH0sIDI1MCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1lbnVJdGVtLmNsYXNzTGlzdC5hZGQobWVudVRvZ2dsZUFjdGl2ZSlcclxuICAgICAgICAgIG1lbnVBY3RpdmUgPSAhbWVudUFjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdE1lbnVBY3RpdmUgPSBtZW51SXRlbTtcclxuICAgICAgICBcclxuICAgICAgfSAgXHJcbiAgICAgIC8vINC60LvQuNC6INC/0L4g0LrRgNC10YHRgtC40LrRgyDQsiDQutC+0L3RgtC10L3RgtC1XHJcbiAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhtZW51Q2xvc2VCdXR0b24pKXtcclxuICAgICAgcmVtb3ZlVG9nZ2xlKHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xyXG4gICAgICBtZW51QWN0aXZlID0gIW1lbnVBY3RpdmU7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgXHJcbiAgZnVuY3Rpb24gcmVtb3ZlVG9nZ2xlKGxpKSB7XHJcbiAgICBsaS5jbGFzc0xpc3QucmVtb3ZlKG1lbnVUb2dnbGVBY3RpdmUpOyAvLyAobGkpXHJcbiAgICBsaS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2NvbnRlbnQnKS5zdHlsZS53aWR0aCA9IG51bGw7IC8vIGRpdiDRgSDQutC+0L3RgtC10L3RgtC+0LxcclxuICAgIGxhc3RNZW51QWN0aXZlID0gbnVsbDsgICAgXHJcbiAgICBpZiAobWVudVdpZHRoIDw9IGJyZWFrUG9pbnRQaG9uZSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbnVJdGVtQWxsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBtZW51SXRlbUFsbFtpXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX3RpdGxlJykuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICBtZW51SXRlbUFsbFtpXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2ltZycpLnN0eWxlLndpZHRoID0gbWVudVRvZ2dsZVdpZHRoICsgJ3B4JzsgICAgICAgIFxyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgIH0gICAgICBcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpPT57XHJcbiAgICBtZW51V2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLmNsaWVudFdpZHRoLCAvLyDRiNC40YDQuNC90LAg0LHQu9C+0LrQsCDQvNC10L3RjlxyXG4gICAgbWVudUFsbFRvZ2dsZVdpZHRoID0gbWVudUl0ZW1BbGxbMF0uY2xpZW50V2lkdGggKiBtZW51SXRlbUFsbC5sZW5ndGgsIC8vINGI0LjRgNC40L3QsCDQstGB0LXRhSBsaVxyXG4gICAgbWVudU9wZW5XaWR0aCA9IGRlZnVsdENvbnRlbnRXaWR0aCArIG1lbnVBbGxUb2dnbGVXaWR0aDsgLy8g0YjQuNGA0LjQvdCwINC+0YLQutGA0YvRgtC+0Lkg0YHQtdC60YbQuNC4ICsg0LLRgdC10YUgbGlcclxuICB9KTtcclxufSkoKVxyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG5jb25zdCBoZWFkZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYXYnKSxcclxuICAgICAgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpLFxyXG4gICAgICBuYXZMaW5rID0gJ2EubmF2X19saW5rJ1xyXG4gICAgICBuYXZBY3RpdmUgPSAnbmF2LS1hY3RpdmUnLFxyXG4gICAgICBidG5IYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19oYW1idXJnZXInKSxcclxuICAgICAgYnRuSGFtYnVyZ2VyTWF0Y2hlcyA9ICdidXR0b24uaGVhZGVyX19oYW1idXJnZXInLFxyXG4gICAgICBidG5IYW1idXJnZXJDbG9zZSA9ICdidG4taGFtYnVyZ2VyLS1jbG9zZScsXHJcbiAgICAgIG5vU2Nyb2xsID0gJ25vLXNjcm9sbCc7XHJcblxyXG5oZWFkZXJOYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICBpZiAoZXZlbnQudGFyZ2V0Lm1hdGNoZXMoYnRuSGFtYnVyZ2VyTWF0Y2hlcykpIG5hdlRvZ2dsZSgpO1xyXG4gIGVsc2UgaWYgKG5hdi5jbGFzc0xpc3QuY29udGFpbnMobmF2QWN0aXZlKSAmJiBldmVudC50YXJnZXQubWF0Y2hlcyhuYXZMaW5rKSkgbmF2VG9nZ2xlKCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gbmF2VG9nZ2xlKCkge1xyXG4gIG5hdi5jbGFzc0xpc3QudG9nZ2xlKG5hdkFjdGl2ZSk7XHJcbiAgYnRuSGFtYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoYnRuSGFtYnVyZ2VyQ2xvc2UpO1xyXG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShub1Njcm9sbCk7XHJcbn1cclxuXHJcbn0pKCkiLCIoZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IHNlY3Rpb25Db3VudCA9IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VjdGlvbicpLmxlbmd0aCAtIDEpICogLTEsIC8vINC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQutC+0L3RhtCwINGB0YLRgNCw0L3QuNGG0YsuIC0xINC/0L7RgtC+0LzRgyDRh9GC0L4g0L3QsCDQv9C10YDQstC+0Lkg0YHRgtGA0LDQvdC40YbQtSB0cmFuc2Zvcm0g0L3QtSDQv9GA0LjQvNC10L3Rj9C10YLRgdGPLiDRg9C80L3QvtC20LDQtdC8INC90LAgLTEo0L/QvtC70YPRh9Cw0LXQvCDQvtGC0YDQuNGG0LDRgtC10LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1KSwg0YfRgtC+INCx0Ysg0LIg0LTQsNC70YzQvdC10LnRiNC10Lwg0YHRgNCw0LLQvdC40LLQsNGC0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4g0YHQtdC60YbQuNC5INGBINC90L7QvNC10YDQvtC8INGC0LXQutGD0YnQtdC5INGB0LXQutGG0LjQuFxyXG4gICAgICAgIHBhZ2luYXRpb25MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb25fX2xpc3QnKSxcclxuICAgICAgICBwYWdpbmF0aW9uQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2luYXRpb25fX2l0ZW0nKSxcclxuICAgICAgICBwYWdpbmF0aW9uQWN0aXZlID0gJ3BhZ2luYXRpb25fX2l0ZW0tLWFjdGl2ZSc7XHJcbiAgbGV0IGN1cnJlbnRBY3RpdmUgPSAwLCAvLyDQvdC+0LzQtdGAINGC0LXQutGD0YnQtdC5INGB0LXQutGG0LjQuFxyXG4gICAgICBsYXN0QWN0aXZlID0gMCwgLy8g0L/QvtGB0LvQtdC00L3Rj9GPINCw0LrRgtC40LLQvdCw0Y8g0YHQtdC60YbQuNGPICjQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINGC0L7Qs9C+LCDRh9GC0L4g0LHRiyDRg9Cx0YDQsNGC0Ywg0LDQutGC0LjQstC90YvQuSDQutC70LDRgdGBINGBINC/0LDQs9C40L3QsNGG0LjQuClcclxuICAgICAgaXNTY3JvbGwgPSBmYWxzZTtcclxuXHJcbiAgZnVuY3Rpb24gbW92ZVNjcm9sbChkaXJlY3Rpb24pIHtcclxuICAgIGlmKGlzU2Nyb2xsKSByZXR1cm5cclxuICAgXHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnZG93bicpIHtcclxuICAgICAgY3VycmVudEFjdGl2ZS0tO1xyXG4gICAgICBzY3JvbGwoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN1cnJlbnRBY3RpdmUrKztcclxuICAgICAgc2Nyb2xsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIHNjcm9sbCgpIHtcclxuICAgIC8v0L/RgNC+0LLQtdGA0Y/QtdC8INC90YPQttC90L4g0LvQuCDQstGL0L/QvtC70L3Rj9GC0Ywg0YHQutGA0L7Qu9C7XHJcbiAgICBpZihjdXJyZW50QWN0aXZlIDwgc2VjdGlvbkNvdW50KSByZXR1cm4gY3VycmVudEFjdGl2ZSA9IHNlY3Rpb25Db3VudDsgLy8g0LrQvtC90LXRhiDRgdGC0YDQsNC90LjRhtGLXHJcbiAgICBpZihjdXJyZW50QWN0aXZlID4gMCkgcmV0dXJuIGN1cnJlbnRBY3RpdmUgPSAwOyAvLyDQvdCw0YfQsNC70L4g0YHRgtGA0LDQvdC40YbRi1xyXG5cclxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xyXG4gICAgbWFpbi5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke2N1cnJlbnRBY3RpdmUgKiAxMDB9JSlgO1xyXG4gICAgXHJcbiAgICBpc1Njcm9sbCA9ICFpc1Njcm9sbDtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBwYWdpbmF0aW9uQWxsW2xhc3RBY3RpdmVdLmNsYXNzTGlzdC50b2dnbGUocGFnaW5hdGlvbkFjdGl2ZSk7IC8vINGD0LTQsNC70Y/QtdC8INC60LvQsNGB0YFcclxuICAgICAgbGFzdEFjdGl2ZSA9IGN1cnJlbnRBY3RpdmUgKiAtMTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQvtCx0L3QvtCy0LvRj9C10Lwg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgICBwYWdpbmF0aW9uQWxsW2xhc3RBY3RpdmVdLmNsYXNzTGlzdC50b2dnbGUocGFnaW5hdGlvbkFjdGl2ZSk7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBXHJcblxyXG4gICAgICBpc1Njcm9sbCA9ICFpc1Njcm9sbDtcclxuICAgIH0sIDY1MCk7XHJcbiAgfVxyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChldmVudCkgPT57XHJcbiAgICBjb25zdCBkZWx0YSA9IGV2ZW50LmRlbHRhWSxcclxuICAgICAgICAgIHNjcm9sbCA9IChkZWx0YSA+IDApID8gJ2Rvd24nIDogJ3VwJztcclxuICAgIGlmIChldmVudC5wYXRoWzBdLm1hdGNoZXMoJ3ltYXBzJykpIHJldHVyblxyXG4gICAgbW92ZVNjcm9sbChzY3JvbGwpOyAgICBcclxuICB9KTtcclxuICBwYWdpbmF0aW9uTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2luYXRpb25fX2xpbmsnKSkge1xyXG4gICAgICBjdXJyZW50QWN0aXZlID0gLXRhcmdldC5kYXRhc2V0LnNjcm9sbDtcclxuICAgICAgc2Nyb2xsKCk7ICAgICAgXHJcbiAgICB9XHJcbiAgfSlcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gNDApIHtcclxuICAgICAgbW92ZVNjcm9sbCgnZG93bicpO1xyXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOCkge1xyXG4gICAgICBtb3ZlU2Nyb2xsKCd1cCcpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn0pKCkiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICBjb25zdCBvcmRlckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3JkZXItZm9ybScpLFxyXG4gICAgICAgIG9yZGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9yZGVyLWZvcm1fX3N1Ym1pdCcpO1xyXG5cclxuICBvcmRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PntcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICBpZiAodmFsaWRhdGVGb3JtKG9yZGVyRm9ybSkpIHtcclxuICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICBuYW1lOiBvcmRlckZvcm0uZWxlbWVudHMubmFtZS52YWx1ZSxcclxuICAgICAgICBwaG9uZTogb3JkZXJGb3JtLmVsZW1lbnRzLnBob25lLnZhbHVlLFxyXG4gICAgICAgIC8vIHN0cmVldDogb3JkZXJGb3JtLmVsZW1lbnRzLnN0cmVldC52YWx1ZSxcclxuICAgICAgICAvLyBob3VzZTogb3JkZXJGb3JtLmVsZW1lbnRzLmhvdXNlLnZhbHVlLFxyXG4gICAgICAgIC8vIGJvZHk6IG9yZGVyRm9ybS5lbGVtZW50cy5ib2R5LnZhbHVlLFxyXG4gICAgICAgIC8vIGZsYXQ6IG9yZGVyRm9ybS5lbGVtZW50cy5mbGF0LnZhbHVlLFxyXG4gICAgICAgIC8vIGZsb29yOiBvcmRlckZvcm0uZWxlbWVudHMuZmxvb3IudmFsdWUsXHJcbiAgICAgICAgY29tbWVudDogb3JkZXJGb3JtLmVsZW1lbnRzLmNvbW1lbnQudmFsdWUsXHJcbiAgICAgICAgZW1haWw6ICdlbWFpbEB0ZXN0J1xyXG4gICAgICB9O1xyXG4gICAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgZGF0YS5uYW1lKTtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdwaG9uZScsIGRhdGEucGhvbmUpO1xyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ2NvbW1lbnQnLCBkYXRhLmNvbW1lbnQpO1xyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ2VtYWlsJywgZGF0YS5lbWFpbCk7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcclxuICAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnaHR0cHM6Ly93ZWJkZXYtYXBpLmxvZnRzY2hvb2wuY29tL3NlbmRtYWlsL2ZhaWwnKTtcclxuICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xyXG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpPT4ge1xyXG4gICAgICAgIGlmICh4aHIucmVzcG9uc2Uuc3RhdHVzKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZU1vZGFsKHhoci5yZXNwb25zZS5tZXNzYWdlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlTW9kYWwoeGhyLnJlc3BvbnNlLm1lc3NhZ2UpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIH0pXHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiB2YWxpZGF0ZUZvcm0oZm9ybSkge1xyXG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMubmFtZS5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLnBob25lLmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMuc3RyZWV0LmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMuaG91c2UuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5ib2R5LmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMuZmxhdC5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLmZsb29yLmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMuY29tbWVudC5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG5cclxuICAgIHJldHVybiB2YWxpZFxyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZU1vZGFsKGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbCcpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsX19jb250YWluZXInKTtcclxuICAgIG1vZGFsLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICAgIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWxfX3RpdGxlJyk7XHJcbiAgICB0aXRsZS5pbm5lclRleHQgPSBjb250ZW50O1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ21vZGFsX19idXR0b24nKTtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nKTtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4tLWNvbG9yLS1ncmVlbicpO1xyXG4gICAgYnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcclxuICAgIGJ1dHRvbi5pbm5lclRleHQgPSAn0JfQsNC60YDRi9GC0YwnO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cclxuICAgIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KT0+e1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgIGlmICghKHRhcmdldCA9PT0gY29udGFpbmVyIHx8IHRhcmdldCA9PT0gdGl0bGUpKSB7XHJcbiAgICAgICAgbW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcclxuICAgICAgLy8gICBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgLy8gfVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gbW9kYWxcclxuICB9O1xyXG5cclxufSkoKVxyXG4iLCIoZnVuY3Rpb24oKSB7ICAgIFxyXG4gIGNvbnN0IHByb2R1Y3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fY29udGFpbmVyJyksXHJcbiAgICAgICAgcHJvZHVjdEl0ZW1BbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdF9faXRlbScpLFxyXG4gICAgICAgIGJ0blByZXZpb3VzID0gJ2J1dHRvbi5wcm9kdWN0X19wcmV2aW91cycsXHJcbiAgICAgICAgYnRuTmV4dCA9ICdidXR0b24ucHJvZHVjdF9fbmV4dCcsXHJcbiAgICAgICAgcHJvZHVjdElpdGVtQWN0aXZlID0gJ3Byb2R1Y3RfX2l0ZW0tLWFjdGl2ZSc7XHJcbiAgbGV0IGlBY3RpdmUgPSAwO1xyXG5cclxuICBwcm9kdWN0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcbiAgICAvLyDQv9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0XHJcbiAgICBpZihldmVudC50YXJnZXQubWF0Y2hlcyhidG5QcmV2aW91cykpe1xyXG4gICAgICBpZiAocHJvZHVjdEl0ZW1BbGxbaUFjdGl2ZSAtIDFdKSB7XHJcbiAgICAgICAgcHJvZHVjdFRvZ2dsZShpQWN0aXZlIC0gMSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZHVjdFRvZ2dsZShwcm9kdWN0SXRlbUFsbC5sZW5ndGggLSAxKTtcclxuICAgICAgfVxyXG4gICAgLy8g0YHQu9C10LTRg9GO0YnQuNC5INGB0LvQsNC50LQgIFxyXG4gICAgfSBlbHNlIGlmKGV2ZW50LnRhcmdldC5tYXRjaGVzKGJ0bk5leHQpKXtcclxuICAgICAgaWYgKHByb2R1Y3RJdGVtQWxsW2lBY3RpdmUgKyAxXSkge1xyXG4gICAgICAgIHByb2R1Y3RUb2dnbGUoaUFjdGl2ZSArIDEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2R1Y3RUb2dnbGUoMCk7XHJcbiAgICAgIH1cclxuICAgIH0gIFxyXG4gIH0pXHJcblxyXG4gIGZ1bmN0aW9uIHByb2R1Y3RUb2dnbGUoaU5leHQpIHtcclxuICAgIHByb2R1Y3RJdGVtQWxsW2lBY3RpdmVdLmNsYXNzTGlzdC50b2dnbGUocHJvZHVjdElpdGVtQWN0aXZlKTtcclxuICAgIGlBY3RpdmUgPSBpTmV4dDtcclxuICAgIHByb2R1Y3RJdGVtQWxsW2lBY3RpdmVdLmNsYXNzTGlzdC50b2dnbGUocHJvZHVjdElpdGVtQWN0aXZlKTtcclxuICB9XHJcbn0pKCkiLCIoZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgcmV2aWV3c1dyYXBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX193cmFwZXInKSxcclxuICAgICAgICBmZWVkYmFja0FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mZWVkYmFjaycpLFxyXG5cclxuICAgICAgICByZXZpZXdzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19saXN0JyksXHJcbiAgICAgICAgcmV2aWV3c0FsbCA9IHJldmlld3NMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXZpZXdzX19pdGVtJyksXHJcbiAgICAgICAgcmV2aWV3c0FjdGl2ZSA9ICdyZXZpZXdzX19pdGVtLS1hY3RpdmUnLCAgICAgICAgXHJcblxyXG4gICAgICAgIHJldmlld3NCdXR0b24gPSAncmV2aWV3c19fYnV0dG9uJztcclxuXHJcbiAgbGV0IGxhc3RBY3RpdmUgPSAwLFxyXG4gICAgICByZXZpZXdzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19jb250ZW50JykuY2xpZW50V2lkdGg7XHJcblxyXG4gIHJldmlld3NXcmFwZXIuc3R5bGUud2lkdGggPSByZXZpZXdzQ29udGVudCAqIGZlZWRiYWNrQWxsLmxlbmd0aCArICdweCc7XHJcblxyXG4gIHJldmlld3NMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KT0+e1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7IC8vIGJ1dHRvblxyXG4gICAgXHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhyZXZpZXdzQnV0dG9uKSkge1xyXG4gICAgICByZXZpZXdzVG9nZ2xlKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSAtIDEpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gcmV2aWV3c1RvZ2dsZShuZXh0QWN0aXZlKSB7XHJcbiAgICByZXZpZXdzQWxsW2xhc3RBY3RpdmVdLmNsYXNzTGlzdC5yZW1vdmUocmV2aWV3c0FjdGl2ZSk7XHJcbiAgICBsYXN0QWN0aXZlID0gbmV4dEFjdGl2ZTsgLy8g0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1XHJcbiAgICByZXZpZXdzQWxsW25leHRBY3RpdmVdLmNsYXNzTGlzdC5hZGQocmV2aWV3c0FjdGl2ZSk7XHJcbiAgICBcclxuICAgIHJldmlld3NXcmFwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIC0gcmV2aWV3c0NvbnRlbnQgKiBuZXh0QWN0aXZlICsgJ3B4KSc7XHJcbiAgfTtcclxuICBcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCk9PntcclxuICAgIHJldmlld3NDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2NvbnRlbnQnKS5jbGllbnRXaWR0aCxcclxuICAgIFxyXG4gICAgcmV2aWV3c1dyYXBlci5zdHlsZS53aWR0aCA9IHJldmlld3NDb250ZW50ICogZmVlZGJhY2tBbGwubGVuZ3RoICsgJ3B4JztcclxuICAgIHJldmlld3NXcmFwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIC0gcmV2aWV3c0NvbnRlbnQgKiBsYXN0QWN0aXZlICsgJ3B4KSc7XHJcbiAgfSk7XHJcbiAgICBcclxufSkoKSIsIihmdW5jdGlvbigpIHtcclxuICBjb25zdCB0ZWFtVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlYW1fX2xpc3QnKVxyXG4gICAgICAgIHRlYW1CdXR0b24gPSAnYS50ZWFtX19uYW1lJyxcclxuICAgICAgICB0ZWFtVG9nZ2xlQWN0aXZlID0gJ3RlYW1fX2l0ZW0tLWFjdGl2ZSc7XHJcbiAgbGV0IHByZXZpb3VzQ2xpY2sgPSBudWxsO1xyXG5cclxuICB0ZWFtVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KT0+eyAgXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYoZXZlbnQudGFyZ2V0Lm1hdGNoZXModGVhbUJ1dHRvbikpIHtcclxuICAgICAgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDQvdCw0LbQsNGC0LjQtSDQv9GA0L7QuNC30L7RiNC70L4g0L/QviDQsNC60YLQuNCy0L3QvtC80YMg0Y3Qu9C10LzQtdC90YLRg1xyXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnModGVhbVRvZ2dsZUFjdGl2ZSkpIHtcclxuICAgICAgICByZW1vdmVUb2dnbGUoZXZlbnQudGFyZ2V0KSAgICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INGD0LHQuNGA0LDQtdC8INGB0YLQuNC70Lgg0YEg0L/RgNC10LTRi9C00YPRidC10LPQviDQsNC60YLQuNCy0L3QvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxyXG4gICAgICAgIGlmIChwcmV2aW91c0NsaWNrKSB7XHJcbiAgICAgICAgICByZW1vdmVUb2dnbGUocHJldmlvdXNDbGljaylcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgIFxyXG4gICAgICAgICAgICBhZGRUb2dnbGUoZXZlbnQudGFyZ2V0KSAgICAgXHJcbiAgICAgICAgICB9LCAyOTApO1xyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBhZGRUb2dnbGUoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVUb2dnbGUoZWxlbWVudCkge1xyXG4gICAgZWxlbWVudC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LnRvZ2dsZSh0ZWFtVG9nZ2xlQWN0aXZlKTsgIFxyXG4gICAgZWxlbWVudC5wYXJlbnROb2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuc3R5bGUuaGVpZ2h0ID0gbnVsbDsgXHJcbiAgICBwcmV2aW91c0NsaWNrID0gbnVsbDsgXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGFkZFRvZ2dsZShlbGVtZW50KSB7XHJcbiAgICBsZXQgaW1nSGVpZ2h0ID0gZWxlbWVudC5wYXJlbnROb2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcub2Zmc2V0SGVpZ2h0LCBcclxuICAgICAgICBpbmZvSGVpZ2h0ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICAgIG5ld0ltZ0hlaWdodCA9IGltZ0hlaWdodCAtIGluZm9IZWlnaHQ7XHJcblxyXG4gICAgZWxlbWVudC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LnRvZ2dsZSh0ZWFtVG9nZ2xlQWN0aXZlKTsgICAgICAgIFxyXG4gICAgZWxlbWVudC5wYXJlbnROb2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuc3R5bGUuaGVpZ2h0ID0gbmV3SW1nSGVpZ2h0ICsgJ3B4JztcclxuICAgIHByZXZpb3VzQ2xpY2sgPSBlbGVtZW50OyBcclxuICB9XHJcbiAgICBcclxufSkoKSJdfQ==
