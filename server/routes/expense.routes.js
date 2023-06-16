const express = require('express');
const expenseRouter = express.Router();
const ExpenseController = require('../controllers/ExpenseController')



expenseRouter.get('/get-expense/:id', ExpenseController.getExpense);

expenseRouter.delete('/delete-expense/:id', ExpenseController.deleteExpense);

expenseRouter.post('/set-budget/:id', ExpenseController.setBudget)

expenseRouter.post('/add-expense/:id', ExpenseController.addExpense)
module.exports = expenseRouter;