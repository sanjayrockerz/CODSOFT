// ===== CALCULATOR LOGIC =====
class Calculator {
    constructor() {
        this.currentDisplay = document.getElementById('current-display');
        this.historyDisplay = document.getElementById('history');
        this.errorModal = document.getElementById('error-modal');
        this.errorMessage = document.getElementById('error-message');
        
        // Calculator state
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
        this.waitingForNewNumber = false;
        this.lastCalculation = '';
        
        // Initialize
        this.init();
    }
    
    init() {
        this.attachEventListeners();
        this.updateDisplay();
        console.log('🧮 Calculator initialized successfully!');
    }
    
    attachEventListeners() {
        // Button event listeners
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => this.handleButtonClick(e));
        });
        
        // Modal close
        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideErrorModal();
        });
        
        // Close modal on outside click
        this.errorModal.addEventListener('click', (e) => {
            if (e.target === this.errorModal) {
                this.hideErrorModal();
            }
        });
    }
    
    handleButtonClick(event) {
        const button = event.currentTarget;
        const action = button.dataset.action;
        
        // Add button press animation
        button.classList.add('pressed');
        setTimeout(() => button.classList.remove('pressed'), 100);
        
        // Handle different button types
        switch (action) {
            case 'number':
                this.inputNumber(button.dataset.number);
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'operation':
                this.inputOperation(button.dataset.operation);
                break;
            case 'calculate':
                this.calculate();
                break;
            case 'clear-all':
                this.clearAll();
                break;
            case 'clear-entry':
                this.clearEntry();
                break;
        }
        
        this.updateDisplay();
    }
    
    inputNumber(num) {
        if (this.waitingForNewNumber) {
            this.currentInput = num;
            this.waitingForNewNumber = false;
        } else {
            this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
        }
        
        // Limit display length
        if (this.currentInput.length > 12) {
            this.currentInput = this.currentInput.slice(0, 12);
        }
    }
    
    inputDecimal() {
        if (this.waitingForNewNumber) {
            this.currentInput = '0.';
            this.waitingForNewNumber = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
    }
    
    inputOperation(nextOperation) {
        const inputValue = parseFloat(this.currentInput);
        
        if (this.previousInput === null) {
            this.previousInput = inputValue;
        } else if (this.operation) {
            const currentValue = this.previousInput || 0;
            const newValue = this.performCalculation(currentValue, inputValue, this.operation);
            
            if (newValue !== null) {
                this.currentInput = String(newValue);
                this.previousInput = newValue;
            } else {
                return; // Error occurred
            }
        }
        
        this.waitingForNewNumber = true;
        this.operation = nextOperation;
        
        // Update history display
        this.updateHistory();
        
        // Highlight active operation button
        this.highlightOperation(nextOperation);
    }
    
    calculate() {
        const inputValue = parseFloat(this.currentInput);
        
        if (this.previousInput !== null && this.operation) {
            const newValue = this.performCalculation(this.previousInput, inputValue, this.operation);
            
            if (newValue !== null) {
                // Store calculation for history
                this.lastCalculation = `${this.previousInput} ${this.getOperationSymbol(this.operation)} ${inputValue} = ${newValue}`;
                
                this.currentInput = String(newValue);
                this.previousInput = null;
                this.operation = null;
                this.waitingForNewNumber = true;
                
                // Update history
                this.historyDisplay.textContent = this.lastCalculation;
                
                // Clear operation highlighting
                this.clearOperationHighlight();
                
                // Flash calculation animation
                this.flashCalculation();
            }
        }
    }
    
    performCalculation(firstNumber, secondNumber, operation) {
        let result;
        
        try {
            switch (operation) {
                case 'add':
                    result = firstNumber + secondNumber;
                    break;
                case 'subtract':
                    result = firstNumber - secondNumber;
                    break;
                case 'multiply':
                    result = firstNumber * secondNumber;
                    break;
                case 'divide':
                    if (secondNumber === 0) {
                        this.showError('Cannot divide by zero');
                        return null;
                    }
                    result = firstNumber / secondNumber;
                    break;
                case 'percentage':
                    result = (firstNumber * secondNumber) / 100;
                    break;
                default:
                    return null;
            }
            
            // Handle very large or very small numbers
            if (!isFinite(result)) {
                this.showError('Result is too large');
                return null;
            }
            
            // Round to prevent floating point errors
            if (result % 1 !== 0) {
                result = Math.round(result * 100000000) / 100000000;
            }
            
            // Limit decimal places for display
            if (String(result).length > 12) {
                if (result < 1 && result > -1) {
                    result = parseFloat(result.toExponential(6));
                } else {
                    result = parseFloat(result.toPrecision(8));
                }
            }
            
            return result;
            
        } catch (error) {
            this.showError('Calculation error');
            return null;
        }
    }
    
    clearAll() {
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
        this.waitingForNewNumber = false;
        this.historyDisplay.textContent = '';
        this.clearOperationHighlight();
        
        // Flash clear animation
        this.currentDisplay.style.color = '#ff4757';
        setTimeout(() => {
            this.currentDisplay.style.color = '#00ff88';
        }, 200);
    }
    
    clearEntry() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
    }
    
    updateDisplay() {
        // Format number for display
        let displayValue = this.currentInput;
        
        // Add commas for large numbers
        if (!displayValue.includes('.') && displayValue.length > 3) {
            const number = parseInt(displayValue);
            if (!isNaN(number)) {
                displayValue = number.toLocaleString();
            }
        }
        
        this.currentDisplay.textContent = displayValue;
    }
    
    updateHistory() {
        if (this.previousInput !== null && this.operation) {
            const symbol = this.getOperationSymbol(this.operation);
            this.historyDisplay.textContent = `${this.previousInput} ${symbol}`;
        }
    }
    
    getOperationSymbol(operation) {
        const symbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷',
            'percentage': '%'
        };
        return symbols[operation] || '';
    }
    
    highlightOperation(operation) {
        // Clear previous highlights
        this.clearOperationHighlight();
        
        // Highlight current operation
        const operationButton = document.querySelector(`[data-operation="${operation}"]`);
        if (operationButton) {
            operationButton.classList.add('active');
        }
    }
    
    clearOperationHighlight() {
        document.querySelectorAll('.btn-operation').forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    flashCalculation() {
        this.currentDisplay.classList.add('calculating');
        setTimeout(() => {
            this.currentDisplay.classList.remove('calculating');
        }, 300);
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorModal.classList.add('show');
        
        // Clear calculator state
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
        this.waitingForNewNumber = false;
        this.clearOperationHighlight();
        
        // Show error in display
        this.currentDisplay.classList.add('error');
        setTimeout(() => {
            this.currentDisplay.classList.remove('error');
        }, 1000);
    }
    
    hideErrorModal() {
        this.errorModal.classList.remove('show');
        this.updateDisplay();
    }
    
    // Public method for keyboard input
    handleKeyboardInput(key) {
        if (key >= '0' && key <= '9') {
            this.inputNumber(key);
        } else if (key === '.') {
            this.inputDecimal();
        } else if (key === '+') {
            this.inputOperation('add');
        } else if (key === '-') {
            this.inputOperation('subtract');
        } else if (key === '*') {
            this.inputOperation('multiply');
        } else if (key === '/') {
            this.inputOperation('divide');
        } else if (key === '%') {
            this.inputOperation('percentage');
        } else if (key === 'Enter' || key === '=') {
            this.calculate();
        } else if (key === 'Escape') {
            this.clearAll();
        } else if (key === 'Backspace') {
            this.clearEntry();
        }
        
        this.updateDisplay();
    }
    
    // Memory functions (bonus features)
    getMemory() {
        return localStorage.getItem('calculator-memory') || '0';
    }
    
    setMemory(value) {
        localStorage.setItem('calculator-memory', String(value));
    }
    
    addToMemory(value) {
        const currentMemory = parseFloat(this.getMemory());
        this.setMemory(currentMemory + parseFloat(value));
    }
    
    clearMemory() {
        localStorage.removeItem('calculator-memory');
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new Calculator();
    
    // Add some fun console messages
    console.log('🎯 CODSOFT Task 3: Calculator');
    console.log('👨‍💻 Developer: Moti Sanjay');
    console.log('🔗 GitHub: https://github.com/sanjayrockerz/CODSOFT');
    console.log('🏷️ #codsoft #internship #webdevelopment');
});
