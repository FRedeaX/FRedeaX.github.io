(function() {
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

})()