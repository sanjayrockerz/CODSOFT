// ===== KEYBOARD SUPPORT =====
class KeyboardHandler {
    constructor(calculator) {
        this.calculator = calculator;
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Prevent default behavior for calculator keys
        document.addEventListener('keydown', (e) => {
            const calculatorKeys = [
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                '+', '-', '*', '/', '%', '.', 'Enter', 'Escape', 'Backspace'
            ];
            
            if (calculatorKeys.includes(e.key)) {
                e.preventDefault();
            }
        });
        
        console.log('⌨️ Keyboard support enabled');
    }
    
    handleKeyDown(event) {
        const key = event.key;
        
        // Visual feedback for pressed keys
        this.highlightButton(key, true);
        
        // Handle calculator input
        this.calculator.handleKeyboardInput(key);
        
        // Show keyboard hint
        this.showKeyboardHint(key);
    }
    
    handleKeyUp(event) {
        const key = event.key;
        
        // Remove visual feedback
        this.highlightButton(key, false);
    }
    
    highlightButton(key, isPressed) {
        let selector = null;
        
        // Map keys to button selectors
        if (key >= '0' && key <= '9') {
            selector = `[data-number="${key}"]`;
        } else if (key === '.') {
            selector = '[data-action="decimal"]';
        } else if (key === '+') {
            selector = '[data-operation="add"]';
        } else if (key === '-') {
            selector = '[data-operation="subtract"]';
        } else if (key === '*') {
            selector = '[data-operation="multiply"]';
        } else if (key === '/') {
            selector = '[data-operation="divide"]';
        } else if (key === '%') {
            selector = '[data-operation="percentage"]';
        } else if (key === 'Enter' || key === '=') {
            selector = '[data-action="calculate"]';
        } else if (key === 'Escape') {
            selector = '[data-action="clear-all"]';
        } else if (key === 'Backspace') {
            selector = '[data-action="clear-entry"]';
        }
        
        // Apply/remove highlight
        if (selector) {
            const button = document.querySelector(selector);
            if (button) {
                if (isPressed) {
                    button.classList.add('pressed');
                    button.style.transform = 'translateY(2px)';
                } else {
                    button.classList.remove('pressed');
                    button.style.transform = '';
                }
            }
        }
    }
    
    showKeyboardHint(key) {
        // Create temporary hint element
        const hint = document.createElement('div');
        hint.className = 'keyboard-hint';
        hint.textContent = `Key: ${key}`;
        hint.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.2s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(hint);
        
        // Animate in
        setTimeout(() => {
            hint.style.opacity = '1';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            hint.style.opacity = '0';
            setTimeout(() => {
                if (hint.parentNode) {
                    hint.parentNode.removeChild(hint);
                }
            }, 200);
        }, 800);
    }
    
    // Alternative keyboard layouts support
    getAlternativeKey(key) {
        const alternatives = {
            'x': '*',  // Alternative multiply
            '×': '*',  // Alternative multiply
            '÷': '/',  // Alternative divide
            '−': '-',  // Alternative minus
            'Delete': 'Backspace',
            'Clear': 'Escape'
        };
        
        return alternatives[key] || key;
    }
}

// Enhanced keyboard shortcuts info
const KeyboardShortcuts = {
    numbers: {
        '0-9': 'Input numbers',
        '.': 'Decimal point'
    },
    operations: {
        '+': 'Addition',
        '-': 'Subtraction',
        '*': 'Multiplication',
        '/': 'Division',
        '%': 'Percentage'
    },
    controls: {
        'Enter': 'Calculate result',
        '=': 'Calculate result (alternative)',
        'Escape': 'Clear all',
        'Backspace': 'Delete last digit',
        'Delete': 'Delete last digit (alternative)'
    },
    
    // Get formatted shortcut list
    getFormattedList() {
        const categories = [
            { title: 'Numbers', shortcuts: this.numbers },
            { title: 'Operations', shortcuts: this.operations },
            { title: 'Controls', shortcuts: this.controls }
        ];
        
        return categories;
    }
};

// Keyboard accessibility enhancements
class AccessibilityHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.addAriaLabels();
        this.addFocusManagement();
        this.addScreenReaderSupport();
    }
    
    addAriaLabels() {
        // Add ARIA labels to buttons
        document.querySelectorAll('.btn').forEach(button => {
            const action = button.dataset.action;
            const number = button.dataset.number;
            const operation = button.dataset.operation;
            
            let label = '';
            
            if (number) {
                label = `Number ${number}`;
            } else if (operation) {
                const operationNames = {
                    'add': 'Plus',
                    'subtract': 'Minus',
                    'multiply': 'Multiply',
                    'divide': 'Divide',
                    'percentage': 'Percentage'
                };
                label = operationNames[operation] || operation;
            } else if (action) {
                const actionNames = {
                    'decimal': 'Decimal point',
                    'calculate': 'Equals, calculate result',
                    'clear-all': 'Clear all',
                    'clear-entry': 'Clear entry'
                };
                label = actionNames[action] || action;
            }
            
            if (label) {
                button.setAttribute('aria-label', label);
            }
        });
    }
    
    addFocusManagement() {
        // Ensure calculator is keyboard navigable
        const calculator = document.getElementById('calculator');
        calculator.setAttribute('role', 'application');
        calculator.setAttribute('aria-label', 'Calculator');
        
        // Add tabindex to buttons
        document.querySelectorAll('.btn').forEach((button, index) => {
            button.setAttribute('tabindex', '0');
        });
    }
    
    addScreenReaderSupport() {
        const display = document.getElementById('current-display');
        display.setAttribute('aria-live', 'polite');
        display.setAttribute('aria-label', 'Calculator display');
        
        const history = document.getElementById('history');
        history.setAttribute('aria-live', 'polite');
        history.setAttribute('aria-label', 'Calculation history');
    }
}

// Initialize keyboard handler when calculator is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for calculator to be initialized
    setTimeout(() => {
        if (window.calculator) {
            window.keyboardHandler = new KeyboardHandler(window.calculator);
            window.accessibilityHandler = new AccessibilityHandler();
            
            console.log('⌨️ Keyboard and accessibility features loaded');
        }
    }, 100);
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KeyboardHandler, KeyboardShortcuts, AccessibilityHandler };
}
