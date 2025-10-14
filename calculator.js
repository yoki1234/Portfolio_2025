// File: calculator.js
// Author: Dheeraj (Hacktoberfest 2025)
// Description: Basic calculator supporting +, -, *, /

function calculate(a, b, operator) {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : "❌ Cannot divide by zero";
    default: return "Invalid operator";
  }
}

// Example usage
const a = parseFloat(prompt("Enter first number:"));
const operator = prompt("Enter operator (+, -, *, /):");
const b = parseFloat(prompt("Enter second number:"));
alert(`Result: ${calculate(a, b, operator)}`);
