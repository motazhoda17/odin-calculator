// ----- Calculator state -----
// An operation is: firstNumber operator secondNumber (e.g. 3 + 5)
let firstNumber = null;
let operator = null;
let secondNumber = null;

// What the display shows (a string, so we can add digits to the end)
let displayValue = "0";
// true right after an operator or = is pressed: the next digit starts a new number
let shouldResetDisplay = false;

// ----- Basic math -----
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// Call the right math function for the operator
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

// ----- Display -----
const display = document.querySelector("#display");

function updateDisplay() {
  display.textContent = displayValue;
}

// ----- Input -----
function inputDigit(digit) {
  if (shouldResetDisplay) {
    displayValue = digit; // start a fresh number
    shouldResetDisplay = false;
  } else if (displayValue === "0") {
    displayValue = digit; // replace the starting 0
  } else {
    if (displayValue.length >= 12) return; // don't overflow the display
    displayValue += digit;
  }
  updateDisplay();
}

function clearAll() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  displayValue = "0";
  shouldResetDisplay = false;
  updateDisplay();
}

// ----- Buttons -----
document.querySelectorAll("[data-digit]").forEach((button) => {
  button.addEventListener("click", () => inputDigit(button.dataset.digit));
});

document.querySelector("#clear").addEventListener("click", clearAll);
