const db = require('../config/db');

const Produto = {
    getAllProduto: (callback) => {
        const sql = 'SELECT * FROM Produtos';
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results); 
        });
    },

    getProdutoById: (id, callback) => {
        const sql = 'SELECT * FROM Produtos WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            callback(result[0]);
        });
    },

    addProduto: (data, callback) => {
        const sql = 'INSERT INTO Produtos SET ?';
        db.query(sql, data, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    },

    updateProduto: (id, data, callback) => {
        const sql = 'UPDATE Produtos SET ? WHERE id = ?';
        db.query(sql, [data, id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    },

    deleteProduto: (id, callback) => {
        const sql = 'DElete FROM Produtos WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    },

    getAdiminByAdminname: (Adminname, callback) => {
        const sql = 'SELECT *FROM Produtos WHERE Adminname = ?';
        db.query(sql, [Adminname], (err, result) => {
            if (err) throw err;
            callback(result[0]);
        });
    },

    getProdutosPorCategoria: (categoria, callback) => {
        const sql = 'SELECT * FROM Produtos WHERE categoria = ?';
        db.query(sql, [categoria], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }
    
};

module.exports = Produto;