const db = require('better-sqlite3')('expense-memo.db', { verbose: console.log });

/**
 * กำหนดค่าเริ่มต้นให้ฐานข้อมูลโดยการสร้างตารางที่จำเป็นหากยังไม่มีอยู่
 */
const initDb = () => {
    const createTransactionTable = db.prepare(`
      create table if not exists transactions (
        id integer primary key autoincrement,
        name varchar not null,
        amount float not null,
        date timestamp default current_timestamp not null
      )
    `);

    const createAllTables = db.transaction(() => {
        createTransactionTable.run();
    });
    
    createAllTables();
};

initDb();

/**
 * บันทึกธุรกรรมลงในฐานข้อมูล
 * @param {string} name - ชื่อของธุรกรรม
 * @param {number} amount - จำนวนเงินของธุรกรรม
 * @throws {Error} เมื่อเกิดข้อผิดพลาดในการบันทึกธุรกรรม
 */
function saveTransaction(name, amount) {
  const insertTransaction = db.prepare('insert into transactions (name, amount) values (?, ?)');
  
  try {
    insertTransaction.run(name, amount);
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw error;
  }
}

/**
 * ดึงรายงานของธุรกรรมภายในช่วงเวลาที่กำหนด
 * @param {number} lookbackDays - จำนวนวันที่ต้องการดูย้อนหลังสำหรับรายงาน
 * @returns {Object} ออบเจ็กต์ที่ประกอบด้วยจำนวนธุรกรรมและยอดเงินรวมในช่วงเวลาที่กำหนด
 * @throws {Error} เมื่อเกิดข้อผิดพลาดในการดึงรายงาน
 */
function getReport(lookbackDays) {
  const lookbackPreparedStr = `-${lookbackDays} days`;
  
  const getTransactionCount = db.prepare(`select count(*) as transactionCount from transactions where datetime(date) >= datetime('now', ?)`);
  const getTotalAmount = db.prepare(`select sum(amount) as totalAmount from transactions where datetime(date) >= datetime('now', ?)`);
  
  try {
    const transactions = getTransactionCount.get(lookbackPreparedStr).transactionCount;
    const totalAmount = getTotalAmount.get(lookbackPreparedStr).totalAmount;
    
    return { transactions, totalAmount };
  } catch (error) {
    console.error('Error getting report:', error);
    throw error;
  }
};

module.exports = { saveTransaction, getReport };
