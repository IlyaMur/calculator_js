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


class AppData {
  constructor(
    budget = 0,
    budgetDay = 0,
    budgetMonth = 0,
    expensesMonth = 0,
    income = {},
    incomeMonth = 0,
    addIncome = [],
    expenses = {},
    addExpenses = [],
    deposit = false,
    percentDeposit = 0,
    moneyDeposit = 0
  ) {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

  start() {
    this.budget = +salaryAmount.value;

    this.changeInputsState(true);
    calculateBtn.style.display = 'none';
    cancelBtn.style.display = 'block';

    incomeAddButton.disabled = true;
    expensesAddButton.disabled = true;

    for (let i = 0; i < incomeItems.length; i++) {
      this.changeNodestate(incomeItems[i], true);
    }

    for (let i = 0; i < expensesItems.length; i++) {
      this.changeNodestate(expensesItems[i], true);
    }

    this.getExpenses();
    this.getExpensesMonth();

    this.getAddExpenses();
    this.getAddIncome();

    this.getIncome();
    this.getBudget();

    this.showResult();

  }

  reset() {
    this.changeInputsState(false);

    this.resetInputs(incomeItems);
    this.resetInputs(expensesItems);

    calculateBtn.style.display = 'block';
    cancelBtn.style.display = 'none';

    incomeAddButton.disabled = false;
    expensesAddButton.disabled = false;

    allInputsData.forEach((item) => {
      item.value = '';
    });
    periodSelect.value = 1;
    periodAmount.textContent = 1;
    Object.assign(this, new this.constructor());

    for (let i = 0; i < incomeItems.length; i++) {
      this.cleanValues(incomeItems[i]);
      this.changeNodestate(incomeItems[i], false);
    }

    for (let i = 0; i < expensesItems.length; i++) {
      this.cleanValues(expensesItems[i]);
      this.changeNodestate(expensesItems[i], false);
    }

    this.showResult();
  };

  showResult() {
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

    let budgetMonthCalc = this.budgetMonth;

    periodSelect.addEventListener('input', function () {
      incomePeriod.value = periodSelect.value * budgetMonthCalc;
    });
  }

  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    this.cleanValues(cloneIncomeItem);

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);

    const cloneTitle = cloneIncomeItem.querySelector('.income-title');
    const cloneAmount = cloneIncomeItem.querySelector('.income-amount');
    cloneTitle.addEventListener('input', this.onlyRussianLetters);
    cloneAmount.addEventListener('input', this.onlyNumbers);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length > 2) {
      incomeAddButton.style.display = 'none';
    }
  }

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    this.cleanValues(cloneExpensesItem);

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);

    const cloneTitle = cloneExpensesItem.querySelector('.expenses-title');
    const cloneAmount = cloneExpensesItem.querySelector('.expenses-amount');
    cloneTitle.addEventListener('input', this.onlyRussianLetters);
    cloneAmount.addEventListener('input', this.onlyNumbers);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length > 2) {
      expensesAddButton.style.display = 'none';
    }
  }

  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItems.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    for (let i in this.expenses) {
      this.expensesMonth += +this.expenses[i];
    }
  };

  getBudget() {
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
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
  }

  getInfoDeposit() {
    if (this.deposit) {
      let yearPercent;
      let sum;

      while (!this.isNumber(yearPercent)) {
        yearPercent = prompt('Какой годовой процент?', 10);
      }
      while (!this.isNumber(sum)) {
        sum = prompt('Какая сумма заложена?', 10000);
      }

      this.percentDeposit = yearPercent;
      this.moneyDeposit = sum;
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  changeInputsState(boolean) {
    allInputsData.forEach((item) => {
      if (!item.classList.contains('period-select')) {
        item.disabled = boolean;
      }
    });
  }

  resetInputs(inputs) {
    if (inputs.length > 1) {
      for (let i = 1; i < inputs.length; i++) {
        inputs[i].remove();
      }
    }
  }

  eventListeners() {
    expensesAddButton.addEventListener('click', this.addExpensesBlock.bind(this));
    incomeAddButton.addEventListener('click', this.addIncomeBlock.bind(this));

    periodSelect.addEventListener('input', function () {
      periodAmount.textContent = periodSelect.value;
    });

    let appDataStart = this.start.bind(appData);

    calculateBtn.addEventListener('click', function () {
      if (salaryAmount.value !== '') {
        appDataStart();
      }
    });

    let appDataReset = this.reset.bind(appData);

    cancelBtn.addEventListener('click', function () {
      appDataReset();
    });

    incomeTitle.addEventListener('input', this.onlyRussianLetters);
    expensesTitle.addEventListener('input', this.onlyRussianLetters);
    firtIncomeForm.addEventListener('input', this.onlyRussianLetters);
    secondIncomeForm.addEventListener('input', this.onlyRussianLetters);

    salaryAmount.addEventListener('input', this.onlyNumbers);
    incomeCash.addEventListener('input', this.onlyNumbers);
    expensesCash.addEventListener('input', this.onlyNumbers);
    targetAmount.addEventListener('input', this.onlyNumbers);
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  isString(s) {
    return !(this.isNumber(s) || s === undefined || s === null || s === '');
  }

  capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  cleanValues(block) {
    for (let i = 0; i < block.children.length; i++) {
      block.children[i].value = '';
    }
  }

  changeNodestate(block, boolean) {
    for (let i = 0; i < block.children.length; i++) {
      block.children[i].disabled = boolean;
    }
  }

  onlyRussianLetters(e) {
    e.target.value = e.target.value.replace(/[^А-я\s,.!?:;]/, '');
  }

  onlyNumbers(e) {
    e.target.value = e.target.value.replace(/[^0-9.]/, '');
  }
}

const appData = new AppData();
appData.eventListeners();