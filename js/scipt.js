const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // adiciona um digito
    addDigit(digit) {
        // Checa se ja tem um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // Processa todas as operacoes
    processOperation(operation) {

        //current e previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText;
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            default:
                return;
        }
    }

    // muda os valores da tela da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // checa se o valor é zero, se for adiciona o current value
            if(previous === 0) {
                operation = current
            }

            // add current value para previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperation.innerText = "";
        }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});