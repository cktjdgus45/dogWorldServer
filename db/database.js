// db.js
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'whdudfks12!',
    database: 'dogworld',
});

export const db = pool.promise();
