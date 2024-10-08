import React, { useState } from 'react';
import './ExpenseForm.css'

const ExpenseForm = () => {
  const [expense, setExpense] = useState({ name: '', amount: '', category: '' });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation (optional)
    if (!expense.name || !expense.amount || !expense.category) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      // Clear the form on success
      setExpense({ name: '', amount: '', category: '' });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={expense.name}
        onChange={handleChange}
        placeholder="Expense Name"
      />
      <input
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        placeholder="Amount"
      />
      <input
        type="text"
        name="category"
        value={expense.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
