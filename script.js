const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalBtn = document.getElementById('equal');

let currentNumber = "";
let previousNumber = "";
let operation = "";

function updateDisplay(value) {
  display.innerText = value;
}

function clearAll() {
  currentNumber = "";
  previousNumber = "";
  operation = "";
  updateDisplay("");
}

function appendNumber(number) {
  // Only add decimal if not already present
  if (!isNaN(number) && !currentNumber.includes(".")) {
    currentNumber += number;
  }
  updateDisplay(currentNumber);
}

function handleOperator(op) {
  // If no number entered, ignore operator
  if (currentNumber === "") return;
  
  // If previous operation exists, calculate before assigning new operator
  if (operation !== "") {
    calculate();
  }
  previousNumber = currentNumber;
  currentNumber = "";
  operation = op;
}

function calculate() {
  let result = 0;
  const prevNum = parseFloat(previousNumber);
  const currNum = parseFloat(currentNumber);

  switch (operation) {
    case "+":
      result = prevNum + currNum;
      break;
    case "-":
      result = prevNum - currNum;
      break;
    case "*":
      result = prevNum * currNum;
      break;
    case "/":
      if (currNum === 0) {
        alert("Division by zero error!");
        return;
      }
      result = prevNum / currNum;
      break;
  }

  currentNumber = result.toString();
  // Clear previous number and operation after calculation
  previousNumber = "";
  operation = "";
  updateDisplay(currentNumber);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;
    if (!isNaN(value)) {
      appendNumber(value);
    } else if (value === ".") {
      appendNumber(value);
    } else if (value === "=") {
      equalBtn.click();
    } else {
      handleOperator(value);
    }
  });
});

clearBtn.addEventListener('click', clearAll);

equalBtn.addEventListener('click', calculate);

// Utility classes for styling
const btnClass = "text-gray-700 py-2 px-4 focus:outline-none";

// Style buttons
buttons.forEach(button => {
  button.classList.add(btnClass);
});

// Style operator buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.classList.add('bg-gray-100', 'hover:bg-gray-200');
});

// Style clear button
clearBtn.classList.add(btnClass, 'bg-red-500', 'hover:bg-red-600', 'text-white');

// Style equal button
equalBtn.classList.add(btnClass);
