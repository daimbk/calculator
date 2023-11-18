// wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const calculator = document.getElementById("calculator");
  const resultDisplay = document.getElementById("result");

  let currentInput = "0";
  let operator = null;
  let previousInput = null;

  function updateDisplay() {
    resultDisplay.textContent = currentInput;
  }

  function inputNumber(number) {
    if (currentInput === "0" || currentInput === "-0") {
      currentInput = number.toString();
    } else {
      currentInput += number.toString();
    }
    updateDisplay();
  }

  function inputOperator(op) {
    if (operator !== null) {
      performOperation();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "0";
  }

  function performOperation() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (operator === "+") {
      currentInput = (num1 + num2).toString();
    } else if (operator === "-") {
      currentInput = (num1 - num2).toString();
    } else if (operator === "*") {
      currentInput = (num1 * num2).toString();
    } else if (operator === "÷") {
      currentInput = (num1 / num2).toString();
    } else if (operator === "%") {
      currentInput = (num1 % num2).toString();
    }

    operator = null;
    previousInput = null;
    updateDisplay();
  }

  function clear() {
    currentInput = "0";
    operator = null;
    previousInput = null;
    updateDisplay();
  }

  function inputDecimal() {
    if (!currentInput.includes(".")) {
      currentInput += ".";
      updateDisplay();
    }
  }

  calculator.addEventListener("click", (event) => {
    const target = event.target;

    if (target.tagName === "BUTTON") {
      const buttonValue = target.textContent;

      if (buttonValue >= "0" && buttonValue <= "9") {
        inputNumber(buttonValue);
      } else if (buttonValue === ".") {
        inputDecimal();
      } else if (buttonValue === "=") {
        performOperation();
      } else if (target.classList.contains("operator")) {
        inputOperator(buttonValue);
      } else if (target.classList.contains("clear")) {
        clear();
      }
    }
  });
});
