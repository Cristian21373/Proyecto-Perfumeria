import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductCard.css';

const ProductCard = ({ producto, onEdit, onDelete, onView }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const getStatusColor = (eliminado) => {
        return eliminado ? 'status-deleted' : 'status-active';
    };

    const getStatusText = (eliminado) => {
        return eliminado ? 'Eliminado' : 'Activo';
    };

    return (
        <div className={`product-card ${producto.eliminado ? 'deleted' : ''}`}>
            {/* Imagen del producto */}
            <div className="product-image">
                {producto.imagenUrl ? (
                    <img
                        src={producto.imagenUrl}
                        alt={producto.nombre}
                        className="product-img"
                        onClick={() => onView(producto)}
                    />
                ) : (
                    <div
                        className="product-img-placeholder"
                        onClick={() => onView(producto)}
                    >
                        <span className="placeholder-icon">🛍️</span>
                        <span className="placeholder-text">Sin imagen</span>
                    </div>
                )}
            </div>

            {/* Información del producto */}
            <div className="product-info">
                <div className="product-header">
                    <h3 className="product-name">{producto.nombre}</h3>
                    <span className="product-price">{formatPrice(producto.precio)}</span>
                </div>

                <p className="product-description">
                    {producto.descripcion?.substring(0, 80)}
                    {producto.descripcion?.length > 80 ? '...' : ''}
                </p>

                <div className="product-meta">
                    <div className="product-category">
                        <span className="category-label">Categoría:</span>
                        <span className="category-value">
                            {producto.categoria?.nombre || 'Sin categoría'}
                        </span>
                    </div>

                    {producto.subcategoria && (
                        <div className="product-subcategory">
                            <span className="subcategory-label">Subcategoría:</span>
                            <span className="subcategory-value">
                                {producto.subcategoria.nombre}
                            </span>
                        </div>
                    )}
                </div>

                <div className="product-footer">
                    <div className="product-status">
                        <span className={`status-badge ${getStatusColor(producto.eliminado)}`}>
                            {getStatusText(producto.eliminado)}
                        </span>
                        <span className="product-date">
                            Creado: {new Date(producto.fechaCreacion).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="product-actions">
                        <button
                            className="btn-action btn-view"
                            onClick={() => onView(producto)}
                            title="Ver detalles"
                        >
                            👁️ Ver
                        </button>
                        <button
                            className="btn-action btn-edit"
                            onClick={() => onEdit(producto)}
                            title="Editar"
                            disabled={producto.eliminado}
                        >
                            ✏️ Editar
                        </button>
                        <button
                            className="btn-action btn-delete"
                            onClick={() => onDelete(producto)}
                            title="Eliminar"
                        >
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string,
        precio: PropTypes.number.isRequired,
        imagenUrl: PropTypes.string,
        categoria: PropTypes.shape({
            nombre: PropTypes.string
        }),
        subcategoria: PropTypes.shape({
            nombre: PropTypes.string
        }),
        eliminado: PropTypes.bool.isRequired,
        fechaCreacion: PropTypes.string.isRequired
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired
};

export default ProductCard;