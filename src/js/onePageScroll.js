(function () {
  const sectionCount = (document.querySelectorAll(".section").length - 1) * -1, // используется для определения конца страницы. -1 потому что на первой странице transform не применяется. умножаем на -1(получаем отрицательное значение), что бы в дальнейшем сравнивать количество секций с номером текущей секции
    paginationList = document.querySelector(".pagination__list"),
    navList = document.querySelector(".nav__list"),
    orderButtons = document.querySelectorAll(".scroll-order"), // кнопки заказать в секции promo и product
    paginationAll = document.querySelectorAll(".pagination__item"),
    paginationActive = "pagination__item--active";
  let currentActive = 0, // номер текущей секции
    touch = [], // запоминаем 2 значение clientY при событии touch для определения направления сколла
    lastActive = 0, // последняя активная секция (используется для того, что бы убрать активный класс с пагинации)
    isScroll = false;

  function moveScroll(direction) {
    if (isScroll) return;

    if (direction === "down") {
      currentActive--;
      scroll();
    } else {
      currentActive++;
      scroll();
    }
  }

  function scroll() {
    //проверяем нужно ли выполнять скролл
    if (currentActive < sectionCount) return (currentActive = sectionCount); // конец страницы
    if (currentActive > 0) return (currentActive = 0); // начало страницы

    const main = document.querySelector(".main");
    main.style.transform = `translateY(${currentActive * 100}%)`;

    isScroll = !isScroll;
    setTimeout(() => {
      paginationAll[lastActive].classList.toggle(paginationActive); // удаляем класс
      lastActive = currentActive * -1; // обновляем значение
      paginationAll[lastActive].classList.toggle(paginationActive); // добавляем класс

      isScroll = !isScroll;
      touch = [];
    }, 650);
  }

  document.addEventListener("wheel", (event) => {
    const delta = event.deltaY,
      scroll = delta > 0 ? "down" : "up";
    if (event.path[0].matches("ymaps")) return;
    moveScroll(scroll);
  });
  paginationList.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains("pagination__link")) {
      currentActive = -target.dataset.scroll;
      scroll();
    }
  });
  navList.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains("nav__link")) {
      currentActive = -target.dataset.scroll;
      scroll();
    }
  });
  orderButtons.forEach((orderButton) => {
    orderButton.addEventListener("click", () => {
      currentActive = -orderButton.dataset.scroll;
      scroll();
    });
  });
  document.addEventListener("keydown", (event) => {
    const tagName = event.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";

    if (userTypingInInputs) return;

    if (event.keyCode === 40) {
      moveScroll("down");
    } else if (event.keyCode === 38) {
      moveScroll("up");
    }
  });
  document.addEventListener("touchmove", (event) => {
    const deltaY = event.changedTouches[0].clientY;
    touch.push(deltaY);
    if (touch.length === 2) {
      const scroll = touch[0] > touch[1] ? "down" : "up";
      moveScroll(scroll);
      return;
    }
  });
})();
