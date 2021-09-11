const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const history = document.querySelector('.history');
const display = document.querySelector('.display');
const result = document.querySelector('.result');
const clear = document.querySelector('.clear');
const clearEntry = document.querySelector('.clear-entry');
const equals = document.querySelector('.equals');

let expression = '';
let operationToDo = '';
let shouldClearDisplay = false;
let toResetHistory = false;
let tempResult = 0;

const doOperation = () => {
    let answer = 0;
    if (operationToDo === '%')
        answer = parseFloat(tempResult) % parseFloat(display.innerText);
    else if (operationToDo === '/')
        answer = parseFloat(tempResult) / parseFloat(display.innerText);
    else if (operationToDo === '*')
        answer = parseFloat(tempResult) * parseFloat(display.innerText);
    else if (operationToDo === '+')
        answer = parseFloat(tempResult) + parseFloat(display.innerText);
    else if (operationToDo === '-')
        answer = parseFloat(tempResult) - parseFloat(display.innerText);
    result.innerText = answer;
}

numbers.forEach(number => {
    number.addEventListener('click', e => {
        if (shouldClearDisplay) {
            display.innerText = '';
            shouldClearDisplay = false;
        }
        expression += e.target.innerText;
        if (toResetHistory) {
            expression = tempResult;
            toResetHistory = false;
        }
        history.innerText = expression;
        display.innerText += e.target.innerText;
        if (!operationToDo) {
            result.innerText += e.target.innerText;
        } else {
            doOperation();
        }
    })
});

operations.forEach(operation => {
    operation.addEventListener('click', e => {
        if (['%', '/', '*', '+', '-'].includes(expression.charAt(expression.length - 1))) {
            if (expression.charAt(expression.length - 1) === e.target.innerText) return;
            else expression = expression.substr(0, expression.length - 1) + e.target.innerText;
        } else {
            expression += e.target.innerText;
        }
        if (toResetHistory) {
            expression = tempResult + e.target.innerText;
            toResetHistory = false;
        }
        history.innerText = expression;
        operationToDo = e.target.innerText;
        shouldClearDisplay = true;
        tempResult = result.innerText;
    })
});

clear.addEventListener('click', () => {
    tempResult = 0;
    expression = '';
    operationToDo = '';
    shouldClearDisplay = false;
    toResetHistory = false;
    history.innerText = '';
    display.innerText = '';
    result.innerText = '';
});

clearEntry.addEventListener('click', () => {
    tempResult = '';
    expression = '';
    operationToDo = '';
    display.innerText = '';
    result.innerText = '';
});

equals.addEventListener('click', () => {
    display.innerText = result.innerText;
    tempResult = result.innerText;
    toResetHistory = true;
    shouldClearDisplay = true;
});