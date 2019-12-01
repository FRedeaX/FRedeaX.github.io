const teamToggleAll = document.querySelectorAll('.team__toggle'),
      teamToggleActive = 'team__toggle--active';

teamToggleAll.forEach(teamToggle => {
  teamToggle.addEventListener('click', ()=> {
    if (teamToggle.classList.contains(teamToggleActive)) {
      teamToggle.classList.toggle(teamToggleActive);     
    } else {
      teamToggle.classList.toggle(teamToggleActive);     
    }
  })
});