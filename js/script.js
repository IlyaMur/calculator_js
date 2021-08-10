const booksCollection = document.querySelectorAll('.book');

// Восстановить порядок книг.
const book1 = booksCollection[1];
const book2 = booksCollection[0];
const book3 = booksCollection[4];
const book4 = booksCollection[3];
const book5 = booksCollection[5];
const book6 = booksCollection[2];

book1.after(book2);
book2.after(book3);
book3.after(book4);
book5.after(book6);

// Заменить картинку заднего фона на другую из папки image
const body = document.querySelector('body');
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
const textToFix = book3.querySelector('a');
textToFix.textContent = "Книга 3. this и Прототипы Объектов";

// Удалить рекламу со страницы
const adv = document.querySelector('.adv');
adv.remove();

// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
// book2
const liBook2 = book2.querySelectorAll('li');

const book2Chapter1 = liBook2[3];
const book2Chapter2 = liBook2[6];
const book2Chapter3 = liBook2[8];
const book2Chapter4 = liBook2[4];

const extraCBook2 = liBook2[2];
const extraBBook2 = liBook2[9];

book2Chapter1.after(book2Chapter2);
book2Chapter2.after(book2Chapter3);
book2Chapter3.after(book2Chapter4);
extraBBook2.after(extraCBook2);

// book5
const liBook5 = book5.querySelectorAll('li');

const book5Chapter1 = liBook5[9];
const book5Chapter2 = liBook5[3];
const book5Chapter3 = liBook5[4];
const book5Chapter4 = liBook5[2];
const book5Chapter5 = liBook5[6];
const book5Chapter6 = liBook5[7];
const bookt5ExtraA = liBook5[5];
const bookt5ExtraB = liBook5[8];
const bookt5ExtraC = liBook5[10];

book5Chapter2.before(book5Chapter1);
book5Chapter5.before(book5Chapter4);
bookt5ExtraB.before(bookt5ExtraA);

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const chapter8Book6 = document.createElement('li');
chapter8Book6.textContent = 'Глава 8: За пределами ES6';

const chapter7Book6 = book6.querySelectorAll('li')[8];
chapter7Book6.after(chapter8Book6);
