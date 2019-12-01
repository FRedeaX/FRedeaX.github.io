const menuToggleAll = document.querySelectorAll('.menu-accordion__item'),
      menuToggleActive = 'menu-accordion__item--active';
let lastMenuActive = 1;
      
menuToggleAll.forEach((menuToggle, menuToggleIndex) => {
  menuToggle.addEventListener('click', ()=> {
    if (menuToggle.classList.contains(menuToggleActive)) {  
      menuToggle.classList.toggle(menuToggleActive);
      lastMenuActive = null;     
    } else {
      if (lastMenuActive) menuToggleAll[lastMenuActive - 1].classList.toggle(menuToggleActive);       
      menuToggle.classList.toggle(menuToggleActive);   
      lastMenuActive = menuToggleIndex + 1;
    }

    menuCloseBtn = document.querySelector('.menu-accordion__btn');
    menuCloseBtn.addEventListener('click', ()=>{
      menuToggle.classList.toggle(menuToggleActive);   
      lastMenuActive = menuToggleIndex + 1;
    });
  });
});