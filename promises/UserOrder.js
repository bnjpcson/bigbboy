const dbcon = require('../db/conn.js');

const DBgetUserOrders = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM userorders INNER JOIN users ON userorders.user_id = users.user_id INNER JOIN products ON userorders.prod_id = products.prod_id  ORDER BY userOrders_id DESC';
        dbcon.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBselectUserOrder = async (id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM userorders WHERE userOrders_id = ?';
        dbcon.query(sql, [id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBaddUserOrder = async (userOrder) => {
    return new Promise((resolve, reject)=>{
        let sql = 'INSERT INTO userorders (user_id, prod_id, quantity, totalprice, checkout) VALUES (?,?,?,?,?)';
        dbcon.query(sql, [userOrder.user_id, userOrder.prod_id, userOrder.qty, userOrder.totalprice, 0], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBupdateUserOrder = async (userOrder) => {
    return new Promise((resolve, reject)=>{
        let sql = 'UPDATE userorders SET supplier_id = ?, prod_name = ?, prod_price = ?, prod_srp = ?, imgpath = ?, qty = ? WHERE prod_id = ?';
        dbcon.query(sql, [product.supplier_id, product.prod_name, product.prod_price, product.prod_srp, product.imgpath, product.qty, product.prod_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBdeleteUserOrder = async (prod_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'DELETE FROM products WHERE prod_id = ?';
        dbcon.query(sql, [prod_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

module.exports = {
    DBgetUserOrders,
    DBselectUserOrder,
    DBaddUserOrder,
    DBupdateUserOrder,
    DBdeleteUserOrder
}
