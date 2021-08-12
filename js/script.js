"use strict";

// Кнопку "Рассчитать" через id
let calculateBtn = document.getElementById('start');
let cancelBtn = document.getElementById('cancel');

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
let firtIncomeForm = additionalIncomeItems[0];
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
let incomeCash = document.querySelector('.income-items>.income-amount');
let expensesTitle = document.querySelector('.expenses-items>.expenses-title');
let expensesCash = document.querySelector('.expenses-items>.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');

let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');

let allInputsData = document.querySelectorAll('.data input');

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {
    this.budget = +salaryAmount.value;

    this.changeInputsState(true);
    calculateBtn.style.display = 'none';
    cancelBtn.style.display = 'block';

    incomeAddButton.disabled = true;
    expensesAddButton.disabled = true;

    for (let i = 0; i < incomeItems.length; i++) {
      changeNodestate(incomeItems[i], true);
    }

    for (let i = 0; i < expensesItems.length; i++) {
      changeNodestate(expensesItems[i], true);
    }

    this.getExpenses();
    this.getExpensesMonth();

    this.getAddExpenses();
    this.getAddIncome();

    this.getIncome();
    this.getBudget();

    this.showResult();
  },
  reset: function () {
    this.changeInputsState(false);

    calculateBtn.style.display = 'block';
    cancelBtn.style.display = 'none';

    incomeAddButton.disabled = false;
    expensesAddButton.disabled = false;

    allInputsData.forEach(function (item) {
      item.value = '';
    });

    for (let i = 0; i < incomeItems.length; i++) {
      cleanValues(incomeItems[i]);
      changeNodestate(incomeItems[i], false)
    }

    for (let i = 0; i < expensesItems.length; i++) {
      cleanValues(expensesItems[i]);
      changeNodestate(expensesItems[i], false);
    }

    // this.budget = 0;
    // this.budgetDay = 0;
    // this.budgetMonth = 0;
    // this.expensesMonth = 0;
    // this.income = {};
    // this.incomeMonth = 0;
    // this.addIncome = [];
    // this.expenses = {};
    // this.addExpenses = [];
    // this.deposit = false;
    // this.percentDeposit = 0;
    // this.moneyDeposit = 0;


    this.showResult();
  },
  showResult: function () {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = Math.floor(this.budgetDay);
    expensesMonth.value = this.expensesMonth;
    additionalExpenses.value = this.addExpenses.join(', ');
    additionalIncome.value = this.addIncome.join(', ');

    if (isNaN(this.getTargetMonth()) || !isFinite(this.getTargetMonth())) {
      targetMonth.value = 'Срок';
    } else {
      targetMonth.value = this.getTargetMonth();
    }

    incomePeriod.value = this.calcPeriod();

    periodSelect.addEventListener('input', function () {
      incomePeriod.value = periodSelect.value * appData.budgetMonth;
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    cleanValues(cloneIncomeItem);

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);

    const cloneTitle = cloneIncomeItem.querySelector('.income-title');
    const cloneAmount = cloneIncomeItem.querySelector('.income-amount');
    cloneTitle.addEventListener('input', onlyRussianLetters);
    cloneAmount.addEventListener('input', onlyNumbers);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length > 2) {
      incomeAddButton.style.display = 'none';
    }
  },

  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    cleanValues(cloneExpensesItem);

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);

    const cloneTitle = cloneExpensesItem.querySelector('.expenses-title');
    const cloneAmount = cloneExpensesItem.querySelector('.expenses-amount');
    cloneTitle.addEventListener('input', onlyRussianLetters);
    cloneAmount.addEventListener('input', onlyNumbers);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length > 2) {
      expensesAddButton.style.display = 'none';
    }
  },

  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
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

  getExpensesMonth: function () {
    for (let i in appData.expenses) {
      this.expensesMonth += +this.expenses[i];
    }
  },

  getBudget: function () {
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },

  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },

  getStatusIncome: function () {
    let statusMessage;

    switch (true) {
      case (this.budgetDay > 1200):
        statusMessage = 'У вас высокий уровень дохода';
        break;
      case (this.budgetDay >= 600 && this.budgetDay < 1200):
        statusMessage = 'У вас средний уровень дохода';
        break;
      case (this.budgetDay < 600 && this.budgetDay >= 0):
        statusMessage = 'К сожалению, у вас уровень дохода ниже среднего';
        break;
      default:
        statusMessage = 'Что-то пошло не так';
    }

    return statusMessage;
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      let yearPercent;
      let sum;

      while (!isNumber(yearPercent)) {
        yearPercent = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(sum)) {
        sum = prompt('Какая сумма заложена?', 10000);
      }

      this.percentDeposit = yearPercent;
      this.moneyDeposit = sum;
    }
  },

  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },

  changeInputsState: function (boolean) {
    allInputsData.forEach(function (item) {
      if (!item.classList.contains('period-select')) {
        item.disabled = boolean;
      }
    });
  }
}


expensesAddButton.addEventListener('click', appData.addExpensesBlock);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});

calculateBtn.addEventListener('click', function () {
  if (salaryAmount.value !== '') {
    appData.start.apply(appData);



  }
});

cancelBtn.addEventListener('click', function () {
  appData.reset();


});



incomeTitle.addEventListener('input', onlyRussianLetters);
expensesTitle.addEventListener('input', onlyRussianLetters);
firtIncomeForm.addEventListener('input', onlyRussianLetters);
secondIncomeForm.addEventListener('input', onlyRussianLetters);

salaryAmount.addEventListener('input', onlyNumbers);
incomeCash.addEventListener('input', onlyNumbers);
expensesCash.addEventListener('input', onlyNumbers);
targetAmount.addEventListener('input', onlyNumbers);


function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isString(s) {
  return !(isNumber(s) || s === undefined || s === null || s === '');
}

function capitalizeFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function cleanValues(block) {
  for (let i = 0; i < block.children.length; i++) {
    block.children[i].value = '';
  }
}

function changeNodestate(block, boolean) {
  for (let i = 0; i < block.children.length; i++) {
    block.children[i].disabled = boolean;
  }
}

function onlyRussianLetters(e) {
  e.target.value = e.target.value.replace(/[^А-я\s,.!?:;]/, '');
}

function onlyNumbers(e) {
  e.target.value = e.target.value.replace(/[^0-9.]/, '');
}