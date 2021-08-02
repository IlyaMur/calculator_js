"use strict";

let money = 50000,
  income = "фриланс",
  addExpenses = "такси, собака, ЗОЖ",
  deposit = true,
  mission = 1000000,
  period = 6,
  budgetDay = money / 30;

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

money = +prompt("Ваш месячный доход?");
addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
deposit = confirm("Есть ли у вас депозит в банке?");

const expensesQuestion = () => prompt("Введите обязательную статью расходов?"),
  moneyQuestion = () => prompt("Во сколько это обойдется?");

let expensesArray = [],
  amountsArray = [],
  timesToAsk = 2;

for (let i = timesToAsk; i--;) { expensesArray.push(expensesQuestion()); }
for (let i = timesToAsk; i--;) { amountsArray.push(moneyQuestion()); }

let [expenses1, expenses2] = expensesArray;
let [amount1, amount2] = amountsArray;


let budgetMonth = money -
  amountsArray
    .map((el) => +el)
    .reduce((sum, amount) => sum + amount);

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
