let money = 50000;
let income = "freelance";
let addExpenses = "такси, собака, ЗОЖ";
let deposit = true;
let mission = 1000000;
let period = 6;
let budgetDay = money / 30;

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

console.log(
  addExpenses.
    toLowerCase().
    split(", ")
);

console.log(budgetDay);
