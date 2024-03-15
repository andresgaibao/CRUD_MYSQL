// ⁡⁢⁢model/producModel.js⁡
// Creación del modelo producto.

import { dbConfig } from '../config/db.config.js'
import mysql from 'mysql2/promise'

const pool = mysql.createPool(dbConfig);

// Obtener todos los productos.⁡
// getAllProducts

export const getProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
};

// Obteber productos por su id
// getProductById

export const getProductById = async (productId) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id =?', [productId]);
    return rows[0];
};

// Agregar un producto
// crate

export const createProduct = async (productData) => {
    const { name, price, description } = productData;
    const [result]  = await pool.query('INSERT INTO products (name, price, description) VALUES(?, ?,?)', [name, price, description]);
    return result.insertId;
};

// Actualizar un producto existente
// update

export const updateProduct = async (productId, productData) => {
    const { name, price, description } = productData;
    await pool.query('UPDATE products SET name = ?, price = ?, description =? WHERE id = ?', [name, price, description, productId]);
};

// Eliminar un producto existente
// DELETE

export const deleteProduct = async (productId) => {
    await pool.query('DELETE FROM products WHERE id =?', [productId]);
};