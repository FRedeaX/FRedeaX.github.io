function reviews() {
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
};

reviews();