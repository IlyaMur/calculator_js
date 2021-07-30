let num = 266219;
let result = 1;

let numsArray = String(num).split("");

for (let i = 0; i < numsArray.length; i++) {
  result *= numsArray[i];
}

let resultArray = String(result ** 3).split("");

console.log("First number:", resultArray[0]);
console.log("Second number:", resultArray[1]);
