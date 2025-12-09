import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productoAPI } from '../../shared/services/productos';
import { useAuth } from '../../shared/context/AuthContext';



const Dashboard = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        loadProductos();
    }, []);

    const loadProductos = async () => {
        setLoading(true);
        try {
            const data = await productoAPI.getProductos({ page: 0, size: 5 });
            setProductos(data.content || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    if (loading) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                Cargando dashboard...
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <h1>Dashboard de Administración</h1>
                    <button onClick={handleLogout} style={styles.logoutButton}>
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <main style={styles.main}>
                <div style={styles.sidebar}>
                    <nav style={styles.nav}>
                        <button
                            style={styles.navButton}
                            onClick={() => navigate('/admin/dashboard')}
                        >
                            📊 Dashboard
                        </button>
                        <button
                            style={styles.navButton}
                            onClick={() => navigate('/admin/productos')}
                        >
                            🛍️ Productos
                        </button>
                        <button
                            style={styles.navButton}
                            onClick={() => navigate('/admin/categorias')}
                        >
                            📁 Categorías
                        </button>
                        <button style={styles.navButton}>
                            👥 Usuarios
                        </button>
                        <button style={styles.navButton}>
                            📊 Reportes
                        </button>
                    </nav>
                </div>

                <div style={styles.content}>
                    {error && (
                        <div style={styles.error}>
                            {error}
                        </div>
                    )}

                    <div style={styles.stats}>
                        <div style={styles.statCard}>
                            <h3>Productos</h3>
                            <p style={styles.statNumber}>{productos.length}</p>
                        </div>
                        <div style={styles.statCard}>
                            <h3>Activos</h3>
                            <p style={styles.statNumber}>
                                {productos.filter(p => !p.eliminado).length}
                            </p>
                        </div>
                        <div style={styles.statCard}>
                            <h3>Total Valor</h3>
                            <p style={styles.statNumber}>
                                {formatPrice(productos.reduce((sum, p) => sum + p.precio, 0))}
                            </p>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <h2>Productos Recientes</h2>
                            <button
                                onClick={() => navigate('/admin/productos')}
                                style={styles.viewAllButton}
                            >
                                Ver todos →
                            </button>
                        </div>

                        {productos.length > 0 ? (
                            <div style={styles.productGrid}>
                                {productos.map((producto) => (
                                    <div key={producto.id} style={styles.productCard}>
                                        <div style={styles.productImage}>
                                            {producto.imagenUrl ? (
                                                <img
                                                    src={producto.imagenUrl}
                                                    alt={producto.nombre}
                                                    style={styles.image}
                                                />
                                            ) : (
                                                <div style={styles.imagePlaceholder}>🛍️</div>
                                            )}
                                        </div>
                                        <div style={styles.productInfo}>
                                            <h4 style={styles.productName}>{producto.nombre}</h4>
                                            <p style={styles.productPrice}>
                                                {formatPrice(producto.precio)}
                                            </p>
                                            <span style={producto.eliminado ? styles.statusDeleted : styles.statusActive}>
                                                {producto.eliminado ? 'Eliminado' : 'Activo'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={styles.emptyState}>
                                <p>No hay productos registrados</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '20px 0',
    },
    headerContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    main: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        display: 'flex',
        gap: '30px',
    },
    sidebar: {
        width: '250px',
        flexShrink: 0,
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    navButton: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        padding: '12px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    content: {
        flex: 1,
    },
    error: {
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    stats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
    },
    statCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    statNumber: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#1976d2',
        margin: '10px 0 0 0',
    },
    section: {
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    viewAllButton: {
        backgroundColor: 'transparent',
        color: '#1976d2',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    productCard: {
        border: '1px solid #eee',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    productImage: {
        height: '150px',
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        color: '#999',
    },
    productInfo: {
        padding: '15px',
    },
    productName: {
        margin: '0 0 10px 0',
        fontSize: '16px',
    },
    productPrice: {
        color: '#1976d2',
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '0 0 10px 0',
    },
    statusActive: {
        backgroundColor: '#e8f5e8',
        color: '#388e3c',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
    },
    statusDeleted: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
    },
    emptyState: {
        textAlign: 'center',
        padding: '40px',
        color: '#999',
    },
};

export default Dashboard;