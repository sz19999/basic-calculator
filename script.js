// calculator object definition
let calc = {
    "operand1": "",
    "operand2": "",
    "operator": "",
    "result": "",
    "isOperand1Float": false,
    "isOperand2Float": false,
    "divByZero": false,
    "isResDisplayed": false,
};

// create calculator elements refernces
const btn1 = document.querySelector("#btn-1");
const btn2 = document.querySelector("#btn-2");
const btn3 = document.querySelector("#btn-3");
const btn4 = document.querySelector("#btn-4");
const btn5 = document.querySelector("#btn-5");
const btn6 = document.querySelector("#btn-6");
const btn7 = document.querySelector("#btn-7");
const btn8 = document.querySelector("#btn-8");
const btn9 = document.querySelector("#btn-9");
const btn0 = document.querySelector("#btn-0");
const addBtn = document.querySelector("#btn-add");
const subBtn = document.querySelector("#btn-sub");
const divBtn = document.querySelector("#btn-divide");
const multBtn = document.querySelector("#btn-multiply");
const clrBtn = document.querySelector("#btn-clr");
const delBtn = document.querySelector("#btn-del");
const dotBtn = document.querySelector("#btn-dot");
const modBtn = document.querySelector("#btn-mod");
const powBtn = document.querySelector("#btn-power");
const equalBtn = document.querySelector("#btn-equals");
const dispTxt = document.querySelector("#display"); // display reference

// setup digit buttons click event
const digitButtons = document.querySelectorAll(".operand");
digitButtons.forEach(button => {
    button.addEventListener("click", appendDigit);
});

// setup clear (AC) button click event
clrBtn.addEventListener("click", clearDisplay);

// setup delete button (DEL)
delBtn.addEventListener("click", deleteDigit);

// setup binary operators buttons
const binOpButtons = document.querySelectorAll(".operator");
binOpButtons.forEach(button => {
    button.addEventListener("click", getOperator);
});

// setup equals operator
equalBtn.addEventListener("click", () => {
    calc.isResDisplayed = true;

    // the equals button was pressed with two operands ready
    if (calc.operand2 !== "") {
        evalExpression();
    }
    // if only operand1 available
    else if (calc.operand1 !== "") {
        updateDisplay();
    }
});

// setup floating point
dotBtn.addEventListener("click", appendDot);

// appends appropriate digit to operand
function appendDigit(e) {
    const eventSrc = e.target.id;

    // if a result was displayed, start a new calculation
    if (calc.isResDisplayed && calc.operator === "") {
        calc.isResDisplayed = false;
        calc.operand1 = "";
    }

    // delete leading zero
    if (eventSrc !== "btn-0") {
        if (calc.operator === "" && calc.operand1 !== "" && calc.operand1 === "0") {
            calc.operand1 = "";
        }
        else if (calc.operator !== "" && calc.operand2 !== "" && calc.operand2 === "0") {
            calc.operand2 = "";
        }
    }

    // decide which new digit to append
    switch (eventSrc) {
        case "btn-0":
            // if there's no operator, then we must be assigning operand1.
            // prevent leading zeros
            if (calc.operator === "" && calc.operand1 !== "0")
                calc.operand1 += "0";

            // otherwise, we must be assigning operator2
            else if (calc.operator !== "" && calc.operand2 !== "0") 
                calc.operand2 += "0";
            break;
        case "btn-1":
            calc.operator === "" ? calc.operand1 += "1" : calc.operand2 += "1";
            break;
        case "btn-2":
            calc.operator === "" ? calc.operand1 += "2" : calc.operand2 += "2";
            break;
        case "btn-3":
            calc.operator === "" ? calc.operand1 += "3" : calc.operand2 += "3";
            break;
        case "btn-4":
            calc.operator === "" ? calc.operand1 += "4" : calc.operand2 += "4";
            break;
        case "btn-5":
            calc.operator === "" ? calc.operand1 += "5" : calc.operand2 += "5";
            break;
        case "btn-6":
            calc.operator === "" ? calc.operand1 += "6" : calc.operand2 += "6";
            break;
        case "btn-7":
            calc.operator === "" ? calc.operand1 += "7" : calc.operand2 += "7";
            break;
        case "btn-8":
            calc.operator === "" ? calc.operand1 += "8" : calc.operand2 += "8";
            break;
        case "btn-9":
            calc.operator === "" ? calc.operand1 += "9" : calc.operand2 += "9";
            break;
    }

    updateDisplay();
}

// updates the number on the display
function updateDisplay() {
    // if there's no result, means we're modfying operands
    // otherwise, we got a new result that we need to output on display
    if (calc.result === "") {
        dispTxt.textContent = calc.operator === "" ? calc.operand1 : calc.operand2;
    }
    else {
        dispTxt.textContent = calc.result;
    }
}

// resets display and any pending calculations
function clearDisplay() {
    dispTxt.textContent = "";
    calc.operand1 = calc.operand2 = calc.operator = "";
    calc.isOperand1Float = calc.isOperand2Float = false;
}

// deletes last digit of an operand
function deleteDigit() {
    if (calc.operator === "" && calc.operand1 !== "") {
        if (calc.operand1.slice(-1) === ".") {
            calc.isOperand1Float = false;
        }
        calc.operand1 = calc.operand1.slice(0, -1);
    }
    else if (calc.operator !== "" && calc.operand2 !== "") {
        if (calc.operand2.slice(-1) === ".") {
            calc.isOperand2Float = false;
        }
        calc.operand2 = calc.operand2.slice(0, -1);
    }

    updateDisplay();
}

function getOperator(e) {
    const op = e.target.id;

    // return if there's no left operand (operand1)
    if (calc.operand1 === "") {
        return;
    } 
    // if there're two operands available, evaluate expression
    else if (calc.operand1 !== "" && calc.operand2 !== "") {
        evalExpression();
    }

    // get new operator
    switch (op) {
        case "btn-add":
            calc.operator = "+";
            break;
        case "btn-sub":
            calc.operator = "-";
            break;
        case "btn-mod":
            calc.operator = "%";
            break;
        case "btn-divide":
            calc.operator = "÷";
            break;
        case "btn-multiply":
            calc.operator = "x";
            break;
        case "btn-power":
            calc.operator = "^";
            break;
    }
}

function evalExpression() {
    switch (calc.operator) {
        case "+":
            calc.result = `${+calc.operand1 + +calc.operand2}`;
            break;
        case "-":
            calc.result = `${+calc.operand1 - +calc.operand2}`;
            break;
        case "x":
            calc.result = `${+calc.operand1 * +calc.operand2}`;
            break;
        case "^":
            calc.result = `${(+calc.operand1) ** (+calc.operand2)}`;
            break;
        case "÷":
            if (calc.operand2 !== "0")
                calc.result = `${+calc.operand1 / +calc.operand2}`;
            else {
                calc.divByZero = true;
                calc.result = "Can't divide by 0!";
            }
            break;
        case "%":
            calc.result = `${+calc.operand1 % +calc.operand2}`;
            break;
    }

    updateDisplay();

    // push the result into operand1 for future processing
    calc.operand1 = calc.divByZero ? "" : calc.result;
    calc.operand2 = calc.result = calc.operator ="";   // then reset operand2, operator & result
}

function appendDot() {
    // operand1 isn't a float
    if (calc.operator === "" && !calc.isOperand1Float) {
        calc.operand1 += ".";
        calc.isOperand1Float = true;
    }
    // operand2 isn't a float
    else if (calc.operator !== "" && !calc.isOperand2Float) {
        calc.operand2 += ".";
        calc.isOperand2Float = true;
    }

    updateDisplay();
}