const express = require('express');
const incomeRouter = express.Router();
const IncomeController = require('../controllers/IncomeController');

incomeRouter.delete('/delete-income/:id', IncomeController.deleteIncome)

incomeRouter.get('/get-income/:id', IncomeController.getIncome);

incomeRouter.post('/add-income/:id', IncomeController.addIncome)
module.exports = incomeRouter;