const dbcon = require('../db/conn.js');

const DBgetProducts = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM products INNER JOIN suppliers ON products.supplier_id = suppliers.supplier_id ORDER BY prod_id DESC';
        dbcon.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBselectProduct = async (id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM products WHERE prod_id = ?';
        dbcon.query(sql, [id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBaddProduct = async (product) => {
    return new Promise((resolve, reject)=>{
        let sql = 'INSERT INTO products (supplier_id, prod_name, prod_price, prod_srp, imgpath, qty) VALUES (?,?,?,?,?,?)';
        dbcon.query(sql, [product.supplier_id, product.prod_name, product.prod_price, product.prod_srp, product.imgpath, product.qty], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBupdateProduct = async (product) => {
    console.log(product);
    return new Promise((resolve, reject)=>{
        let sql = 'UPDATE products SET supplier_id = ?, prod_name = ?, prod_price = ?, prod_srp = ?, imgpath = ?, qty = ? WHERE prod_id = ?';
        dbcon.query(sql, [product.supplier_id, product.prod_name, product.prod_price, product.prod_srp, product.imgpath, product.qty, product.prod_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBdeleteProduct = async (prod_id) => {
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
    DBgetProducts,
    DBselectProduct,
    DBaddProduct,
    DBupdateProduct,
    DBdeleteProduct
}
