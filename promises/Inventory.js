const dbcon = require('../db/conn.js');

const DBgetInventoryLog = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM inventory_log INNER JOIN products ON inventory_log.prod_id = products.prod_id INNER JOIN admins ON inventory_log.admin_id = admins.admin_id';
        dbcon.query(sql, (error, elements)=>{
            if(error){
                return reject(error);
            } 
            return resolve(elements);
        });
    });
}

const DBinsertInventoryLog = async (prod_id, admin_id, before, after) => {
    let date = new Date();
    return new Promise((resolve, reject)=>{
        let sql = 'INSERT INTO inventory_log (prod_id, admin_id, qty_before, qty_after, date_modified) VALUES (?,?,?,?,?)';
        dbcon.query(sql, [prod_id, admin_id, before, after, date], (error, elements)=>{
            if(error){
                return reject(error);
            } 
            return resolve(elements);
        });
    });
}



module.exports = {
    DBgetInventoryLog,
    DBinsertInventoryLog
}
