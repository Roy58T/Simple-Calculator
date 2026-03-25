let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    // Reset display if needed (after operator was pressed)
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    // Prevent multiple leading zeros
    if (currentInput === '0' && number === '0') {
        return;
    }

    // Prevent multiple decimal points
    if (number === '.' && currentInput.includes('.')) {
        return;
    }

    // Replace leading zero when entering first digit (except for decimal)
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else if (currentInput === '' && number === '.') {
        currentInput = '0.';
    } else {
        currentInput += number;
    }

    updateDisplay();
}

function appendOperator(op) {
    // If user presses operator without entering a number, do nothing
    if (currentInput === '' && previousInput === '') {
        return;
    }

    // If there's already an operation pending and user entered a new number, calculate first
    if (operation !== null && !shouldResetDisplay && currentInput !== '') {
        calculate();
    }

    previousInput = currentInput || previousInput;
    operation = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operation === null || previousInput === '' || currentInput === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 0 : prev / current;
            break;
        default:
            return;
    }

    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;

    currentInput = result.toString();
    previousInput = '';
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Initialize
updateDisplay();
