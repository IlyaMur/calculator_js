let money = 50000;
let income = "15000";
let addExpenses = "1000, 2000, 5000";
let deposit = true;
let mission = 1000000;
let period = 6;
let budgetDay = money / 30;

console.log(money);
console.log(income);
console.log(deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(", "));
console.log(budgetDay);
