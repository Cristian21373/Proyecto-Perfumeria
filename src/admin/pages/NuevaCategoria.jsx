import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriaAPI } from '../../shared/services/categoria';
import { 
    FiArrowLeft, 
    FiSave, 
    FiX, 
    FiFolderPlus,
    FiCheck,
    FiAlertCircle
} from 'react-icons/fi';
import { MdCategory } from 'react-icons/md';
import '../../admin/styles/NuevaCategoria.css';

const NuevaCategoria = () => {
    const navigate = useNavigate();
    
    
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });
    
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio';
        } else if (formData.nombre.length > 50) {
            newErrors.nombre = 'El nombre no puede exceder 50 caracteres';
        }
        
        if (formData.descripcion && formData.descripcion.length > 150) {
            newErrors.descripcion = 'La descripción no puede exceder 150 caracteres';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        setSubmitError('');
        setSuccessMessage('');
        
        try {
            await categoriaAPI.crearCategoria(formData);
            
            setSuccessMessage('¡Categoría creada exitosamente!');
            setFormData({
                nombre: '',
                descripcion: ''
            });
            
            
            setTimeout(() => {
                navigate('/admin/categorias');
            }, 2000);
            
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al crear la categoría';
            setSubmitError(errorMsg);
            
            
            if (errorMsg.includes('ya existe')) {
                setErrors(prev => ({
                    ...prev,
                    nombre: 'Esta categoría ya existe'
                }));
            }
        } finally {
            setLoading(false);
        }
    };
    
    
    const handleCancel = () => {
        if (formData.nombre.trim() || formData.descripcion.trim()) {
            if (window.confirm('¿Seguro que quieres cancelar? Se perderán los datos no guardados.')) {
                navigate('/admin/categorias');
            }
        } else {
            navigate('/admin/categorias');
        }
    };
    
    return (
        <div className="nueva-categoria-container">
            {/* Header */}
            <header className="nueva-categoria-header">
                <div className="header-content">
                    <div className="header-left">
                        <button
                            onClick={handleCancel}
                            className="btn-back"
                            disabled={loading}
                        >
                            <FiArrowLeft />
                        </button>
                        <div className="header-title">
                            <h1>
                                <MdCategory className="header-icon" />
                                Nueva Categoría
                            </h1>
                            <p>Crea una nueva categoría para organizar tus productos</p>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="nueva-categoria-main">
                {/* Formulario */}
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="categoria-form">
                        {/* Tarjeta del formulario */}
                        <div className="form-card">
                            <div className="form-header">
                                <FiFolderPlus className="form-icon" />
                                <h2>Información de la Categoría</h2>
                            </div>
                            
                            {/* Mensajes */}
                            {submitError && (
                                <div className="error-message">
                                    <FiAlertCircle />
                                    <span>{submitError}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => setSubmitError('')}
                                        className="close-error"
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            )}
                            
                            {successMessage && (
                                <div className="success-message">
                                    <FiCheck />
                                    <span>{successMessage}</span>
                                    <span className="redirect-text">Redirigiendo...</span>
                                </div>
                            )}
                            
                            {/* Campos del formulario */}
                            <div className="form-fields">
                                {/* Campo Nombre */}
                                <div className={`form-group ${errors.nombre ? 'error' : ''}`}>
                                    <label htmlFor="nombre">
                                        Nombre de la Categoría *
                                        <span className="char-count">
                                            {formData.nombre.length}/50
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Ej: Perfumes de Hombre"
                                        disabled={loading}
                                        maxLength={50}
                                        className="form-input"
                                    />
                                    {errors.nombre && (
                                        <span className="error-text">{errors.nombre}</span>
                                    )}
                                    <div className="field-hint">
                                        Nombre único para identificar la categoría
                                    </div>
                                </div>
                                
                                {/* Campo Descripción */}
                                <div className={`form-group ${errors.descripcion ? 'error' : ''}`}>
                                    <label htmlFor="descripcion">
                                        Descripción
                                        <span className="char-count">
                                            {formData.descripcion.length}/150
                                        </span>
                                    </label>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        placeholder="Describe brevemente esta categoría..."
                                        disabled={loading}
                                        maxLength={150}
                                        rows={4}
                                        className="form-textarea"
                                    />
                                    {errors.descripcion && (
                                        <span className="error-text">{errors.descripcion}</span>
                                    )}
                                    <div className="field-hint">
                                        Opcional - Máximo 150 caracteres
                                    </div>
                                </div>
                                
                                {/* Información adicional */}
                                <div className="form-info">
                                    <div className="info-item">
                                        <span className="info-label">Los campos marcados con * son obligatorios</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">La categoría se ordenará automáticamente por fecha de creación</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Acciones del formulario */}
                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="btn-cancel"
                                disabled={loading}
                            >
                                <FiX /> Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={loading || !formData.nombre.trim()}
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner-small"></div>
                                        Creando...
                                    </>
                                ) : (
                                    <>
                                        <FiSave /> Crear Categoría
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    
                    {/* Vista previa */}
                    <div className="preview-container">
                        <div className="preview-card">
                            <div className="preview-header">
                                <h3>Vista Previa</h3>
                            </div>
                            <div className="preview-content">
                                {formData.nombre ? (
                                    <>
                                        <div className="preview-item">
                                            <span className="preview-label">Nombre:</span>
                                            <span className="preview-value">{formData.nombre}</span>
                                        </div>
                                        <div className="preview-item">
                                            <span className="preview-label">Descripción:</span>
                                            <span className="preview-value">
                                                {formData.descripcion || 'Sin descripción'}
                                            </span>
                                        </div>
                                        <div className="preview-item">
                                            <span className="preview-label">Estado:</span>
                                            <span className="preview-status active">Activa</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="empty-preview">
                                        <MdCategory className="empty-icon" />
                                        <p>Completa el formulario para ver la vista previa</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Consejos */}
                        <div className="tips-card">
                            <h4>💡 Consejos</h4>
                            <ul className="tips-list">
                                <li>Usa nombres descriptivos y únicos</li>
                                <li>Mantén las descripciones breves y claras</li>
                                <li>Organiza las categorías por tipo de producto</li>
                                <li>Evita categorías duplicadas</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevaCategoria;