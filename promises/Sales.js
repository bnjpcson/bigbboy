const dbcon = require('../db/conn.js');

const DBgetSales = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT *, placedorders.status AS PO_status  FROM placedorders INNER JOIN orders ON placedorders.order_id = orders.order_id INNER JOIN userorders ON orders.order_id = userorders.order_id INNER JOIN products ON userorders.prod_id = products.prod_id INNER JOIN users ON orders.user_id = users.user_id WHERE placedorders.status = ?';
        dbcon.query(sql, ['Completed'], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}


// const DBselectLastOrder = async (user_id) => {
//     return new Promise((resolve, reject)=>{
//         let sql = 'SELECT * FROM orders WHERE user_id = ? and status = \'CART\' ORDER BY order_id DESC LIMIT 1';
//         dbcon.query(sql, [user_id], (error, elements)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
// }

// const DBaddOrder = async (user_id) => {
//     let date = new Date();
//     return new Promise((resolve, reject)=>{
//         let sql = 'INSERT INTO orders (user_id, status, date) VALUES (?,?,?)';
//         dbcon.query(sql, [user_id, "CART", date], (error, elements)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
// }

// const DBupdateDoneOrders = async (order_id) => {
//     return new Promise((resolve, reject)=>{
//         let sql = 'UPDATE orders SET status = ? WHERE order_id = ?';
//         dbcon.query(sql, ["DONE", order_id], (error, elements)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
// }



module.exports = {
    DBgetSales,
}
