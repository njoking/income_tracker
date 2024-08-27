// static/js/app.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    // Format currency in transaction table
    document.querySelectorAll('.amount-cell').forEach(function(cell) {
        const amount = parseFloat(cell.textContent.replace('$', ''));
        cell.textContent = formatCurrency(amount);
    });

    // Add transaction form validation
    const addTransactionForm = document.getElementById('add-transaction-form');
    if (addTransactionForm) {
        addTransactionForm.addEventListener('submit', function(event) {
            const amountInput = document.getElementById('amount');
            const amount = parseFloat(amountInput.value);
            if (isNaN(amount) || amount <= 0) {
                event.preventDefault();
                alert('Please enter a valid positive amount.');
            }
        });
    }

    // Dynamic category suggestions
    const categoryInput = document.getElementById('category');
    const suggestions = ['Salary', 'Rent', 'Groceries', 'Utilities', 'Entertainment', 'Transportation'];
    if (categoryInput) {
        const datalist = document.createElement('datalist');
        datalist.id = 'category-suggestions';
        suggestions.forEach(suggestion => {
            const option = document.createElement('option');
            option.value = suggestion;
            datalist.appendChild(option);
        });
        categoryInput.setAttribute('list', 'category-suggestions');
        categoryInput.after(datalist);
    }

    // Toggle transaction type color
    const typeSelect = document.getElementById('type');
    const amountGroup = document.querySelector('.amount-group');
    if (typeSelect && amountGroup) {
        typeSelect.addEventListener('change', function() {
            if (this.value === 'Income') {
                amountGroup.classList.remove('text-danger');
                amountGroup.classList.add('text-success');
            } else {
                amountGroup.classList.remove('text-success');
                amountGroup.classList.add('text-danger');
            }
        });
    }

    // Calculate and update balance in real-time
    function updateBalance() {
        const incomeTotal = document.getElementById('income-total');
        const expenseTotal = document.getElementById('expense-total');
        const balanceTotal = document.getElementById('balance-total');
        
        if (incomeTotal && expenseTotal && balanceTotal) {
            const income = parseFloat(incomeTotal.textContent.replace('$', ''));
            const expense = parseFloat(expenseTotal.textContent.replace('$', ''));
            const balance = income - expense;
            balanceTotal.textContent = formatCurrency(balance);
            balanceTotal.classList.toggle('text-danger', balance < 0);
            balanceTotal.classList.toggle('text-success', balance >= 0);
        }
    }

    updateBalance();
});