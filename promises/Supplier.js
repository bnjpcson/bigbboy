const dbcon = require('../db/conn.js');

const DBgetSuppliers = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT s.supplier_id, s.supplier_name, (SELECT COUNT(*) FROM products p WHERE p.supplier_id = s.supplier_id) as total FROM suppliers s ORDER BY supplier_id DESC';
        dbcon.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBselectSupplier = async (id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM suppliers WHERE supplier_id = ?';
        dbcon.query(sql, [id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBaddSupplier = async (supplier_name) => {
    return new Promise((resolve, reject)=>{
        let sql = 'INSERT INTO suppliers (supplier_name) VALUES (?)';
        dbcon.query(sql, [supplier_name], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBupdateSupplier = async (supplier) => {
    return new Promise((resolve, reject)=>{
        let sql = 'UPDATE suppliers SET supplier_name = ? WHERE supplier_id = ?';
        dbcon.query(sql, [supplier.supplier_name, supplier.supplier_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBdeleteSupplier = async (supplier_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'DELETE FROM suppliers WHERE supplier_id = ?';
        dbcon.query(sql, [supplier_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

module.exports = {
    DBgetSuppliers,
    DBselectSupplier,
    DBaddSupplier,
    DBupdateSupplier,
    DBdeleteSupplier
}
