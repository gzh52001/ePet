//引入mysql模块
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

//封装query方法
function query(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, data) => {
            if (err) reject(err);//失败的回调
            resolve(data);//成功的数据放到成功回调里面
        })
    })
}

module.exports = query;