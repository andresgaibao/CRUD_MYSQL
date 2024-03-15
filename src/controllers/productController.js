// controllers/productController.js

// Importar todos los modelos
import * as productModel from '../models/productModel.js';

// Obtener todod los productos
// getAllProducts

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getProducts();
        console.log(products);
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un producto por id
// GetProductById

export const getProductById = async (req, res) => {
    try {
        const producId = req.params.id;
        const product = await productModel.getProductById(producId);
        if(product){
            res.status(201).json(product);
        }else{
            res.status(404).json({ message: "No se encontró el producto" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un producto
// createProduct

export const createProduct = async (req, res) => {
    try {
        const {name, price, description} = req.body;
        if(!name || !price || !description){
            res.status(400).json({ message: "Faltan datos" });
        }
        const productid = await productModel.createProduct({name, price, description});
        res.status(201).json({id: productid, name,  price,  description});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un producto existente
// updateProduct

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params;
        const {name, price, description} = req.body;
        if(!name ||!price ||!description){
            res.status(400).json({ message: "Faltan datos" });
        }
        const productid = await productModel.updateProduct(productId, {name, price, description});
        res.status(200).json({message: 'producto actualizado correctamente'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un producto existente
// deleteProduct

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params;
        await productModel.deleteProduct(productId);
        res.status(200).json({message: 'producto eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}