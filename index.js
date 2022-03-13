const prompt = require('prompt-sync')({ sigint: true });
const { ToWords } = require('to-words');

const toWords = new ToWords();

let totalPrice = (Math.random() * 100).toFixed(2);

console.log(`The total price is: ${totalPrice}`);



function findDenominations(denominations, i, currency) {
  let matchEuros = {
    // 0: {20: 2(count), 10: 1},
    // 1: {20: 2(count)}
  };
  matchEuros[i] = {};

  // Take the closest and lesser from the deniminations. If it exist increase the count.And returns as an object.
  do {
    let closest = Math.max(...denominations.filter(num => num <= currency));
    if (matchEuros[i].hasOwnProperty(closest)) {
      matchEuros[i][closest] = matchEuros[i][closest] + 1
    } else {
      matchEuros[i][closest] = 1;
    }
    if (currency === closest) {
      break;
    }
    currency = currency - closest;
  } while (true);


  return matchEuros;
}

// calculate the change to be returned to the customer
function calcChange(totalPrice) {
  let customerCash = Number(prompt("Enter the cash: "));
  let denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500];
  if (customerCash === 0 || isNaN(customerCash)) {
    console.log(`You have to pay ${totalPrice}`);
    calcChange(totalPrice);
  } else if (customerCash === totalPrice) {
    console.log("No balance");
    return
  } else if (customerCash < totalPrice) {
    totalPrice = (totalPrice - customerCash).toFixed(2);
    console.log(`You have to pay ${totalPrice} more.`);
    calcChange(totalPrice);
  } else {
    totalPrice = (customerCash - totalPrice).toFixed(2).split(".");
    console.log(`Balance amount is ${totalPrice.join(",")}€`);

    for (let i = 0; i < 2; i++) {
      let currency = Number(totalPrice[i]);
      if (currency === 0) {
        continue
      }
      // Gets the count of currency denomination that to be returned to the customer
      let matchEuros = findDenominations(denominations, i, currency);

      for (const [key, value] of Object.entries(matchEuros[i])) {
        console.log("-----------------------")
        if (i === 0) {
          let print = (key === "1" || key === "2") ? `${value} x ${toWords.convert(key)} euro coins` : `${value} x ${toWords.convert(key)} euro notes`;
          console.log(print)
        } else {
          console.log(`${value} x ${toWords.convert(key)} cent coins`);
        }
      }
    }
    return
  }
}

calcChange(totalPrice);