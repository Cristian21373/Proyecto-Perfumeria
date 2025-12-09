import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { productoAPI } from '../../shared/services/productos';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import '../../admin/styles/Productos.css';

const Productos = () => {
    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    // Paginación
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const loadData = useCallback(async (page = 0, categoryId = null, search = '') => {
        setLoading(true);
        setError('');

        try {
            let params = {
                page,
                size: pageSize,
                sort: 'fechaCreacion,desc'
            };

            let data;

            if (search.trim()) {
                data = await productoAPI.searchProductos(search, params);
            } else if (categoryId) {
                data = await productoAPI.getProductosPorCategoria(categoryId, params);
            } else {
                data = await productoAPI.getProductos(params);
            }

            setProductos(data.content || []);
            setCurrentPage(data.number || 0);
            setTotalPages(data.totalPages || 0);
            setTotalElements(data.totalElements || 0);

            // Cargar categorías si no están cargadas
            if (categorias.length === 0) {
                const categoriasData = await productoAPI.getCategorias();
                setCategorias(categoriasData || []);
            }
        } catch (err) {
            setError(err.message || 'Error al cargar los productos');
            console.error('Error cargando productos:', err);
        } finally {
            setLoading(false);
        }
    }, [pageSize, categorias.length]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleSearch = (e) => {
        e?.preventDefault();
        loadData(0, selectedCategory, searchTerm);
    };

    const handleCategoryFilter = (categoryId) => {
        setSelectedCategory(categoryId);
        loadData(0, categoryId, searchTerm);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        loadData(page, selectedCategory, searchTerm);
    };

    const handleRefresh = () => {
        loadData(currentPage, selectedCategory, searchTerm);
    };

    const handleCreateProduct = () => {
        // Aquí podrías navegar a un formulario de creación
        alert('Funcionalidad de crear producto por implementar');
    };

    const handleEditProduct = (producto) => {
        // Aquí podrías navegar a un formulario de edición
        console.log('Editar producto:', producto);
        alert(`Editar producto: ${producto.nombre}`);
    };

    const handleDeleteProduct = async (producto) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto "${producto.nombre}"?`)) {
            try {
                // Aquí iría la llamada a la API para eliminar
                console.log('Eliminar producto:', producto.id);
                alert('Funcionalidad de eliminar por implementar');
                // Recargar datos después de eliminar
                handleRefresh();
            } catch (err) {
                setError('Error al eliminar el producto');
            }
        }
    };

    const handleViewDetails = (producto) => {
        // Aquí podrías navegar a la vista de detalle
        console.log('Ver detalles:', producto);
        navigate(`/admin/productos/${producto.id}`);
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('es-CO').format(num);
    };

    if (loading && productos.length === 0) {
        return (
            <div className="productos-loading">
                <div className="spinner"></div>
                <p>Cargando productos...</p>
            </div>
        );
    }

    return (
        <div className="productos-container">
            {/* Header */}
            <header className="productos-header">
                <div className="header-content">
                    <div className="header-left">
                        <h1>Gestión de Productos</h1>
                        <p>Administra tu catálogo de perfumes</p>
                    </div>
                    <div className="header-right">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="btn-back"
                        >
                            ← Volver al Dashboard
                        </button>
                    </div>
                </div>
            </header>

            <div className="productos-main">
                {/* Barra de herramientas */}
                <div className="productos-toolbar">
                    <div className="search-container">
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                placeholder="Buscar productos por nombre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-btn">
                                🔍 Buscar
                            </button>
                            {(searchTerm || selectedCategory) && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory(null);
                                        loadData();
                                    }}
                                    className="clear-btn"
                                >
                                    ✕ Limpiar filtros
                                </button>
                            )}
                        </form>
                    </div>

                    <div className="toolbar-actions">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="filter-toggle"
                        >
                            {showFilters ? '▲ Ocultar filtros' : '▼ Mostrar filtros'}
                        </button>
                        <button
                            onClick={handleCreateProduct}
                            className="btn-create"
                        >
                            ＋ Nuevo Producto
                        </button>
                    </div>
                </div>

                {/* Filtros */}
                {showFilters && (
                    <div className="filters-container">
                        <div className="filter-section">
                            <h3>Filtrar por categoría</h3>
                            <div className="category-filters">
                                <button
                                    onClick={() => handleCategoryFilter(null)}
                                    className={`category-filter ${selectedCategory === null ? 'active' : ''}`}
                                >
                                    Todas las categorías
                                </button>
                                {categorias.map((categoria) => (
                                    <button
                                        key={categoria.id}
                                        onClick={() => handleCategoryFilter(categoria.id)}
                                        className={`category-filter ${selectedCategory === categoria.id ? 'active' : ''}`}
                                    >
                                        {categoria.nombre}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Resultados y estadísticas */}
                <div className="results-info">
                    <p className="results-count">
                        Mostrando {formatNumber(productos.length)} de {formatNumber(totalElements)} productos
                        {selectedCategory && ` en categoría seleccionada`}
                        {searchTerm && ` para "${searchTerm}"`}
                    </p>
                    {error && (
                        <div className="error-alert">
                            <span className="error-icon">⚠️</span>
                            <span>{error}</span>
                            <button onClick={() => setError('')} className="error-close">✕</button>
                        </div>
                    )}
                </div>

                {/* Listado de productos */}
                {productos.length > 0 ? (
                    <>
                        <div className="productos-grid">
                            {productos.map((producto) => (
                                <ProductCard
                                    key={producto.id}
                                    producto={producto}
                                    onEdit={handleEditProduct}
                                    onDelete={handleDeleteProduct}
                                    onView={handleViewDetails}
                                />
                            ))}
                        </div>

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                loading={loading}
                            />
                        )}
                    </>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📦</div>
                        <h3>No se encontraron productos</h3>
                        <p>
                            {searchTerm
                                ? `No hay resultados para "${searchTerm}"`
                                : selectedCategory
                                    ? 'No hay productos en esta categoría'
                                    : 'No hay productos registrados'}
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory(null);
                                loadData();
                            }}
                            className="btn-reset"
                        >
                            Mostrar todos los productos
                        </button>
                    </div>
                )}

                {/* Acciones rápidas */}
                <div className="quick-actions">
                    <button onClick={handleRefresh} className="btn-refresh">
                        🔄 Actualizar lista
                    </button>
                    <button onClick={handleCreateProduct} className="btn-create-large">
                        ＋ Agregar nuevo producto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Productos;