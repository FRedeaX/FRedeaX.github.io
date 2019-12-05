const menuToggleAll = document.querySelectorAll('.menu-accordion__btn'),
menuAccordionContent = document.querySelector('.menu-accordion__content'),
      menuToggleActive = 'menu-accordion__item--active';
let lastMenuActive = 1,
    menuWidth = document.querySelector('.menu').offsetWidth,
    allToggleWidth = menuToggleAll[0].offsetWidth * menuToggleAll.length;
      
menuToggleAll.forEach((menuToggle, menuToggleIndex) => {  
  menuToggle.addEventListener('click', ()=> {
    menuItem = menuToggle.parentNode;
    // если true, то нажатие произошло по активной секции
    if (menuItem.classList.contains(menuToggleActive)) {  
      menuItem.classList.remove(menuToggleActive);
      lastMenuActive = null;
      menuToggle.nextElementSibling.style.width = null;  
    } else { 
      if (menuWidth < (520 + allToggleWidth)) {
        let mw = menuWidth - allToggleWidth;
        menuToggle.nextElementSibling.style.width = mw +'px';
      } 
      if (lastMenuActive) {
        menuToggleAll[lastMenuActive - 1].parentNode.classList.toggle(menuToggleActive);       
        menuToggleAll[lastMenuActive - 1].nextElementSibling.style.width = null;        
      }
      menuItem.classList.add(menuToggleActive);   
      lastMenuActive = menuToggleIndex + 1;
    }
  });
});

const menuCloseBtnAll = document.querySelectorAll('.menu-accordion__close-btn');
menuCloseBtnAll.forEach(menuCloseBtn => {  
  menuCloseBtn.addEventListener('click', ()=> {
    menuCloseBtn.parentNode.parentNode.classList.toggle(menuToggleActive);   
    lastMenuActive = null;
    menuCloseBtn.parentNode.style.width = null; 
  });
});

window.addEventListener('resize', ()=>{
  menuWidth = document.querySelector('.menu').offsetWidth;
  allToggleWidth = menuToggleAll[0].offsetWidth * menuToggleAll.length
})
