import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ productos }) => {
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleProductClick = (producto) => {
        navigate(`/admin/productos/${producto.id}`);
    };

    const getStatusBadge = (eliminado) => {
        if (eliminado) {
            return <span className="badge badge-eliminado">Eliminado</span>;
        }
        return <span className="badge badge-activo">Activo</span>;
    };

    return (
        <div className="product-table-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id} className="product-row">
                            <td>
                                <div className="product-cell" onClick={() => handleProductClick(producto)}>
                                    {producto.imagenUrl ? (
                                        <img
                                            src={producto.imagenUrl}
                                            alt={producto.nombre}
                                            className="product-thumbnail"
                                        />
                                    ) : (
                                        <div className="product-thumbnail placeholder">
                                            🛍️
                                        </div>
                                    )}
                                    <div className="product-info">
                                        <h4 className="product-name">{producto.nombre}</h4>
                                        <p className="product-desc">{producto.descripcion?.substring(0, 50)}...</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="category-badge">
                                    {producto.categoria?.nombre || 'Sin categoría'}
                                </span>
                            </td>
                            <td>
                                <span className="product-price">
                                    {formatPrice(producto.precio)}
                                </span>
                            </td>
                            <td>
                                {getStatusBadge(producto.eliminado)}
                            </td>
                            <td>
                                <div className="actions">
                                    <button
                                        className="btn-action btn-edit"
                                        onClick={() => handleProductClick(producto)}
                                        title="Editar"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="btn-action btn-delete"
                                        onClick={() => console.log('Eliminar', producto.id)}
                                        title="Eliminar"
                                    >
                                        🗑️
                                    </button>
                                    <button
                                        className="btn-action btn-view"
                                        onClick={() => handleProductClick(producto)}
                                        title="Ver detalles"
                                    >
                                        👁️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;