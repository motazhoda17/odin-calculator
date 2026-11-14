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
const decimalButton = document.querySelector("#decimal");

function updateDisplay() {
  display.textContent = displayValue;
  // Only one decimal point allowed per number
  decimalButton.disabled = displayValue.includes(".") && !shouldResetDisplay;
}

// ----- Input -----
function inputDigit(digit) {
  if (shouldResetDisplay) {
    displayValue = digit; // start a fresh number
    shouldResetDisplay = false;
    highlightOperator(null);
  } else if (displayValue === "0") {
    displayValue = digit; // replace the starting 0
  } else {
    if (displayValue.length >= 12) return; // don't overflow the display
    displayValue += digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (shouldResetDisplay) {
    displayValue = "0."; // start a new number like 0.5
    shouldResetDisplay = false;
    highlightOperator(null);
  } else if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  updateDisplay();
}

function chooseOperator(nextOperator) {
  // A second number was typed (e.g. 12 + 7 then -): solve 12 + 7 first
  if (operator !== null && !shouldResetDisplay) {
    const solved = evaluate();
    if (!solved) return; // e.g. divided by 0
  }

  // Can't use an error message as a number
  if (Number.isNaN(Number(displayValue))) return;

  // If an operator was just pressed, this simply replaces it (2 + - means 2 -)
  firstNumber = Number(displayValue);
  operator = nextOperator;
  shouldResetDisplay = true;
  highlightOperator(nextOperator);
}

function evaluate() {
  // Need firstNumber, operator AND a typed secondNumber before solving
  if (operator === null || shouldResetDisplay) return false;

  secondNumber = Number(displayValue);

  if (operator === "/" && secondNumber === 0) {
    clearAll();
    displayValue = "Nice try. No dividing by 0!";
    shouldResetDisplay = true;
    updateDisplay();
    return false;
  }

  const result = operate(operator, firstNumber, secondNumber);

  displayValue = formatResult(result);
  firstNumber = null;
  operator = null;
  secondNumber = null;
  shouldResetDisplay = true; // a new digit starts a new calculation
  updateDisplay();
  highlightOperator(null);
  return true;
}

// Round long decimals so they fit on the display
function formatResult(number) {
  const rounded = Math.round(number * 100000000) / 100000000; // 8 decimal places
  const text = String(rounded);
  // Huge numbers switch to scientific notation, e.g. 1.234568e+15
  return text.length > 12 ? rounded.toExponential(6) : text;
}

function highlightOperator(selected) {
  document.querySelectorAll("[data-operator]").forEach((button) => {
    button.classList.toggle("active", button.dataset.operator === selected);
  });
}

function clearAll() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  displayValue = "0";
  shouldResetDisplay = false;
  updateDisplay();
  highlightOperator(null);
}

// ----- Buttons -----
document.querySelectorAll("[data-digit]").forEach((button) => {
  button.addEventListener("click", () => inputDigit(button.dataset.digit));
});

document.querySelector("#clear").addEventListener("click", clearAll);

document.querySelectorAll("[data-operator]").forEach((button) => {
  button.addEventListener("click", () => chooseOperator(button.dataset.operator));
});

document.querySelector("#equals").addEventListener("click", evaluate);

document.querySelector("#decimal").addEventListener("click", inputDecimal);
