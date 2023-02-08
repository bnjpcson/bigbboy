const dbcon = require('../db/conn.js');

// const DBgetPlaceOrders = async () => {
//     return new Promise((resolve, reject)=>{
//         let sql = 'SELECT * FROM placedorders WHERE status = ?';
//         dbcon.query(sql, ["Pending"], (error, elements)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
// }

const DBgetPendingPlaceOrders = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT *, placedorders.status AS PO_status FROM placedorders INNER JOIN orders ON placedorders.order_id = orders.order_id INNER JOIN users ON orders.user_id = users.user_id WHERE placedorders.status = ?';
        dbcon.query(sql, ["Pending"], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBgetCanceledPlaceOrders = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT *, placedorders.status AS PO_status FROM placedorders INNER JOIN orders ON placedorders.order_id = orders.order_id INNER JOIN users ON orders.user_id = users.user_id WHERE placedorders.status = ?';
        dbcon.query(sql, ["Canceled"], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBgetPlaceOrders = async (status) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT *, placedorders.status AS PO_status FROM placedorders INNER JOIN orders ON placedorders.order_id = orders.order_id INNER JOIN users ON orders.user_id = users.user_id WHERE placedorders.status = ?';
        dbcon.query(sql, [status], (error, elements)=>{
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

const DBgetAdminPlaceOrders = async (user_id) => {
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

const DBviewUserPlaceOrder = async (place_orderid) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT *, placedorders.status as PO_status, placedorders.date as PO_date FROM placedorders INNER JOIN orders ON placedorders.order_id = orders.order_id INNER JOIN userorders ON orders.order_id = userorders.order_id INNER JOIN products ON userorders.prod_id = products.prod_id WHERE place_orderid = ?';
        dbcon.query(sql, [place_orderid], (error, elements)=>{
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

const DBcancelPlaceOrder = async (order_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'UPDATE placedorders SET status = ? WHERE place_orderid = ?';
        dbcon.query(sql, ["Canceled", order_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBsetStatusPlaceOrder = async (status, place_orderid) => {
    return new Promise((resolve, reject)=>{
        let sql = 'UPDATE placedorders SET status = ? WHERE place_orderid = ?';
        dbcon.query(sql, [status, place_orderid], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBsoldProduct = async (quantity, prod_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'UPDATE products SET sold = ? WHERE prod_id = ?';
        dbcon.query(sql, [quantity, prod_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBcompleteOrder = async (place_orderid) => {
    let date = new Date();
    return new Promise((resolve, reject)=>{
        let sql = 'INSERT INTO transactions (place_orderid, date_completed) VALUES (?,?)';
        dbcon.query(sql, [place_orderid, date], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}





module.exports = {
    DBgetPlaceOrders,
    DBgetPendingPlaceOrders,
    DBgetCanceledPlaceOrders,
    DBgetUserPlaceOrders,
    DBaddPlaceOrder,
    DBviewUserPlaceOrder,
    DBcancelPlaceOrder,
    DBgetAdminPlaceOrders,
    DBsetStatusPlaceOrder,
    DBsoldProduct,
    DBcompleteOrder
}
