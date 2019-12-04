const teamToggle = document.querySelector('.team__list'),
      teamToggleActive = 'team__item--active';

teamToggle.addEventListener('click', ()=>{
  if(event.target.matches('a')) event.target.parentNode.classList.toggle(teamToggleActive);  
})


