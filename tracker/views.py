from django.shortcuts import render, redirect
from .models import Transaction
from .forms import TransactionForm

def index(request):
    transactions = Transaction.objects.all()
    total_income = sum(t.amount for t in transactions if t.type == 'income')
    total_expense = sum(t.amount for t in transactions if t.type == 'expense')
    balance = total_income - total_expense

    customer_profile = {
        'full_name': 'John Doe',
        'email': 'johndoe@example.com',
        'phone': '+1234567890',
        'address': '123 Main St, City, Country',
        'balance': '$500.00',
    }

    context = {
        'transactions': transactions,
        'total_income': total_income,
        'total_expense': total_expense,
        'balance': balance,
        'customer_profile': customer_profile,
    }

    return render(request, 'tracker/index.html', context)

def add_transaction(request):
    if request.method == 'POST':
        form = TransactionForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = TransactionForm()

    return render(request, 'tracker/add_transaction.html', {'form': form})



