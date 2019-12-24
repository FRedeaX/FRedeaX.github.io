(function() {    
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
              menuItemAll[i].querySelector('.menu-accordion__content').style.width = menuWidth - menuToggleWidth + 'px';
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

