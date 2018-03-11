import mysql from 'mysql';
import async from 'async';

var res = {};
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zyq123',
    port: 3306,
    database: 'test'
});

export {
    connection
};
