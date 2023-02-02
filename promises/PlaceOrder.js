const dbcon = require('../db/conn.js');

const DBgetPlaceOrders = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM placedorders';
        dbcon.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBgetUserPlaceOrders = async (user_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT *, placedorders.status as PO_status, placedorders.date as PO_date FROM placedorders INNER JOIN orders ON placedorders.order_id = orders.order_id WHERE user_id = ?';
        dbcon.query(sql, [user_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}



const DBaddPlaceOrder = async (placeOrder) => {
    let date = new Date();
    return new Promise((resolve, reject)=>{
        let sql = 'INSERT INTO placedorders (order_id, p_method, totalprice, status, date) VALUES (?,?,?,?,?)';
        dbcon.query(sql, [placeOrder.order_id, placeOrder.p_method, placeOrder.order_total, "Pending", date], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}




module.exports = {
    DBgetPlaceOrders,
    DBgetUserPlaceOrders,
    DBaddPlaceOrder
}
