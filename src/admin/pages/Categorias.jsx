import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriaAPI } from '../../shared/services/categoria';
import {
    FiEdit,
    FiTrash2,
    FiPlus,
    FiArrowLeft,
    FiSearch,
    FiFilter,
    FiGrid,
    FiInfo,
    FiPackage,
    FiRefreshCw,
    FiX
} from 'react-icons/fi';
import { MdCategory, MdOutlineCategory } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import Pagination from '../components/Pagination';
import '../../admin/styles/Categorias.css';

const Categorias = () => {
    const navigate = useNavigate();

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Paginación
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize] = useState(10);

    const loadCategorias = useCallback(async (page = 0, search = '') => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const params = {
                page,
                size: pageSize,
                sort: 'fechaCreacion,desc'
            };

            const data = await categoriaAPI.getCategorias({ ...params, search });

            setCategorias(data.content || []);
            setCurrentPage(data.number || 0);
            setTotalPages(data.totalPages || 0);
            setTotalElements(data.totalElements || 0);
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al cargar las categorías';
            setError(errorMsg);
            console.error('Error cargando categorías:', err);
        } finally {
            setLoading(false);
        }
    }, [pageSize]);

    useEffect(() => {
        loadCategorias();
    }, [loadCategorias]);

    const handleSearch = (e) => {
        e?.preventDefault();
        loadCategorias(0, searchTerm);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        loadCategorias(page, searchTerm);
    };

    const handleDelete = async (categoria) => {
        if (window.confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?\n\nEsta acción no se puede deshacer.`)) {
            try {
                await categoriaAPI.eliminarCategoria(categoria.id);
                setSuccessMessage(`Categoría "${categoria.nombre}" eliminada correctamente`);
                loadCategorias(currentPage, searchTerm);

                // Auto-ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    setSuccessMessage('');
                }, 5000);
            } catch (err) {
                const errorMsg = err.response?.data?.message || 'Error al eliminar la categoría';
                setError(errorMsg);

                // Auto-ocultar error después de 5 segundos
                setTimeout(() => {
                    setError('');
                }, 5000);
            }
        }
    };

    const handleEdit = (categoria) => {
        navigate(`/admin/categorias/editar/${categoria.id}`);
    };

    const handleCreate = () => {
        navigate('/admin/categorias/nueva');
    };

    const handleViewDetails = (categoria) => {
        navigate(`/admin/categorias/${categoria.id}`);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        loadCategorias();
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('es-CO').format(num);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (loading && categorias.length === 0) {
        return (
            <div className="categorias-loading">
                <div className="spinner"></div>
                <p>Cargando categorías...</p>
            </div>
        );
    }

    return (
        <div className="categorias-container">
            {/* Header */}
            <header className="categorias-header">
                <div className="header-content">
                    <div className="header-left">
                        <h1>
                            <MdCategory className="header-icon" />
                            Gestión de Categorías
                        </h1>
                        <p>Administra las categorías de productos</p>
                    </div>
                    <div className="header-right">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="btn-back"
                        >
                            <FiArrowLeft /> Volver al Dashboard
                        </button>
                    </div>
                </div>
            </header>

            <div className="categorias-main">
                {/* Barra de herramientas */}
                <div className="categorias-toolbar">
                    <div className="search-container">
                        <form onSubmit={handleSearch} className="search-form">
                            <div className="search-input-wrapper">
                                <FiSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Buscar categorías por nombre..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="clear-input-btn"
                                    >
                                        <FiX />
                                    </button>
                                )}
                            </div>
                            <button type="submit" className="search-btn">
                                <FiSearch /> Buscar
                            </button>
                        </form>
                    </div>

                    <div className="toolbar-actions">
                        <button
                            onClick={handleCreate}
                            className="btn-create"
                        >
                            <FiPlus /> Nueva Categoría
                        </button>
                    </div>
                </div>

                {/* Mensajes */}
                {successMessage && (
                    <div className="success-alert">
                        <span className="success-icon">✅</span>
                        <span>{successMessage}</span>
                        <button onClick={() => setSuccessMessage('')} className="success-close">
                            <FiX />
                        </button>
                    </div>
                )}

                {error && (
                    <div className="error-alert">
                        <span className="error-icon">⚠️</span>
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="error-close">
                            <FiX />
                        </button>
                    </div>
                )}

                {/* Resultados y estadísticas */}
                <div className="results-info">
                    <p className="results-count">
                        Mostrando {formatNumber(categorias.length)} de {formatNumber(totalElements)} categorías
                        {searchTerm && ` para "${searchTerm}"`}
                    </p>
                    <div className="stats-summary">
                        <span className="stat-item">
                            <BiCategory /> Total: {formatNumber(totalElements)}
                        </span>
                    </div>
                </div>

                {/* Listado de categorías */}
                {categorias.length > 0 ? (
                    <>
                        <div className="categorias-grid">
                            {categorias.map((categoria) => (
                                <div key={categoria.id} className="categoria-card">
                                    <div className="categoria-header">
                                        <div className="categoria-icon">
                                            <MdOutlineCategory />
                                        </div>
                                        <div className="categoria-title">
                                            <h3>{categoria.nombre}</h3>
                                            <p className="categoria-desc">
                                                {categoria.descripcion || 'Sin descripción'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="categoria-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">ID:</span>
                                            <span className="meta-value">#{categoria.id}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Creada:</span>
                                            <span className="meta-value">
                                                {formatDate(categoria.fechaCreacion)}
                                            </span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Subcategorías:</span>
                                            <span className="meta-value">
                                                {categoria.subcategorias?.length || 0}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="categoria-actions">
                                        <button
                                            className="btn-action btn-view"
                                            onClick={() => handleViewDetails(categoria)}
                                            title="Ver detalles"
                                        >
                                            <FiInfo /> Detalles
                                        </button>
                                        <button
                                            className="btn-action btn-edit"
                                            onClick={() => handleEdit(categoria)}
                                            title="Editar"
                                        >
                                            <FiEdit /> Editar
                                        </button>
                                        <button
                                            className="btn-action btn-delete"
                                            onClick={() => handleDelete(categoria)}
                                            title="Eliminar"
                                        >
                                            <FiTrash2 /> Eliminar
                                        </button>
                                    </div>
                                </div>
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
                        <div className="empty-icon">
                            <MdCategory size={60} />
                        </div>
                        <h3>No se encontraron categorías</h3>
                        <p>
                            {searchTerm
                                ? `No hay resultados para "${searchTerm}"`
                                : 'No hay categorías registradas'}
                        </p>
                        {searchTerm ? (
                            <button
                                onClick={handleClearSearch}
                                className="btn-reset"
                            >
                                Mostrar todas las categorías
                            </button>
                        ) : (
                            <button
                                onClick={handleCreate}
                                className="btn-reset"
                            >
                                <FiPlus /> Crear primera categoría
                            </button>
                        )}
                    </div>
                )}

                {/* Acciones rápidas */}
                <div className="quick-actions">
                    <button
                        onClick={() => loadCategorias(currentPage, searchTerm)}
                        className="btn-refresh"
                        disabled={loading}
                    >
                        <FiRefreshCw /> {loading ? 'Actualizando...' : 'Actualizar lista'}
                    </button>
                    <button onClick={handleCreate} className="btn-create-large">
                        <FiPlus /> Agregar nueva categoría
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Categorias;