'use strict';
window.addEventListener('DOMContentLoaded', () => {
    let previousOperandEl = document.querySelector('.previous-operand');
    let currentOperandEl = document.querySelector('.current-operand');
    const numbersBtns = document.querySelectorAll('[data-number]');
    const deleteBtn = document.querySelector('[data-delete]');
    const operationsBtns = document.querySelectorAll('[data-operation]');
    const resetBtn = document.querySelector('[data-reset]');
    const equalBtn = document.querySelector('[data-equal]');
    const toggle = document.querySelector('.toggle')
    const toggleItems = document.querySelectorAll('.toggle-item')
    let operation;
    
    function displayBtns(item, parent) {
        if(item.innerText === '.' && parent.innerText.includes('.')) return;
        parent.innerText += item.innerText;
        formatNumber(parent);
    }
    function displayOperations(item,parent) {
        parent.innerText += item.innerText;
    }
    function chooseOperation(selectedOperation) {
        if(currentOperandEl.innerText === '') return;
        if(previousOperandEl.innerText !== '') {
            calculate(selectedOperation);
        }
        operation = selectedOperation;
        previousOperandEl.innerText = currentOperandEl.innerText;
        previousOperandEl.style.fontSize = '22px';
        currentOperandEl.innerText = '';
    }
    function calculate() {
        let result;
        const previousOperand = parseFloat(previousOperandEl.innerText.replace(/,/g, ''));
        const currentOperand = parseFloat(currentOperandEl.innerText.replace(/,/g, ''));
        if(isNaN(previousOperand) || isNaN(currentOperand)) return;
        switch (operation) {
            case '+':
                result = previousOperand + currentOperand;
                break;
            case '-':
                result = previousOperand - currentOperand;
                break;
            case 'x':
                result = previousOperand * currentOperand;
                break;
            case '/':
                result = previousOperand / currentOperand;
                break;
            default:
                return;
        }
        currentOperandEl.innerText = result.toLocaleString();
        operation = undefined;
        previousOperandEl.innerText = '';
    }
    function clear() {
        currentOperandEl.innerText = '';
        previousOperandEl.innerText = '';
        operation = undefined;
    }
    function deleteNums() {
        currentOperandEl.innerText = currentOperandEl.innerText.slice(0,-1);
    }
    function formatNumber(element) {
        const value = parseFloat(element.innerText.replace(/,/g, ''));
        if (!isNaN(value)) {
            element.innerText = value.toLocaleString();
        }
    }
    numbersBtns.forEach(e => {
        e.addEventListener('click', () => {
            displayBtns(e,currentOperandEl);
        })
    });
    operationsBtns.forEach(e => {
        e.addEventListener('click', () => {
            displayOperations(e,currentOperandEl);
            chooseOperation(e.innerText)
        })
    });
    equalBtn.addEventListener('click', () => {
        calculate();
    });
    resetBtn.addEventListener('click', () => {
        clear();
    });
    deleteBtn.addEventListener('click', () => {
        deleteNums();
    });
    toggleItems[0].classList.add('show')
    toggle.addEventListener('click', (ev) => {
        const target = ev.target;
            if(target && target.classList.contains("toggle-item")){
                toggleItems.forEach((item, idx) => {
                    if(target == item){
                        hideToggle();
                        showToggle(idx);
                    };
                });
            };
    });
    function hideToggle() {
        toggleItems.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
    };
    function showToggle(i=0) {
        toggleItems[i].classList.add('show');
        toggleItems[i].classList.remove('hide');
    };
    toggleItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const classes = ['dark', 'light', 'violet-vibe'];
            document.documentElement.classList.add(classes[index]);
            classes.forEach((cls, idx) => {
                if (idx !== index) {
                    document.documentElement.classList.remove(cls);
                };
            });
        });
    });
    
});
