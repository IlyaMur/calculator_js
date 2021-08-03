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

// ----------- LESSON 3

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

// ----------- LESSON 4

function getExpensesMonth() {
  return (+amount1 + (+amount2));
}
budgetDay = Math.floor(getExpensesMonth() / 30);

function getAccumulatedMonth() {
  return money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

function getStatusIncome() {
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
console.log(`Расходы за месяц: ${getExpensesMonth()}`);
console.log(`Бюджет на день: ${budgetDay} руб.`);
console.log(`Бюджет на месяц: ${getAccumulatedMonth()} руб.`);
console.log(`Цель будет достигнута за: ${getTargetMonth()} мес.`);
console.log(getStatusIncome());

