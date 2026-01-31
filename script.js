// calculator object definition
let calc = {
    "operand1": "",
    "operand2": "",
    "operator": "",
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

function appendDigit(e) {
    const eventSrc = e.target.id;

    // delete leading zero
    if (eventSrc !== "btn-0") {
        if (calc.operator === "" && calc.operand1 !== "" && calc.operand1 === "0") {
            calc.operand1 = "";
        }
        else if (calc.operator === "" && calc.operand2 !== "" && calc.operand2 === "0") {
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
    // if there's no operand we're modifying operand1
    // otherwise, it's operand2
    dispTxt.textContent = calc.operator === "" ? calc.operand1 : calc.operand2;
}