const db = require('better-sqlite3')('expense-memo.db', { verbose: console.log });

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

module.exports = db;
