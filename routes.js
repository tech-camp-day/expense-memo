const express = require('express');
const { saveTransaction, getReport } = require('./service');
const router = express.Router();


router.post('/transactions', (req, res) => {
  const { name, amount } = req.body;

  try {
    saveTransaction(name, amount);
    res.status(201).send();
  } catch (error) {
    res.status(500).json(e);
  }
});

router.get('/reports/last4weeks', (req, res) => {
  const { totalAmount, transactions } = getReport(28);

  try {
    res.json({ totalAmount, transactions });
  } catch (error) {
    res.status(500).json(e);
  }
});


router.get('/reports/last12months', (req, res) => {
  const { totalAmount, transactions } = getReport(365);

  try {
    res.json({ totalAmount, transactions });
  } catch (error) {
    res.status(500).json(e);
  }
});

module.exports = router;