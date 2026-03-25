let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {

    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (currentInput === '0' && number === '0') {
        return;
    }

    if (number === '.' && currentInput.includes('.')) {
        return;
    }


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

    if (currentInput === '' && previousInput === '') {
        return;
    }


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


updateDisplay();
