"use strict";

// Кнопку "Рассчитать" через id
let calculateBtn = document.getElementById('start');

// Кнопки “+” (плюс) через Tag, каждую в своей переменной. 
// Раз просили через 'Tag', сделал вместо querySelector через getElementsByTagName
let buttons = document.getElementsByTagName('button');
let incomeAddButton;
let expensesAddButton;
for (let element of buttons) {
  if (element.className === 'btn_plus expenses_add') {
    expensesAddButton = element;
  } else if (element.className === 'btn_plus income_add') {
    incomeAddButton = element;
  }
}

// Чекбокс по id через querySelector
let depositCheckbox = document.querySelector('#deposit-check');

// Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
let additionalIncomeItems = document.querySelectorAll('.additional_income-item');
let firtsIncomeForm = additionalIncomeItems[0];
let secondIncomeForm = additionalIncomeItems[1];

// Каждый элемент в правой части программы через класс(не через querySelector), 
// которые имеют в имени класса "-value", начиная с class="budget_day-value" 
// и заканчивая class="target_month-value">
let budgetDay = document.getElementsByClassName('budget_day-value')[0];
let expensesMonth = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncome = document.getElementsByClassName('additional_income-value')[0];
let additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriod = document.getElementsByClassName('income_period-value')[0];
let targetMonth = document.getElementsByClassName('target_month-value')[0];

// Оставшиеся поля через querySelector каждый в отдельную переменную:
// поля ввода(input) с левой стороны и не забудьте про range.
let budgetMonth = document.querySelector('.budget_month-value');
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-items>.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-items>.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');


function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isString(s) {
  return !(isNumber(s) || s === undefined || s === null || s === '');
}

function capitalizeFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}


let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1000000,
  pediod: 3,
  start: function () {
    if (salaryAmount.value === '') {
      alert('Ошибка! Поле "Месячный доход" должно быть заполнено.');
      return;
    }
    appData.budget = salaryAmount.value;

    appData.getExpenses();

    appData.getExpensesMonth();

    appData.getBudget();
    // appData.getInfoDeposit();

    appData.getAddExpenses();
    appData.getAddIncome();
    appData.showResult();
  },
  showResult: function () {
    budgetMonth.value = appData.budgetMonth;
    budgetDay.value = appData.budgetDay;
    expensesMonth.value = appData.expensesMonth;
    additionalExpenses.value = appData.addExpenses.join(', ');
    additionalIncome.value = appData.addIncome.join(', ');


  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length > 2) {
      expensesAddButton.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }

    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });

  },
  asking: function () {
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      let cashIncome;

      while (!isString(itemIncome)) {
        itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Фотограф');
      }

      while (!isNumber(cashIncome)) {
        cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?', 10000);
      }

      appData.income[itemIncome] = cashIncome;
    }


    appData.addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую"
    );
    appData.addExpenses = appData.addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    let answExp;
    let answMoney;

    // for (let i = 0; i < 2; i++) {

    //   while (!isString(answExp)) {
    //     answExp = prompt("Введите обязательную статью расходов?");
    //   }
    //   while (!isNumber(answMoney)) {
    //     answMoney = prompt("Во сколько это обойдется?");
    //   }

    //   appData.expenses[answExp] = +answMoney;

    //   answExp = null;
    //   answMoney = null;
    // }
  },

  getExpensesMonth: function () {
    for (let i in appData.expenses) {
      appData.expensesMonth += +appData.expenses[i];
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
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      let yearPercent;
      let sum;

      while (!isNumber(yearPercent)) {
        yearPercent = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(sum)) {
        sum = prompt('Какая сумма заложена?', 10000);
      }

      appData.percentDeposit = yearPercent;
      appData.moneyDeposit = sum;
    }
  },

  calcSavedMoney: function () {
    return appData.budgetMonth * appData.pediod;
  }
};


// console.log('Расходы за месяц', appData.expensesMonth);
// console.log(`Цель будет достигнута за: ${appData.getTargetMonth()} мес.`);
// console.log(appData.getStatusIncome());

// console.log(
//   appData.addExpenses
//     .map(
//       function (word) {
//         return word[0].toUpperCase() + word.slice(1);
//       })
//     .join(', ')
// );

// console.log('Наша программа включает в себя данные:');
// for (let i in appData) {
//   console.log(i, appData[i]);
// }



//-----------------------  LESSON 09


// -------------------   LESSON 11 

calculateBtn.addEventListener('click', appData.start);
expensesAddButton.addEventListener('click', appData.addExpensesBlock);
