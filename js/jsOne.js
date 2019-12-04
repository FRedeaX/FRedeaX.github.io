console.log('--Типы данных и переменные');
var name = 'Тимофей';
console.log(name);
name = 'Дмитрий';
console.log(name);

console.log('--Условный оператор if');
if (9 < 21) {
  console.log('9 меньше 21');
} else {
  console.log('9 больше 21');
}
if (9 < 3) {
  console.log('9 меньше 3');
} else {
  console.log('9 больше 3');
}

console.log('--Циклический оператор for');
for (let i = 0; i < 10; i++) {
  console.log(i);
}

console.log('--Функции');
function sum(p1, p2, p3) {
  let result = p1 + p2 + p3;
  return result;
}

let amount = sum(10, 20 , 30);
console.log(amount);
amount = sum(3, 5 , 7);
console.log(amount);

console.log('--Задание 1');
let arr = ['Привет', 'LoftSchol'];
arr.push('я изучаю');
arr.push('JavaScript');
console.log(arr.length);
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);  
}

console.log('--Задание 2');
arr = [203, 3, 66, 927, 48, 5, 25, 405, 95, 10];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] > 100) {
    console.log(arr[i]);
  }  
}

console.log('--Задание 3');
let user = {
  name: 'Тимофей',
  lastName: 'Пастушенко',
  age: '23'
};
console.log(user.name);
console.log(user.lastName);
console.log(user.age);
user.city = 'Байконур';
console.log(user.city);

console.log('--Задание 3');
function hello(human) {
  let myNameIs = 'Привет, меня зовут ' + human.name + ' ' + human.lastName + ' и мне ' + human.age + ' года!';
  return myNameIs
}
let myNameIs = hello(user);
console.log(myNameIs);
