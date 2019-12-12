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