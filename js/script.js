"use strict";

// Кнопку "Рассчитать" через id
const calculateBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');

// Кнопки “+” (плюс) через Tag, каждую в своей переменной. 
// Раз просили через 'Tag', сделал вместо querySelector через getElementsByTagName
const buttons = document.getElementsByTagName('button');
let incomeAddButton;
let expensesAddButton;
for (const element of buttons) {
  if (element.className === 'btn_plus expenses_add') {
    expensesAddButton = element;
  } else if (element.className === 'btn_plus income_add') {
    incomeAddButton = element;
  }
}

// Чекбокс по id через querySelector
const depositCheckbox = document.querySelector('#deposit-check');

// Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');
const firtIncomeForm = additionalIncomeItems[0];
const secondIncomeForm = additionalIncomeItems[1];

// Каждый элемент в правой части программы через класс(не через querySelector), 
// которые имеют в имени класса "-value", начиная с class="budget_day-value" 
// и заканчивая class="target_month-value">
const budgetDay = document.getElementsByClassName('budget_day-value')[0];
const expensesMonth = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncome = document.getElementsByClassName('additional_income-value')[0];
const additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriod = document.getElementsByClassName('income_period-value')[0];
const targetMonth = document.getElementsByClassName('target_month-value')[0];

// Оставшиеся поля через querySelector каждый в отдельную переменную:
// поля ввода(input) с левой стороны и не забудьте про range.
const budgetMonth = document.querySelector('.budget_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-items>.income-title');
const incomeCash = document.querySelector('.income-items>.income-amount');
const expensesTitle = document.querySelector('.expenses-items>.expenses-title');
const expensesCash = document.querySelector('.expenses-items>.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

const incomeItems = document.querySelectorAll('.income-items');
const expensesItems = document.querySelectorAll('.expenses-items');

const periodAmount = document.querySelector('.period-amount');

const allInputsData = document.querySelectorAll('.data input');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelectorAll('.deposit-percent');
const percentForm = depositPercent[0];

let formItems;
let incomeInputs;
let expensesInputs;

class AppData {
  constructor() {
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

    if (depositAmount.value === '') {
      this.hideDepositBlock();
    }

    this.blockForms();

    this.getExpInc();
    this.getExpensesMonth();

    this.getAddExpInc(additionalExpensesItem);
    this.getAddExpInc(additionalIncomeItems, false);

    this.getInfoDeposit();
    this.getBudget();

    this.showResult();

    this.saveToLocalStorage();
    this.saveToCookie();
  }

  clearStorages() {
    const day = -1;

    this.setCookie('budgeMonthValue', budgetMonth.value, day);
    this.setCookie('budgetDayValue', budgetDay.value, day);
    this.setCookie('expensesMmonthValue', expensesMonth.value, day);
    this.setCookie('additionalIncomeValue', additionalIncome.value, day);
    this.setCookie('additionalExpensesValue', additionalExpenses.value, day);
    this.setCookie('incomePeriodValue', incomePeriod.value, day);
    this.setCookie('targetMonthValue', targetMonth.value, day);
    this.setCookie('isLoad', 'true');

    localStorage.clear();
  }

  saveToLocalStorage() {
    localStorage.setItem('budgeMonthValue', budgetMonth.value);
    localStorage.setItem('budgetDayValue', budgetDay.value);
    localStorage.setItem('expensesMmonthValue', expensesMonth.value);
    localStorage.setItem('additionalIncomeValue', additionalIncome.value);
    localStorage.setItem('additionalExpensesValue', additionalExpenses.value);
    localStorage.setItem('incomePeriodValue', incomePeriod.value);
    localStorage.setItem('targetMonthValue', targetMonth.value);
    localStorage.setItem('isLoad', true);
  }

  saveToCookie() {
    this.setCookie('budgeMonthValue', budgetMonth.value);
    this.setCookie('budgetDayValue', budgetDay.value);
    this.setCookie('expensesMmonthValue', expensesMonth.value);
    this.setCookie('additionalIncomeValue', additionalIncome.value);
    this.setCookie('additionalExpensesValue', additionalExpenses.value);
    this.setCookie('incomePeriodValue', incomePeriod.value);
    this.setCookie('targetMonthValue', targetMonth.value);
    this.setCookie('isLoad', 'true');
  }

  setCookie(cname, cvalue, exdays = 1) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  hideDepositBlock() {
    this.deposit = false;
    depositCheckbox.checked = false;
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent[0].style.display = 'none';
    depositBank.value = '';
  }

  reset() {
    this.clearStorages();
    this.changeInputsState(false);

    this.resetInputs(incomeInputs);
    this.resetInputs(expensesInputs);
    this.hideDepositBlock();

    calculateBtn.style.display = 'block';
    cancelBtn.style.display = 'none';

    expensesAddButton.style.display = 'block';
    incomeAddButton.style.display = 'block';

    depositBank.disabled = false;
    incomeAddButton.disabled = false;
    expensesAddButton.disabled = false;

    allInputsData.forEach((item) => {
      item.value = '';
    });

    periodSelect.value = 1;
    periodAmount.textContent = 1;
    Object.assign(this, new this.constructor());

    for (let i = 0; i < incomeInputs.length; i++) {
      this.cleanValues(incomeInputs[i]);
      this.changeNodestate(incomeInputs[i], false);
    }

    for (let i = 0; i < expensesInputs.length; i++) {
      this.cleanValues(expensesInputs[i]);
      this.changeNodestate(expensesInputs[i], false);
    }

    this.showResult();
  }

  blockForms() {
    incomeInputs = document.querySelectorAll('.income>.income-items');
    expensesInputs = document.querySelectorAll('.expenses>.expenses-items');

    this.changeInputsState(true);
    calculateBtn.style.display = 'none';
    cancelBtn.style.display = 'block';

    incomeAddButton.disabled = true;
    expensesAddButton.disabled = true;
    depositBank.disabled = true;

    for (let i = 0; i < incomeInputs.length; i++) {
      this.changeNodestate(incomeInputs[i], true);
    }

    for (let i = 0; i < expensesInputs.length; i++) {
      this.changeNodestate(expensesInputs[i], true);
    }
  }

  loadObject() {
    const cookies = document.cookie.split(';');
    const newCookie = {};

    cookies.forEach(el => {
      let item = el.trim().split('=');

      newCookie[item[0]] = item[1];
      if (localStorage.getItem(item[0]) !== item[1]) {
        this.clearStorages();
        return;
      }
    });

    if (localStorage.length !== 0) {
      budgetMonth.value = localStorage.getItem('budgeMonthValue');
      budgetDay.value = localStorage.getItem('budgetDayValue');
      expensesMonth.value = localStorage.getItem('expensesMmonthValue');
      additionalIncomeItems.value = localStorage.getItem('additionalIncomeItems');
      additionalIncome.value = localStorage.getItem('additionalIncomeValue');
      additionalExpenses.value = localStorage.getItem('additionalExpensesValue');
      incomePeriod.value = localStorage.getItem('incomePeriodValue');
      targetMonth.value = localStorage.getItem('targetMonthValue');

      this.blockForms();
    }
  }

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

    periodSelect.addEventListener('input', () => {
      incomePeriod.value = periodSelect.value * this.budgetMonth;
    });
  }

  addExpIncBlocks(block) {
    const cloneItem = block[0].cloneNode(true);
    this.cleanValues(cloneItem);

    const blockName = cloneItem.className.split('-')[0];
    const addButton = document.querySelector(`.${blockName}_add`);

    block[0].parentNode.insertBefore(cloneItem, addButton);

    const cloneTitle = cloneItem.querySelector(`.${blockName}-title`);
    const cloneAmount = cloneItem.querySelector(`.${blockName}-amount`);

    cloneTitle.addEventListener('input', this.onlyRussianLetters);
    cloneAmount.addEventListener('input', this.onlyNumbers);

    formItems = document.querySelectorAll(`.${blockName}-items`);
    if (formItems.length > 2) {
      addButton.style.display = 'none';
    }
  }

  getExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0];

      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };

    incomeInputs.forEach(count);
    expensesInputs.forEach(count);

    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpInc(block, boolean = true) {
    const isExpenses = boolean;
    let items;

    if (typeof block.value === 'string' && block.value !== '') {
      items = additionalExpensesItem.value.split(', ');
    } else if (block.length > 0) {
      items = block;
    } else {
      return;
    }

    items.forEach((item) => {
      if (item !== '' && isExpenses) {
        this.addExpenses.push(item.trim());
      } else if (item.value !== '' && !isExpenses) {
        this.addIncome.push(item.value.trim());
      }
    });
  }

  getExpensesMonth() {
    for (const i in this.expenses) {
      this.expensesMonth += +this.expenses[i];
    }
  };

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
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

  changePercent() {
    const valueSelect = this.value;

    if (valueSelect === 'other') {
      percentForm.style.display = 'inline-block';
    } else {
      percentForm.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }

  depositHandler() {
    if (depositCheckbox.checked) {
      depositBank.style.display = 'inline-block';
      this.deposit = true;

      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent[0].style.display = 'none';

      depositBank.value = '';
      depositAmount.value = '';
      depositPercent[0].value = '';

      this.deposit = false;

      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners() {
    expensesAddButton.addEventListener('click', () => {
      this.addExpIncBlocks(expensesItems);
    });
    incomeAddButton.addEventListener('click', () => {
      this.addExpIncBlocks(incomeItems);
    });

    periodSelect.addEventListener('input', function () {
      periodAmount.textContent = periodSelect.value;
    });

    calculateBtn.addEventListener('click', () => {
      if (salaryAmount.value !== '') {
        this.start();
      }
    });

    cancelBtn.addEventListener('click', () => {
      this.reset();
    });

    incomeTitle.addEventListener('input', this.onlyRussianLetters);
    expensesTitle.addEventListener('input', this.onlyRussianLetters);
    firtIncomeForm.addEventListener('input', this.onlyRussianLetters);
    secondIncomeForm.addEventListener('input', this.onlyRussianLetters);

    salaryAmount.addEventListener('input', this.onlyNumbers);
    incomeCash.addEventListener('input', this.onlyNumbers);
    expensesCash.addEventListener('input', this.onlyNumbers);
    targetAmount.addEventListener('input', this.onlyNumbers);
    depositAmount.addEventListener('input', this.onlyNumbers);

    depositCheckbox.addEventListener('change', this.depositHandler.bind(this));


    percentForm.addEventListener('change', this.checkPercent.bind(this));
    percentForm.addEventListener('input', this.changePercentValue.bind(this));
    depositBank.addEventListener('change', () => {
      if (depositBank.value !== '') {
        depositAmount.style.display = 'inline-block';
      } else {
        depositAmount.style.display = 'none';
      }
    });
  }

  checkPercent(e) {
    if (!/^[1-9][0-9]?$|^100$/.test(e.target.value)) {
      alert('Введите корректное значение в поле проценты');
      e.target.value = 0;
      depositPercent.value = 0;
    }
  }

  changePercentValue() {
    depositPercent.value = percentForm.value;
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

  percentChecker(e) {
    e.target.value = e.target.value.replace(/^[1-9][0-9]?$|^100$/, '');
  }
}

const appData = new AppData();
appData.eventListeners();
appData.loadObject();