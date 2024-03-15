import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: ''
    });

    const navigate = useNavigate();


    useEffect(() => {
        //edit product
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`/products/${id}`);
                    setFormData(response.data);
                } catch (error) {
                    console.log('Server error', error);
                }
            }
            fetchProduct();
        }
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.description) {
            alert('Faltan datos');
            return;
        }
        try {
            if (id) {
                // Update product
                await axios.put(`/products/${id}`, formData);
                alert('Product has ven saved');
                navigate('/products');
            } else {
                // Create new product
                await axios.post(`/products/new`, formData);
                alert('Product has ven saved');
                navigate('/products');
            }
            
            
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="product-form-container">
            <h2>Crear Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Precio:</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
};

export default ProductForm
