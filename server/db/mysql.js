const mysql = require('mysql');

//创建连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'echong',
    multipleStatements: true
});

function query(sql){
    // sql : mysql语句
    return new Promise((resolve,reject) => {
        pool.query(sql,(err,data)=>{
            if(err) reject(err);
            resolve(data);
        })
    })
}

module.exports = query;