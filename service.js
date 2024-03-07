const db = require('./db');

const saveTransaction = (name, amount) => {
  const insertTransaction = db.prepare('insert into transactions (name, amount) values (?, ?)');
  
  try {
    insertTransaction.run(name, amount);
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw error;
  }
};

const getReport = (lookbackDays) => {
  const lookbackPreparedStr = `-${lookbackDays} days`;
  const getTransactions = db.prepare(`select * from transactions where datetime(date) >= datetime('now', ?)`);
  const getTotalAmount = db.prepare(`select sum(amount) as totalAmount from transactions where datetime(date) >= datetime('now', ?)`);
  
  try {
    const transactions = getTransactions.all(lookbackPreparedStr);
    const totalAmount = getTotalAmount.get(lookbackPreparedStr).totalAmount;
    
    return { transactions, totalAmount };
  } catch (error) {
    console.error('Error getting report:', error);
    throw error;
  }
};

module.exports = { saveTransaction, getReport };
