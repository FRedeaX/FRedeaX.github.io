(function() {    
    ymaps.ready(init);
    function init () {
  let myMap = new ymaps.Map('map', {
      center: [55.7486, 37.5986],
      zoom: 14
    });
    
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader:'Событие!',
                contentBody:'<p>Кто-то щелкнул по карте.</p>' +
                '<p>Координаты щелчка: ' + [
                    coords[0].toPrecision(6),
                    coords[1].toPrecision(6)
                ].join(', ') + '</p>',
                contentFooter:'<sup>Щелкните еще раз</sup>'
            });
        }
        else {
            myMap.balloon.close();
        }
    });
    
    // Обработка события, возникающего при щелчке
    // правой кнопки мыши в любой точке карты.
    // При возникновении такого события покажем всплывающую подсказку
    // в точке щелчка.
    myMap.events.add('contextmenu', function (e) {
        myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
    });
    
    // Скрываем хинт при открытии балуна.
    myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC5qcyIsIm1lbnUuanMiLCJuYXYuanMiLCJvbmVQYWdlU2Nyb2xsLmpzIiwib3JkZXIuanMiLCJwcm9kdWN0LmpzIiwicmV2aWV3cy5qcyIsInRlYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0N2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0MvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHsgICAgXHJcbiAgICB5bWFwcy5yZWFkeShpbml0KTtcclxuICAgIGZ1bmN0aW9uIGluaXQgKCkge1xyXG4gIGxldCBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ21hcCcsIHtcclxuICAgICAgY2VudGVyOiBbNTUuNzQ4NiwgMzcuNTk4Nl0sXHJcbiAgICAgIHpvb206IDE0XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgbXlNYXAuZXZlbnRzLmFkZCgnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICghbXlNYXAuYmFsbG9vbi5pc09wZW4oKSkge1xyXG4gICAgICAgICAgICB2YXIgY29vcmRzID0gZS5nZXQoJ2Nvb3JkcycpO1xyXG4gICAgICAgICAgICBteU1hcC5iYWxsb29uLm9wZW4oY29vcmRzLCB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50SGVhZGVyOifQodC+0LHRi9GC0LjQtSEnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudEJvZHk6JzxwPtCa0YLQvi3RgtC+INGJ0LXQu9C60L3Rg9C7INC/0L4g0LrQsNGA0YLQtS48L3A+JyArXHJcbiAgICAgICAgICAgICAgICAnPHA+0JrQvtC+0YDQtNC40L3QsNGC0Ysg0YnQtdC70YfQutCwOiAnICsgW1xyXG4gICAgICAgICAgICAgICAgICAgIGNvb3Jkc1swXS50b1ByZWNpc2lvbig2KSxcclxuICAgICAgICAgICAgICAgICAgICBjb29yZHNbMV0udG9QcmVjaXNpb24oNilcclxuICAgICAgICAgICAgICAgIF0uam9pbignLCAnKSArICc8L3A+JyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRGb290ZXI6JzxzdXA+0KnQtdC70LrQvdC40YLQtSDQtdGJ0LUg0YDQsNC3PC9zdXA+J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG15TWFwLmJhbGxvb24uY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy8g0J7QsdGA0LDQsdC+0YLQutCwINGB0L7QsdGL0YLQuNGPLCDQstC+0LfQvdC40LrQsNGO0YnQtdCz0L4g0L/RgNC4INGJ0LXQu9GH0LrQtVxyXG4gICAgLy8g0L/RgNCw0LLQvtC5INC60L3QvtC/0LrQuCDQvNGL0YjQuCDQsiDQu9GO0LHQvtC5INGC0L7Rh9C60LUg0LrQsNGA0YLRiy5cclxuICAgIC8vINCf0YDQuCDQstC+0LfQvdC40LrQvdC+0LLQtdC90LjQuCDRgtCw0LrQvtCz0L4g0YHQvtCx0YvRgtC40Y8g0L/QvtC60LDQttC10Lwg0LLRgdC/0LvRi9Cy0LDRjtGJ0YPRjiDQv9C+0LTRgdC60LDQt9C60YNcclxuICAgIC8vINCyINGC0L7Rh9C60LUg0YnQtdC70YfQutCwLlxyXG4gICAgbXlNYXAuZXZlbnRzLmFkZCgnY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIG15TWFwLmhpbnQub3BlbihlLmdldCgnY29vcmRzJyksICfQmtGC0L4t0YLQviDRidC10LvQutC90YPQuyDQv9GA0LDQstC+0Lkg0LrQvdC+0L/QutC+0LknKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyDQodC60YDRi9Cy0LDQtdC8INGF0LjQvdGCINC/0YDQuCDQvtGC0LrRgNGL0YLQuNC4INCx0LDQu9GD0L3QsC5cclxuICAgIG15TWFwLmV2ZW50cy5hZGQoJ2JhbGxvb25vcGVuJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBteU1hcC5oaW50LmNsb3NlKCk7XHJcbiAgICB9KTtcclxuICAgIH1cclxufSkoKSIsIihmdW5jdGlvbigpIHsgICAgXHJcbiAgY29uc3QgbWVudVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9fbGlzdCcpLFxyXG4gICAgICAgIG1lbnVJdGVtQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtYWNjb3JkaW9uX19pdGVtJyksXHJcbiAgICAgICAgbWVudVRvZ2dsZUFjdGl2ZSA9ICdtZW51LWFjY29yZGlvbl9faXRlbS0tYWN0aXZlJyxcclxuICAgICAgICBtZW51QnV0dG9uID0gJ21lbnUtYWNjb3JkaW9uX19idG4nLFxyXG4gICAgICAgIG1lbnVCdXR0b25TcGFuID0gJ21lbnUtYWNjb3JkaW9uX190aXRsZScsXHJcbiAgICAgICAgbWVudUNsb3NlQnV0dG9uID0gJ21lbnUtYWNjb3JkaW9uX19jbG9zZS1idG4nO1xyXG4gIFxyXG4gIGxldCBsYXN0TWVudUFjdGl2ZSA9IG51bGwsIC8vINGC0LXQutGD0YnQsNGPINC+0YLQutGA0YvRgtCw0Y8g0YHQtdC60YbQuNGPIChsaSlcclxuICAgICAgbWVudUFjdGl2ZSA9IGZhbHNlLCAvLyBzZXRUaW1lb3V0INC/0YDQuCDQvtGC0LrRgNGL0YLQuNC4INCy0YLQvtGA0L7QuSDRgdC10LrRhtC40LggKGxpKVxyXG4gICAgICBkZWZ1bHRDb250ZW50V2lkdGggPSA1MjAsIC8vINGI0LjRgNC40L3QsCDQutC+0L3RgtC10L3RgtCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXHJcbiAgICAgIGJyZWFrUG9pbnRQaG9uZSA9IDQ4MCxcclxuICAgICAgbWVudVdpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKS5jbGllbnRXaWR0aCwgLy8g0YjQuNGA0LjQvdCwINCx0LvQvtC60LAg0LzQtdC90Y5cclxuICAgICAgbWVudVRvZ2dsZVdpZHRoID0gbWVudUl0ZW1BbGxbMF0uY2xpZW50V2lkdGgsIC8vINGI0LjRgNC40L3QsCDQvtC00L3QvtC5IGxpXHJcbiAgICAgIG1lbnVBbGxUb2dnbGVXaWR0aCA9IG1lbnVUb2dnbGVXaWR0aCAqIG1lbnVJdGVtQWxsLmxlbmd0aCwgLy8g0YjQuNGA0LjQvdCwINCy0YHQtdGFIGxpXHJcbiAgICAgIG1lbnVPcGVuV2lkdGggPSBkZWZ1bHRDb250ZW50V2lkdGggKyBtZW51QWxsVG9nZ2xlV2lkdGg7IC8vINGI0LjRgNC40L3QsCDQvtGC0LrRgNGL0YLQvtC5INGB0LXQutGG0LjQuCArINCy0YHQtdGFIGxpXHJcbiAgXHJcbiAgbWVudVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PntcclxuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCxcclxuICAgIG1lbnVJdGVtID0gKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtYWNjb3JkaW9uX19idG4nKSkgPyB0YXJnZXQucGFyZW50Tm9kZSA6IHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUsIC8vINGA0L7QtNC40YLQtdC70YwgKGxpKVxyXG4gICAgbWVudUNvbnRlbnQgPSBtZW51SXRlbS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2NvbnRlbnQnKTsgLy8gZGl2INGBINC60L7QvdGC0LXQvdGC0L7QvFxyXG4gICAgXHJcbiAgICAvLyDQutC70LjQuiDQv9C+INC60L3QvtC/0LrQtSDQuNC70Lgg0YHQv9Cw0L3Rg1xyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMobWVudUJ1dHRvbikgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhtZW51QnV0dG9uU3BhbikpIHtcclxuICAgICAgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDQvdCw0LbQsNGC0LjQtSDQv9GA0L7QuNC30L7RiNC70L4g0L/QviDQsNC60YLQuNCy0L3QvtC5INGB0LXQutGG0LjQuFxyXG4gICAgICBpZiAobWVudUl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKG1lbnVUb2dnbGVBY3RpdmUpKSB7XHJcbiAgICAgICAgcmVtb3ZlVG9nZ2xlKG1lbnVJdGVtKTtcclxuICAgICAgICBtZW51QWN0aXZlID0gIW1lbnVBY3RpdmU7XHJcbiAgICAgICAgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDQtdGB0YLRjCDQvtGC0LrRgNGL0YLRi9C5INGN0LvQtdC80LXQvdGCXHJcbiAgICAgICAgaWYgKGxhc3RNZW51QWN0aXZlKSB7XHJcbiAgICAgICAgICByZW1vdmVUb2dnbGUobGFzdE1lbnVBY3RpdmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INGA0LDQt9C80LXRgCDRjdC60YDQsNC90LAg0LzQtdC90YzRiNC1INGH0LXQvCDRgNCw0LfQvNC10YAg0L7RgtC60YDRi9GC0L7Qs9C+INC80LXQvdGOINC4INCx0L7Qu9GM0YjQtSDRh9C10Lwg0LHRgNC10LrQv9C+0LjQvdGCXHJcbiAgICAgICAgaWYgKG1lbnVXaWR0aCA8IG1lbnVPcGVuV2lkdGggJiYgbWVudVdpZHRoID4gYnJlYWtQb2ludFBob25lKSB7ICAgICAgICBcclxuICAgICAgICAgIG1lbnVDb250ZW50LnN0eWxlLndpZHRoID0gbWVudVdpZHRoIC0gbWVudUFsbFRvZ2dsZVdpZHRoICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKG1lbnVXaWR0aCA8PSBicmVha1BvaW50UGhvbmUpIHsgLy8g0LXRgdC70LggdHJ1ZSwg0YLQviDQutC+0L3RgtC10L3RgiDQstC+INCy0YHRjiDRiNC40YDQuNC90YMg0YDQvtC00LjRgtC10LvRj1xyXG4gICAgICAgICAgbWVudVRvZ2dsZVdpZHRoID0gbWVudUl0ZW1BbGxbMF0ucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX19pbWcnKS5jbGllbnRXaWR0aDsgXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbnVJdGVtQWxsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtZW51SXRlbUFsbFtpXSA9PT0gbWVudUl0ZW0pIHsgLy8g0L3QsNC20LDRgtCw0Y8o0LDQutGC0LjQstC90LDRjykgbGlcclxuICAgICAgICAgICAgICBtZW51SXRlbUFsbFtpXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2NvbnRlbnQnKS5zdHlsZS53aWR0aCA9IG1lbnVXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbWVudUl0ZW1BbGxbaV0ucXVlcnlTZWxlY3RvcignLm1lbnUtYWNjb3JkaW9uX190aXRsZScpLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgIG1lbnVJdGVtQWxsW2ldLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGlvbl9faW1nJykuc3R5bGUud2lkdGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC10YHQu9C4IHRydWUsINGC0L4g0LXRgdGC0Ywg0L7RgtC60YDRi9GC0YvQuSDRjdC70LXQvNC10L3Rgi4g0J3QvtCy0L7QtSDQvtGC0LrRgNGL0LLQsNC10Lwg0L/QvtGB0LvQtSDQt9Cw0LrRgNGL0YLQuNGPINC/0YDQtdC00YvQtNGD0YnQtdCz0L5cclxuICAgICAgICBpZiAobWVudUFjdGl2ZSl7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbWVudUl0ZW0uY2xhc3NMaXN0LmFkZChtZW51VG9nZ2xlQWN0aXZlKTtcclxuICAgICAgICAgIH0sIDI1MCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1lbnVJdGVtLmNsYXNzTGlzdC5hZGQobWVudVRvZ2dsZUFjdGl2ZSlcclxuICAgICAgICAgIG1lbnVBY3RpdmUgPSAhbWVudUFjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdE1lbnVBY3RpdmUgPSBtZW51SXRlbTtcclxuICAgICAgICBcclxuICAgICAgfSAgXHJcbiAgICAgIC8vINC60LvQuNC6INC/0L4g0LrRgNC10YHRgtC40LrRgyDQsiDQutC+0L3RgtC10L3RgtC1XHJcbiAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhtZW51Q2xvc2VCdXR0b24pKXtcclxuICAgICAgcmVtb3ZlVG9nZ2xlKHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xyXG4gICAgICBtZW51QWN0aXZlID0gIW1lbnVBY3RpdmU7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgXHJcbiAgZnVuY3Rpb24gcmVtb3ZlVG9nZ2xlKGxpKSB7XHJcbiAgICBsaS5jbGFzc0xpc3QucmVtb3ZlKG1lbnVUb2dnbGVBY3RpdmUpOyAvLyAobGkpXHJcbiAgICBsaS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2NvbnRlbnQnKS5zdHlsZS53aWR0aCA9IG51bGw7IC8vIGRpdiDRgSDQutC+0L3RgtC10L3RgtC+0LxcclxuICAgIGxhc3RNZW51QWN0aXZlID0gbnVsbDsgICAgXHJcbiAgICBpZiAobWVudVdpZHRoIDw9IGJyZWFrUG9pbnRQaG9uZSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbnVJdGVtQWxsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBtZW51SXRlbUFsbFtpXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX3RpdGxlJykuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICBtZW51SXRlbUFsbFtpXS5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRpb25fX2ltZycpLnN0eWxlLndpZHRoID0gbWVudVRvZ2dsZVdpZHRoICsgJ3B4JzsgICAgICAgIFxyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgIH0gICAgICBcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpPT57XHJcbiAgICBtZW51V2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLmNsaWVudFdpZHRoLCAvLyDRiNC40YDQuNC90LAg0LHQu9C+0LrQsCDQvNC10L3RjlxyXG4gICAgbWVudUFsbFRvZ2dsZVdpZHRoID0gbWVudUl0ZW1BbGxbMF0uY2xpZW50V2lkdGggKiBtZW51SXRlbUFsbC5sZW5ndGgsIC8vINGI0LjRgNC40L3QsCDQstGB0LXRhSBsaVxyXG4gICAgbWVudU9wZW5XaWR0aCA9IGRlZnVsdENvbnRlbnRXaWR0aCArIG1lbnVBbGxUb2dnbGVXaWR0aDsgLy8g0YjQuNGA0LjQvdCwINC+0YLQutGA0YvRgtC+0Lkg0YHQtdC60YbQuNC4ICsg0LLRgdC10YUgbGlcclxuICB9KTtcclxufSkoKVxyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG5jb25zdCBoZWFkZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYXYnKSxcclxuICAgICAgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpLFxyXG4gICAgICBuYXZMaW5rID0gJ2EubmF2X19saW5rJ1xyXG4gICAgICBuYXZBY3RpdmUgPSAnbmF2LS1hY3RpdmUnLFxyXG4gICAgICBidG5IYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19oYW1idXJnZXInKSxcclxuICAgICAgYnRuSGFtYnVyZ2VyTWF0Y2hlcyA9ICdidXR0b24uaGVhZGVyX19oYW1idXJnZXInLFxyXG4gICAgICBidG5IYW1idXJnZXJDbG9zZSA9ICdidG4taGFtYnVyZ2VyLS1jbG9zZScsXHJcbiAgICAgIG5vU2Nyb2xsID0gJ25vLXNjcm9sbCc7XHJcblxyXG5oZWFkZXJOYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICBpZiAoZXZlbnQudGFyZ2V0Lm1hdGNoZXMoYnRuSGFtYnVyZ2VyTWF0Y2hlcykpIG5hdlRvZ2dsZSgpO1xyXG4gIGVsc2UgaWYgKG5hdi5jbGFzc0xpc3QuY29udGFpbnMobmF2QWN0aXZlKSAmJiBldmVudC50YXJnZXQubWF0Y2hlcyhuYXZMaW5rKSkgbmF2VG9nZ2xlKCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gbmF2VG9nZ2xlKCkge1xyXG4gIG5hdi5jbGFzc0xpc3QudG9nZ2xlKG5hdkFjdGl2ZSk7XHJcbiAgYnRuSGFtYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoYnRuSGFtYnVyZ2VyQ2xvc2UpO1xyXG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShub1Njcm9sbCk7XHJcbn1cclxuXHJcbn0pKCkiLCIoZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IHNlY3Rpb25Db3VudCA9IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VjdGlvbicpLmxlbmd0aCAtIDEpICogLTEsIC8vINC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQutC+0L3RhtCwINGB0YLRgNCw0L3QuNGG0YsuIC0xINC/0L7RgtC+0LzRgyDRh9GC0L4g0L3QsCDQv9C10YDQstC+0Lkg0YHRgtGA0LDQvdC40YbQtSB0cmFuc2Zvcm0g0L3QtSDQv9GA0LjQvNC10L3Rj9C10YLRgdGPLiDRg9C80L3QvtC20LDQtdC8INC90LAgLTEo0L/QvtC70YPRh9Cw0LXQvCDQvtGC0YDQuNGG0LDRgtC10LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1KSwg0YfRgtC+INCx0Ysg0LIg0LTQsNC70YzQvdC10LnRiNC10Lwg0YHRgNCw0LLQvdC40LLQsNGC0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4g0YHQtdC60YbQuNC5INGBINC90L7QvNC10YDQvtC8INGC0LXQutGD0YnQtdC5INGB0LXQutGG0LjQuFxyXG4gICAgICAgIHBhZ2luYXRpb25MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb25fX2xpc3QnKSxcclxuICAgICAgICBwYWdpbmF0aW9uQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2luYXRpb25fX2l0ZW0nKSxcclxuICAgICAgICBwYWdpbmF0aW9uQWN0aXZlID0gJ3BhZ2luYXRpb25fX2l0ZW0tLWFjdGl2ZSc7XHJcbiAgbGV0IGN1cnJlbnRBY3RpdmUgPSAwLCAvLyDQvdC+0LzQtdGAINGC0LXQutGD0YnQtdC5INGB0LXQutGG0LjQuFxyXG4gICAgICBsYXN0QWN0aXZlID0gMCwgLy8g0L/QvtGB0LvQtdC00L3Rj9GPINCw0LrRgtC40LLQvdCw0Y8g0YHQtdC60YbQuNGPICjQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINGC0L7Qs9C+LCDRh9GC0L4g0LHRiyDRg9Cx0YDQsNGC0Ywg0LDQutGC0LjQstC90YvQuSDQutC70LDRgdGBINGBINC/0LDQs9C40L3QsNGG0LjQuClcclxuICAgICAgaXNTY3JvbGwgPSBmYWxzZTtcclxuXHJcbiAgZnVuY3Rpb24gbW92ZVNjcm9sbChkaXJlY3Rpb24pIHtcclxuICAgIGlmKGlzU2Nyb2xsKSByZXR1cm5cclxuICAgXHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnZG93bicpIHtcclxuICAgICAgY3VycmVudEFjdGl2ZS0tO1xyXG4gICAgICBzY3JvbGwoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN1cnJlbnRBY3RpdmUrKztcclxuICAgICAgc2Nyb2xsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIHNjcm9sbCgpIHtcclxuICAgIC8v0L/RgNC+0LLQtdGA0Y/QtdC8INC90YPQttC90L4g0LvQuCDQstGL0L/QvtC70L3Rj9GC0Ywg0YHQutGA0L7Qu9C7XHJcbiAgICBpZihjdXJyZW50QWN0aXZlIDwgc2VjdGlvbkNvdW50KSByZXR1cm4gY3VycmVudEFjdGl2ZSA9IHNlY3Rpb25Db3VudDsgLy8g0LrQvtC90LXRhiDRgdGC0YDQsNC90LjRhtGLXHJcbiAgICBpZihjdXJyZW50QWN0aXZlID4gMCkgcmV0dXJuIGN1cnJlbnRBY3RpdmUgPSAwOyAvLyDQvdCw0YfQsNC70L4g0YHRgtGA0LDQvdC40YbRi1xyXG5cclxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xyXG4gICAgbWFpbi5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke2N1cnJlbnRBY3RpdmUgKiAxMDB9JSlgO1xyXG4gICAgXHJcbiAgICBpc1Njcm9sbCA9ICFpc1Njcm9sbDtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBwYWdpbmF0aW9uQWxsW2xhc3RBY3RpdmVdLmNsYXNzTGlzdC50b2dnbGUocGFnaW5hdGlvbkFjdGl2ZSk7IC8vINGD0LTQsNC70Y/QtdC8INC60LvQsNGB0YFcclxuICAgICAgbGFzdEFjdGl2ZSA9IGN1cnJlbnRBY3RpdmUgKiAtMTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQvtCx0L3QvtCy0LvRj9C10Lwg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgICBwYWdpbmF0aW9uQWxsW2xhc3RBY3RpdmVdLmNsYXNzTGlzdC50b2dnbGUocGFnaW5hdGlvbkFjdGl2ZSk7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBXHJcblxyXG4gICAgICBpc1Njcm9sbCA9ICFpc1Njcm9sbDtcclxuICAgIH0sIDY1MCk7XHJcbiAgfVxyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChldmVudCkgPT57XHJcbiAgICBjb25zdCBkZWx0YSA9IGV2ZW50LmRlbHRhWSxcclxuICAgICAgICAgIHNjcm9sbCA9IChkZWx0YSA+IDApID8gJ2Rvd24nIDogJ3VwJztcclxuICAgIGlmIChldmVudC5wYXRoWzBdLm1hdGNoZXMoJ3ltYXBzJykpIHJldHVyblxyXG4gICAgbW92ZVNjcm9sbChzY3JvbGwpOyAgICBcclxuICB9KTtcclxuICBwYWdpbmF0aW9uTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2luYXRpb25fX2xpbmsnKSkge1xyXG4gICAgICBjdXJyZW50QWN0aXZlID0gLXRhcmdldC5kYXRhc2V0LnNjcm9sbDtcclxuICAgICAgc2Nyb2xsKCk7ICAgICAgXHJcbiAgICB9XHJcbiAgfSlcclxufSkoKSIsIihmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gIGNvbnN0IG9yZGVyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlci1mb3JtJyksXHJcbiAgICAgICAgb3JkZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3JkZXItZm9ybV9fc3VibWl0Jyk7XHJcblxyXG4gIG9yZGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KT0+e1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgIGlmICh2YWxpZGF0ZUZvcm0ob3JkZXJGb3JtKSkge1xyXG4gICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgIG5hbWU6IG9yZGVyRm9ybS5lbGVtZW50cy5uYW1lLnZhbHVlLFxyXG4gICAgICAgIHBob25lOiBvcmRlckZvcm0uZWxlbWVudHMucGhvbmUudmFsdWUsXHJcbiAgICAgICAgLy8gc3RyZWV0OiBvcmRlckZvcm0uZWxlbWVudHMuc3RyZWV0LnZhbHVlLFxyXG4gICAgICAgIC8vIGhvdXNlOiBvcmRlckZvcm0uZWxlbWVudHMuaG91c2UudmFsdWUsXHJcbiAgICAgICAgLy8gYm9keTogb3JkZXJGb3JtLmVsZW1lbnRzLmJvZHkudmFsdWUsXHJcbiAgICAgICAgLy8gZmxhdDogb3JkZXJGb3JtLmVsZW1lbnRzLmZsYXQudmFsdWUsXHJcbiAgICAgICAgLy8gZmxvb3I6IG9yZGVyRm9ybS5lbGVtZW50cy5mbG9vci52YWx1ZSxcclxuICAgICAgICBjb21tZW50OiBvcmRlckZvcm0uZWxlbWVudHMuY29tbWVudC52YWx1ZSxcclxuICAgICAgICBlbWFpbDogJ2VtYWlsQHRlc3QnXHJcbiAgICAgIH07XHJcbiAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBkYXRhLm5hbWUpO1xyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob25lJywgZGF0YS5waG9uZSk7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnY29tbWVudCcsIGRhdGEuY29tbWVudCk7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZW1haWwnLCBkYXRhLmVtYWlsKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG4gICAgICB4aHIub3BlbignUE9TVCcsICdodHRwczovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vc2VuZG1haWwvZmFpbCcpO1xyXG4gICAgICB4aHIuc2VuZChmb3JtRGF0YSk7XHJcbiAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PiB7XHJcbiAgICAgICAgaWYgKHhoci5yZXNwb25zZS5zdGF0dXMpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlTW9kYWwoeGhyLnJlc3BvbnNlLm1lc3NhZ2UpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVNb2RhbCh4aHIucmVzcG9uc2UubWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgfSlcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHZhbGlkYXRlRm9ybShmb3JtKSB7XHJcbiAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG5cclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5uYW1lLmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMucGhvbmUuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5zdHJlZXQuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5ob3VzZS5jaGVja1ZhbGlkaXR5KCkpIHZhbGlkID0gIXZhbGlkO1xyXG4gICAgaWYgKCFmb3JtLmVsZW1lbnRzLmJvZHkuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5mbGF0LmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcbiAgICBpZiAoIWZvcm0uZWxlbWVudHMuZmxvb3IuY2hlY2tWYWxpZGl0eSgpKSB2YWxpZCA9ICF2YWxpZDtcclxuICAgIGlmICghZm9ybS5lbGVtZW50cy5jb21tZW50LmNoZWNrVmFsaWRpdHkoKSkgdmFsaWQgPSAhdmFsaWQ7XHJcblxyXG4gICAgcmV0dXJuIHZhbGlkXHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlTW9kYWwoY29udGVudCkge1xyXG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWxfX2NvbnRhaW5lcicpO1xyXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgICAgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbF9fdGl0bGUnKTtcclxuICAgIHRpdGxlLmlubmVyVGV4dCA9IGNvbnRlbnQ7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnbW9kYWxfX2J1dHRvbicpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi0tY29sb3ItLWdyZWVuJyk7XHJcbiAgICBidXR0b24udHlwZSA9ICdidXR0b24nO1xyXG4gICAgYnV0dG9uLmlubmVyVGV4dCA9ICfQl9Cw0LrRgNGL0YLRjCc7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgaWYgKCEodGFyZ2V0ID09PSBjb250YWluZXIgfHwgdGFyZ2V0ID09PSB0aXRsZSkpIHtcclxuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBpZiAoZS5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAvLyAgIG1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICAvLyB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBtb2RhbFxyXG4gIH07XHJcblxyXG59KSgpXHJcbiIsIihmdW5jdGlvbigpIHsgICAgXHJcbiAgY29uc3QgcHJvZHVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19jb250YWluZXInKSxcclxuICAgICAgICBwcm9kdWN0SXRlbUFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0X19pdGVtJyksXHJcbiAgICAgICAgYnRuUHJldmlvdXMgPSAnYnV0dG9uLnByb2R1Y3RfX3ByZXZpb3VzJyxcclxuICAgICAgICBidG5OZXh0ID0gJ2J1dHRvbi5wcm9kdWN0X19uZXh0JyxcclxuICAgICAgICBwcm9kdWN0SWl0ZW1BY3RpdmUgPSAncHJvZHVjdF9faXRlbS0tYWN0aXZlJztcclxuICBsZXQgaUFjdGl2ZSA9IDA7XHJcblxyXG4gIHByb2R1Y3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICAgIC8vINC/0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LRcclxuICAgIGlmKGV2ZW50LnRhcmdldC5tYXRjaGVzKGJ0blByZXZpb3VzKSl7XHJcbiAgICAgIGlmIChwcm9kdWN0SXRlbUFsbFtpQWN0aXZlIC0gMV0pIHtcclxuICAgICAgICBwcm9kdWN0VG9nZ2xlKGlBY3RpdmUgLSAxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9kdWN0VG9nZ2xlKHByb2R1Y3RJdGVtQWxsLmxlbmd0aCAtIDEpO1xyXG4gICAgICB9XHJcbiAgICAvLyDRgdC70LXQtNGD0Y7RidC40Lkg0YHQu9Cw0LnQtCAgXHJcbiAgICB9IGVsc2UgaWYoZXZlbnQudGFyZ2V0Lm1hdGNoZXMoYnRuTmV4dCkpe1xyXG4gICAgICBpZiAocHJvZHVjdEl0ZW1BbGxbaUFjdGl2ZSArIDFdKSB7XHJcbiAgICAgICAgcHJvZHVjdFRvZ2dsZShpQWN0aXZlICsgMSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZHVjdFRvZ2dsZSgwKTtcclxuICAgICAgfVxyXG4gICAgfSAgXHJcbiAgfSlcclxuXHJcbiAgZnVuY3Rpb24gcHJvZHVjdFRvZ2dsZShpTmV4dCkge1xyXG4gICAgcHJvZHVjdEl0ZW1BbGxbaUFjdGl2ZV0uY2xhc3NMaXN0LnRvZ2dsZShwcm9kdWN0SWl0ZW1BY3RpdmUpO1xyXG4gICAgaUFjdGl2ZSA9IGlOZXh0O1xyXG4gICAgcHJvZHVjdEl0ZW1BbGxbaUFjdGl2ZV0uY2xhc3NMaXN0LnRvZ2dsZShwcm9kdWN0SWl0ZW1BY3RpdmUpO1xyXG4gIH1cclxufSkoKSIsIihmdW5jdGlvbigpIHtcclxuICBjb25zdCByZXZpZXdzV3JhcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX3dyYXBlcicpLFxyXG4gICAgICAgIGZlZWRiYWNrQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZlZWRiYWNrJyksXHJcblxyXG4gICAgICAgIHJldmlld3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2xpc3QnKSxcclxuICAgICAgICByZXZpZXdzQWxsID0gcmV2aWV3c0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnJldmlld3NfX2l0ZW0nKSxcclxuICAgICAgICByZXZpZXdzQWN0aXZlID0gJ3Jldmlld3NfX2l0ZW0tLWFjdGl2ZScsICAgICAgICBcclxuXHJcbiAgICAgICAgcmV2aWV3c0J1dHRvbiA9ICdyZXZpZXdzX19idXR0b24nO1xyXG5cclxuICBsZXQgbGFzdEFjdGl2ZSA9IDAsXHJcbiAgICAgIHJldmlld3NDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2NvbnRlbnQnKS5jbGllbnRXaWR0aDtcclxuXHJcbiAgcmV2aWV3c1dyYXBlci5zdHlsZS53aWR0aCA9IHJldmlld3NDb250ZW50ICogZmVlZGJhY2tBbGwubGVuZ3RoICsgJ3B4JztcclxuXHJcbiAgcmV2aWV3c0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57XHJcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTsgLy8gYnV0dG9uXHJcbiAgICBcclxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHJldmlld3NCdXR0b24pKSB7XHJcbiAgICAgIHJldmlld3NUb2dnbGUodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpIC0gMSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiByZXZpZXdzVG9nZ2xlKG5leHRBY3RpdmUpIHtcclxuICAgIHJldmlld3NBbGxbbGFzdEFjdGl2ZV0uY2xhc3NMaXN0LnJlbW92ZShyZXZpZXdzQWN0aXZlKTtcclxuICAgIGxhc3RBY3RpdmUgPSBuZXh0QWN0aXZlOyAvLyDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LVcclxuICAgIHJldmlld3NBbGxbbmV4dEFjdGl2ZV0uY2xhc3NMaXN0LmFkZChyZXZpZXdzQWN0aXZlKTtcclxuICAgIFxyXG4gICAgcmV2aWV3c1dyYXBlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgLSByZXZpZXdzQ29udGVudCAqIG5leHRBY3RpdmUgKyAncHgpJztcclxuICB9O1xyXG4gIFxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKT0+e1xyXG4gICAgcmV2aWV3c0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fY29udGVudCcpLmNsaWVudFdpZHRoLFxyXG4gICAgXHJcbiAgICByZXZpZXdzV3JhcGVyLnN0eWxlLndpZHRoID0gcmV2aWV3c0NvbnRlbnQgKiBmZWVkYmFja0FsbC5sZW5ndGggKyAncHgnO1xyXG4gICAgcmV2aWV3c1dyYXBlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgLSByZXZpZXdzQ29udGVudCAqIGxhc3RBY3RpdmUgKyAncHgpJztcclxuICB9KTtcclxuICAgIFxyXG59KSgpIiwiKGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IHRlYW1Ub2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVhbV9fbGlzdCcpXHJcbiAgICAgICAgdGVhbUJ1dHRvbiA9ICdhLnRlYW1fX25hbWUnLFxyXG4gICAgICAgIHRlYW1Ub2dnbGVBY3RpdmUgPSAndGVhbV9faXRlbS0tYWN0aXZlJztcclxuICBsZXQgcHJldmlvdXNDbGljayA9IG51bGw7XHJcblxyXG4gIHRlYW1Ub2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57ICBcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZihldmVudC50YXJnZXQubWF0Y2hlcyh0ZWFtQnV0dG9uKSkge1xyXG4gICAgICAvLyDQtdGB0LvQuCB0cnVlLCDRgtC+INC90LDQttCw0YLQuNC1INC/0YDQvtC40LfQvtGI0LvQviDQv9C+INCw0LrRgtC40LLQvdC+0LzRgyDRjdC70LXQvNC10L3RgtGDXHJcbiAgICAgIGlmIChldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucyh0ZWFtVG9nZ2xlQWN0aXZlKSkge1xyXG4gICAgICAgIHJlbW92ZVRvZ2dsZShldmVudC50YXJnZXQpICAgIFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vINC10YHQu9C4IHRydWUsINGC0L4g0YPQsdC40YDQsNC10Lwg0YHRgtC40LvQuCDRgSDQv9GA0LXQtNGL0LTRg9GJ0LXQs9C+INCw0LrRgtC40LLQvdC+0LPQviDRjdC70LXQvNC10L3RgtCwXHJcbiAgICAgICAgaWYgKHByZXZpb3VzQ2xpY2spIHtcclxuICAgICAgICAgIHJlbW92ZVRvZ2dsZShwcmV2aW91c0NsaWNrKVxyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAgXHJcbiAgICAgICAgICAgIGFkZFRvZ2dsZShldmVudC50YXJnZXQpICAgICBcclxuICAgICAgICAgIH0sIDI5MCk7XHJcbiAgICAgICAgfSAgICAgICBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGFkZFRvZ2dsZShldmVudC50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZVRvZ2dsZShlbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKHRlYW1Ub2dnbGVBY3RpdmUpOyAgXHJcbiAgICBlbGVtZW50LnBhcmVudE5vZGUucHJldmlvdXNFbGVtZW50U2libGluZy5zdHlsZS5oZWlnaHQgPSBudWxsOyBcclxuICAgIHByZXZpb3VzQ2xpY2sgPSBudWxsOyBcclxuICB9XHJcbiAgZnVuY3Rpb24gYWRkVG9nZ2xlKGVsZW1lbnQpIHtcclxuICAgIGxldCBpbWdIZWlnaHQgPSBlbGVtZW50LnBhcmVudE5vZGUucHJldmlvdXNFbGVtZW50U2libGluZy5vZmZzZXRIZWlnaHQsIFxyXG4gICAgICAgIGluZm9IZWlnaHQgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5vZmZzZXRIZWlnaHQsXHJcbiAgICAgICAgbmV3SW1nSGVpZ2h0ID0gaW1nSGVpZ2h0IC0gaW5mb0hlaWdodDtcclxuXHJcbiAgICBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKHRlYW1Ub2dnbGVBY3RpdmUpOyAgICAgICAgXHJcbiAgICBlbGVtZW50LnBhcmVudE5vZGUucHJldmlvdXNFbGVtZW50U2libGluZy5zdHlsZS5oZWlnaHQgPSBuZXdJbWdIZWlnaHQgKyAncHgnO1xyXG4gICAgcHJldmlvdXNDbGljayA9IGVsZW1lbnQ7IFxyXG4gIH1cclxuICAgIFxyXG59KSgpIl19
