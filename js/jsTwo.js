const divOne = document.createElement('div');
document.body.appendChild(divOne);
divOne.innerText = 'Этот элемент создан при помощи DOM API';

const divTwo = document.createElement('div');
divTwo.className = 'inner';
divTwo.innerHTML = 'Этот элемент тоже создан при помощи DOM API';
divOne.appendChild(divTwo);

divTwo.style.color = 'red';

divOne.addEventListener('click', ()=>{
  console.log('Этот текст говорит о том, что я всё сделал правильно');
});

const a = document.createElement('a');
a.href = 'https://loftschool.com';
a.text = 'loftschool.com';
document.body.appendChild(a);
a.addEventListener('click', (e)=>{
  e.preventDefault();
  let href = a.href,
      text = 'Я кликнул на ссылку ' + href;
  console.log(text);  
});

const input = document.createElement('input'),
      button = document.createElement('button');
button.innerText = 'Задание 6';
document.body.appendChild(input);
document.body.appendChild(button);
button.addEventListener('click', ()=>{
  let text = input.value;
  console.log(text);
})

const left = document.querySelector("#left");
const right = document.querySelector("#right");
const items = document.querySelector("#items");
const itemsWidth =items.offsetWidth;
let shift = 0;

right.addEventListener("click", function() {
  // напишите здесь код, который сдвигает items на 100px вправо
  // если items уже сдвинут на 5 элементов впарво, то больше элементы сдвигать не надо, т.к. вы достигли конца списка
  if ((shift + 300) < itemsWidth) { 
    shift += 100;  
    items.style.right = shift + 'px'; 
  }
});

left.addEventListener("click", function() {
  // напишите здесь код, который сдвигает items на 100px влево
  // если item находится в самом начале, то больше элементы сдвигать влево не надо, т.к. вы достигли начала списка
  if(shift > 0 && shift !== 0){
    shift -= 100;  
    items.style.right = shift + 'px';
  }
});

