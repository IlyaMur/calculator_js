"use strict";

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
while (!isNumber(money)) {
  money = prompt("Ваш месячный доход?");
}


let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: {},
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1000000,
  pediod: 3,
  asking: function () {
    appData.addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую"
    );
    appData.addExpenses = appData.addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    let answExp;
    let answMoney;

    for (let i = 2; i--;) {
      answExp = (
        prompt("Введите обязательную статью расходов?")
      );
      do {
        answMoney = prompt("Во сколько это обойдется?"
        );
      } while (!isNumber(answMoney));

      appData.expenses[answExp] = +answMoney;
    }
  },

  getExpensesMonth: function () {
    for (let i in appData.expenses) {
      appData.expensesMonth += appData.expenses[i];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },

  getStatusIncome: function () {
    let statusMessage;

    switch (true) {
      case (appData.budgetDay > 1200):
        statusMessage = 'У вас высокий уровень дохода';
        break;
      case (appData.budgetDay >= 600 && appData.budgetDay < 1200):
        statusMessage = 'У вас средний уровень дохода';
        break;
      case (appData.budgetDay < 600 && appData.budgetDay >= 0):
        statusMessage = 'К сожалению, у вас уровень дохода ниже среднего';
        break;
      default:
        statusMessage = 'Что-то пошло не так';
    }

    return statusMessage;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц', appData.expensesMonth);
console.log(`Цель будет достигнута за: ${appData.getTargetMonth()} мес.`);
console.log(appData.getStatusIncome());


console.log('Наша программа включает в себя данные:');
for (let i in appData) {
  console.log(i, appData[i]);
}