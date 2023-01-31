const dbcon = require('../db/conn.js');

const DBgetUsers = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM users ORDER BY user_id DESC';
        dbcon.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBselectUser = async (id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM users WHERE user_id = ?';
        dbcon.query(sql, [id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBselectUserEmail = async (email) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM users WHERE email = ?';
        dbcon.query(sql, [email], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}


const DBaddUsers = async (user) => {
    return new Promise((resolve, reject)=>{
        let sql = 'INSERT INTO users (name, username, email, phonenum, password) VALUES (?,?,?,?,?)';
        dbcon.query(sql, [user.name, user.username, user.email, user.phonenum, user.password], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBupdateUser = async (user) => {
    return new Promise((resolve, reject)=>{
        let sql = 'UPDATE users SET name = ?, username = ?, email = ?, phonenum = ? WHERE user_id = ?';
        dbcon.query(sql, [user.name, user.username, user.email, user.phonenum, user.user_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBdeleteUser = async (user_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'DELETE FROM users WHERE user_id = ?';
        dbcon.query(sql, [user_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBgetAdmins = async () => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM admins ORDER BY admin_id DESC';
        dbcon.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBselectAdmin = async (id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM admins WHERE admin_id = ?';
        dbcon.query(sql, [id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBselectAdminEmail = async (email) => {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM admins WHERE email = ?';
        dbcon.query(sql, [email], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBaddAdmin = async (admin) => {
    return new Promise((resolve, reject)=>{
        let sql = 'INSERT INTO admins (name, username, email, phonenum, password) VALUES (?,?,?,?,?)';
        dbcon.query(sql, [admin.name, admin.username, admin.email, admin.phonenum, admin.password], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const DBupdateAdmin = async (admin) => {
    return new Promise((resolve, reject)=>{
        let sql = 'UPDATE admins SET name = ?, username = ?, email = ?, phonenum = ? WHERE admin_id = ?';
        dbcon.query(sql, [admin.name, admin.username, admin.email, admin.phonenum, admin.admin_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
const DBdeleteAdmin = async (admin_id) => {
    return new Promise((resolve, reject)=>{
        let sql = 'DELETE FROM admins WHERE admin_id = ?';
        dbcon.query(sql, [admin_id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

module.exports = {
    DBgetUsers,
    DBgetAdmins,
    DBaddUsers,
    DBselectUser,
    DBselectUserEmail,
    DBupdateUser,
    DBdeleteUser,
    DBselectAdmin,
    DBselectAdminEmail,
    DBaddAdmin,
    DBupdateAdmin,
    DBdeleteAdmin
}