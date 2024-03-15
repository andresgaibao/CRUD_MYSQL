import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container-pr">
            <h2>Lista de Productos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Acciones</th> {/* Nueva columna para acciones */}
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <Link to={`/products/${product.id}/edit`}>Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/products/new">
                <button className="btn">Nuevo Producto</button>
            </Link>
        </div>
    );
};

export default ProductList;
