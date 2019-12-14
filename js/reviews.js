function reviews() {
  const feedbackAll = document.querySelectorAll('.feedback'),
        feedbackActive = 'feedback--active',

        reviewsList = document.querySelector('.reviews__list'),
        reviewsAll = reviewsList.querySelectorAll('.reviews__item'),
        reviewsActive = 'reviews__item--active',        

        reviewsButton = 'reviews__button';

  let lastActive = 0;

  reviewsList.addEventListener('click', (event)=>{
    const target = event.target.parentNode; // button
    
    if (target.classList.contains(reviewsButton)) {
      reviewsToggle(target.getAttribute('data-id') - 1);
    }
  })

  function reviewsToggle(nextActive) {
    feedbackAll[lastActive].classList.remove(feedbackActive);
    reviewsAll[lastActive].classList.remove(reviewsActive);
    lastActive = nextActive; // новое значение
    feedbackAll[nextActive].classList.add(feedbackActive);
    reviewsAll[nextActive].classList.add(reviewsActive);
  }
};

reviews();