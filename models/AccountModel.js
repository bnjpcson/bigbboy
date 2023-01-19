const dbcon = require('../db/conn.js');

const DBgetUsers = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM users';
        dbcon.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBgetAdmins = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM admins';
        dbcon.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

module.exports = {
    DBgetUsers,
    DBgetAdmins
}