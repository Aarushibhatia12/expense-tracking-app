const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get All Expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a New Expense
router.post('/', async (req, res) => {
  const { name, amount, category } = req.body;
  const expense = new Expense({ name, amount, category });
  try {
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
