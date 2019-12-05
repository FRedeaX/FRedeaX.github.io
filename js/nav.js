const nav = document.querySelector('.nav'),
      navActive = 'nav--active',
      btnHamburger = document.querySelector('.header__hamburger'),
      btnHamburgerClose = 'btn-hamburger--close',
      noScroll = 'no-scroll';

btnHamburger.addEventListener('click', ()=>{  
  nav.classList.toggle(navActive);
  btnHamburger.classList.toggle(btnHamburgerClose);
  document.body.classList.toggle(noScroll);
})
