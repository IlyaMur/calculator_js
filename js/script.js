let money = 50000;
let income = "freelance";
let addExpenses = "такси, собака, ЗОЖ";
let deposit = true;
let mission = 1000000;
let period = 6;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(", "));
console.log(budgetDay);
