// routes/productRoutes.js

import express from 'express';
// importar the data from products.js
import * as productController from '../controllers/productController.js'

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/products', productController.getAllProducts);

// Ruta para obtener un producto
router.get('/products/:id', productController.getProductById);

// Ruta para crear un producto
router.post('/products/new', productController.createProduct);

// Ruta para actualizar un producto
router.put('/products/:id', productController.updateProduct);

// Ruta para eliminar un producto
router.delete('/products/:id', productController.deleteProduct);

export default router;