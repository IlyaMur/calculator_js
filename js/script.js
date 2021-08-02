"use strict";

let money = +prompt("Ваш месячный доход?");
let income = "фриланс";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 1000000;
let period = 6;
let budgetDay = money / 30;
let expensesArray = [];
let amountsArray = [];
let timesToAsk = 2;

console.log(
  `money: ${typeof money}`,
  `\nincome: ${typeof income}`,
  `\ndeposit: ${typeof deposit}`
);

console.log(addExpenses.length);

console.log(
  `Период равен ${period} месяцев`,
  `\nЦель заработать ${mission} рублей/долларов/гривен/юани`
);

console.log(addExpenses.toLowerCase().split(", "));

console.log(budgetDay);

// ----------- LESSON 3

console.log('----------- LESSON 3 -----------');

for (let i = timesToAsk; i--;) {
  expensesArray.push(
    prompt("Введите обязательную статью расходов?")
  );
  amountsArray.push(
    prompt("Во сколько это обойдется?")
  );
}

let [expenses1, expenses2] = expensesArray;
let [amount1, amount2] = amountsArray;

let budgetMonth = money -
  amountsArray
    .map(function (el) { return +el; })
    .reduce(function (sum, amount) { return (sum + amount); });

budgetDay = Math.floor(budgetMonth / 30);

console.log(`Бюджет на день: ${budgetDay} руб.`);
console.log(`Бюджет на месяц: ${budgetMonth} руб.`);
console.log(`Цель будет достигнута за: ${Math.ceil(mission / budgetMonth)} мес.`);

switch (true) {
  case (budgetDay > 1200):
    console.log('У вас высокий урвоень дохода');
    break;
  case (budgetDay >= 600 && budgetDay < 1200):
    console.log('У вас средний уровень дохода');
    break;
  case (budgetDay < 600 && budgetDay >= 0):
    console.log('К сожалению у вас уровень дохода ниже среднего');
    break;
  default:
    console.log('Что то пошло не так');
}