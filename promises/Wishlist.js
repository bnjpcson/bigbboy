const dbcon = require('../db/conn.js');

const DBgetWishlist = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM wishlist INNER JOIN users ON wishlist.user_id = users.user_id';
        dbcon.query(sql, (error, elements)=>{
            if(error){
                return reject(error);
            } 
            return resolve(elements);
        });
    });
}

const DBinsertWishlist = async (user_id, wish) => {
    let date = new Date();
    return new Promise((resolve, reject)=>{
        let sql = 'INSERT INTO wishlist (user_id, wish, date) VALUES (?,?,?)';
        dbcon.query(sql, [user_id, wish, date], (error, elements)=>{
            if(error){
                return reject(error);
            } 
            return resolve(elements);
        });
    });
}

const DBdeleteWishlist = async (wishlist_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'DELETE FROM wishlist WHERE wishlist_id = ?';
        dbcon.query(sql, [wishlist_id], (error, elements)=>{
            if(error){
                return reject(error);
            } 
            return resolve(elements);
        });
    });
}



module.exports = {
    DBgetWishlist,
    DBinsertWishlist,
    DBdeleteWishlist
}
