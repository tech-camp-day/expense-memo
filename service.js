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
  const getTransactions = db.prepare(`select * from transactions where date >= date("now", "-${lookbackDays} days")`);
  const getTotalAmount = db.prepare(`select sum(amount) as totalAmount from transactions where date >= date("now", "-${lookbackDays} days")`);
  
  try {
    const transactions = getTransactions.all();
    const totalAmount = getTotalAmount.get().totalAmount;
    
    return { transactions, totalAmount };
  } catch (error) {
    console.error('Error getting report:', error);
    throw error;
  }
};

module.exports = { saveTransaction, getReport };
