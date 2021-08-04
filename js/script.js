"use strict";

let money;
while (!isNumber(money)) {
  money = prompt("Ваш месячный доход?");
}
let income = "фриланс";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 1000000;
let period = 6;
let budgetDay = money / 30;
let expenses = [];
let amounts = [];

console.log(
  `money: ${typeof money}`,
  `\nincome: ${typeof income}`,
  `\ndeposit: ${typeof deposit}`
);

// ----------- LESSON 5

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function start(expenses, amounts) {
  // Создам два новых массива, чтобы не мутировать старые
  let expAr = expenses;
  let amAr = amounts;

  // наполняю новые массивы ответами
  for (let i = 2; i--;) {
    expAr.push(
      prompt("Введите обязательную статью расходов?")
    );

    let number;
    do {
      number = prompt("Во сколько это обойдется?"
      );
    } while (!isNumber(number));
    amAr.push(number);
  }

  // возвращаю новые наполненные массивы
  return [expAr, amAr];
}

// Всё ради чистой функции. 
// Присваиваю возвращённые массивы переменным.
let [expensesArray, amountsArray] = start(expenses, amounts);

let [expenses1, expenses2] = expensesArray;
let [amount1, amount2] = amountsArray;


function getExpensesMonth(amount1, amount2) {
  return (+amount1 + (+amount2));
}

function getAccumulatedMonth(money, amount1, amount2) {
  return money - getExpensesMonth(amount1, amount2);
}

let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
budgetDay = Math.floor(accumulatedMonth / 30);

function getTargetMonth(mission, accumulatedMonth) {
  return Math.ceil(mission / accumulatedMonth);
}

function getStatusIncome(budgetDay) {
  let statusMessage;

  switch (true) {
    case (budgetDay > 1200):
      statusMessage = 'У вас высокий уровень дохода';
      break;
    case (budgetDay >= 600 && budgetDay < 1200):
      statusMessage = 'У вас средний уровень дохода';
      break;
    case (budgetDay < 600 && budgetDay >= 0):
      statusMessage = 'К сожалению, у вас уровень дохода ниже среднего';
      break;
    default:
      statusMessage = 'Что-то пошло не так';
  }

  return statusMessage;
}

console.log(addExpenses.toLowerCase().split(", "));
console.log(`Расходы за месяц: ${getExpensesMonth(amount1, amount2)}`);
console.log(`Бюджет на день: ${budgetDay} руб.`);
console.log(`Бюджет на месяц: ${accumulatedMonth} руб.`);

let month = getTargetMonth(mission, accumulatedMonth);

if (month > 0) {
  console.log(`Цель будет достигнута за: ${month} мес.`);
} else {
  console.log('Цель не будет достигнута');
}

console.log(getStatusIncome(budgetDay));