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

const DBselectUserOrders = async (user_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM userorders INNER JOIN products ON userorders.prod_id = products.prod_id INNER JOIN orders ON userorders.order_id = orders.order_id INNER JOIN users ON orders.user_id = users.user_id WHERE users.user_id = ? AND orders.status = ?';
        dbcon.query(sql, [user_id, "CART"], (error, elements)=>{
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
        let sql = 'INSERT INTO userorders (order_id, prod_id, quantity) VALUES (?,?,?)';
        dbcon.query(sql, [userOrder.order_id, userOrder.prod_id, userOrder.qty], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBgetTotalSum = async (user_id, order_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT sum(subtotal) AS order_total FROM (SELECT userorders.order_id,userorders.prod_id, (prod_srp * quantity) AS subtotal FROM userorders INNER JOIN orders ON userorders.order_id = orders.order_id INNER JOIN products ON userorders.prod_id = products.prod_id WHERE user_id = ? AND userorders.order_id = ?) t';
        dbcon.query(sql, [user_id, order_id], (error, elements)=>{
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

const DBupdateOrderQuantity = async (userOrder) => {
    return new Promise((resolve, reject)=>{
        let sql = 'UPDATE userorders SET quantity = ? WHERE userOrders_id = ?';
        dbcon.query(sql, [userOrder.quantity, userOrder.userOrders_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBdeleteUserOrder = async (userOrders_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'DELETE FROM userorders WHERE userOrders_id = ?';
        dbcon.query(sql, [userOrders_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

module.exports = {
    DBgetUserOrders,
    DBselectUserOrders,
    DBselectUserOrder,
    DBaddUserOrder,
    DBgetTotalSum,
    DBupdateUserOrder,
    DBupdateOrderQuantity,
    DBdeleteUserOrder
}
