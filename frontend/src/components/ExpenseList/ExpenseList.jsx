import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExpenseList.css'

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const result = await axios.get('http://localhost:5000/api/expenses');
      setExpenses(result.data);
    };
    fetchExpenses();
  }, []);

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense._id}>
          {expense.name}: ₹{expense.amount} ({expense.category})
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
