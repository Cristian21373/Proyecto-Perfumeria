import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoriaAPI } from '../../shared/services/categoria';
import {
    FiArrowLeft,
    FiSave,
    FiX,
    FiFolder,
    FiCheck,
    FiAlertCircle,
    FiRefreshCw
} from 'react-icons/fi';
import { MdCategory, MdOutlineEdit } from 'react-icons/md';

const EditarCategoria = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Estados del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });

    // Estados de la UI
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [originalData, setOriginalData] = useState(null);

    // Cargar datos de la categoría
    const loadCategoria = useCallback(async () => {
        setLoading(true);
        setSubmitError('');

        try {
            const categoria = await categoriaAPI.getCategoriaById(id);
            setFormData({
                nombre: categoria.nombre || '',
                descripcion: categoria.descripcion || ''
            });
            setOriginalData(categoria);
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al cargar la categoría';
            setSubmitError(errorMsg);

            // Redirigir si no se encuentra la categoría
            if (err.response?.status === 404) {
                setTimeout(() => navigate('/admin/categorias'), 3000);
            }
        } finally {
            setLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        loadCategoria();
    }, [loadCategoria]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error específico cuando el usuario escribe
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validar formulario
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

    // Verificar si hay cambios
    const hasChanges = () => {
        if (!originalData) return false;

        return (
            formData.nombre !== originalData.nombre ||
            formData.descripcion !== (originalData.descripcion || '')
        );
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!hasChanges()) {
            setSubmitError('No hay cambios para guardar');
            return;
        }

        setUpdating(true);
        setSubmitError('');
        setSuccessMessage('');

        try {
            await categoriaAPI.actualizarCategoria(id, formData);

            setSuccessMessage('¡Categoría actualizada exitosamente!');
            setOriginalData(formData);

            // Redirigir después de 1.5 segundos
            setTimeout(() => {
                navigate('/admin/categorias');
            }, 1500);

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al actualizar la categoría';
            setSubmitError(errorMsg);

            // Si es error de duplicado, marcar el campo nombre
            if (errorMsg.includes('ya existe')) {
                setErrors(prev => ({
                    ...prev,
                    nombre: 'Esta categoría ya existe'
                }));
            }
        } finally {
            setUpdating(false);
        }
    };

    // Manejar cancelación
    const handleCancel = () => {
        if (hasChanges()) {
            if (window.confirm('¿Seguro que quieres cancelar? Se perderán los cambios no guardados.')) {
                navigate('/admin/categorias');
            }
        } else {
            navigate('/admin/categorias');
        }
    };

    // Manejar recarga
    const handleReload = () => {
        if (hasChanges() && !window.confirm('¿Recargar datos? Se perderán los cambios no guardados.')) {
            return;
        }
        loadCategoria();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando categoría...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleCancel}
                                disabled={updating}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <MdCategory className="text-indigo-600" />
                                    Editar Categoría
                                </h1>
                                <p className="text-gray-600 text-sm mt-1">
                                    Modifica la información de la categoría
                                    {originalData && (
                                        <span className="ml-2 text-gray-500">ID: #{originalData.id}</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-0 flex items-center gap-3">
                            <button
                                onClick={handleReload}
                                disabled={updating}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                <FiRefreshCw size={16} />
                                Recargar
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulario - 2/3 en desktop */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Tarjeta del formulario */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="p-3 bg-indigo-50 rounded-lg">
                                        <MdOutlineEdit className="text-indigo-600" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Información de la Categoría
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            Actualiza los datos de la categoría
                                        </p>
                                    </div>
                                </div>

                                {/* Mensajes de estado */}
                                {submitError && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <FiAlertCircle className="text-red-500 flex-shrink-0" />
                                            <span className="text-red-700 text-sm">{submitError}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSubmitError('')}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiX size={18} />
                                        </button>
                                    </div>
                                )}

                                {successMessage && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FiCheck className="text-green-500 flex-shrink-0" />
                                            <span className="text-green-700 font-medium">{successMessage}</span>
                                        </div>
                                        <p className="text-green-600 text-sm">Redirigiendo a la lista de categorías...</p>
                                    </div>
                                )}

                                {/* Campos del formulario */}
                                <div className="space-y-6">
                                    {/* Campo Nombre */}
                                    <div>
                                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                            <div className="flex justify-between items-center">
                                                <span>Nombre de la Categoría *</span>
                                                <span className={`text-xs ${formData.nombre.length > 45 ? 'text-red-500' : 'text-gray-500'}`}>
                                                    {formData.nombre.length}/50
                                                </span>
                                            </div>
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            disabled={updating}
                                            maxLength={50}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.nombre ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'} focus:ring-2 focus:ring-opacity-20 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed`}
                                            placeholder="Ej: Perfumes de Hombre"
                                        />
                                        {errors.nombre && (
                                            <p className="mt-2 text-sm text-red-600">{errors.nombre}</p>
                                        )}
                                        <p className="mt-2 text-xs text-gray-500">
                                            Nombre único para identificar la categoría
                                        </p>
                                    </div>

                                    {/* Campo Descripción */}
                                    <div>
                                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                                            <div className="flex justify-between items-center">
                                                <span>Descripción</span>
                                                <span className={`text-xs ${formData.descripcion.length > 140 ? 'text-red-500' : 'text-gray-500'}`}>
                                                    {formData.descripcion.length}/150
                                                </span>
                                            </div>
                                        </label>
                                        <textarea
                                            id="descripcion"
                                            name="descripcion"
                                            value={formData.descripcion}
                                            onChange={handleChange}
                                            disabled={updating}
                                            maxLength={150}
                                            rows={4}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.descripcion ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'} focus:ring-2 focus:ring-opacity-20 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed resize-none`}
                                            placeholder="Describe brevemente esta categoría..."
                                        />
                                        {errors.descripcion && (
                                            <p className="mt-2 text-sm text-red-600">{errors.descripcion}</p>
                                        )}
                                        <p className="mt-2 text-xs text-gray-500">
                                            Opcional - Máximo 150 caracteres
                                        </p>
                                    </div>

                                    {/* Información adicional */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-xs text-gray-600">
                                                    Los campos marcados con * son obligatorios
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-xs text-gray-600">
                                                    La categoría mantendrá su fecha de creación original
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Acciones del formulario */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                                    <div className="text-sm text-gray-600">
                                        {hasChanges() ? (
                                            <span className="text-amber-600 font-medium">
                                                Tienes cambios sin guardar
                                            </span>
                                        ) : (
                                            <span>No hay cambios pendientes</span>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            disabled={updating}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            <FiX size={18} />
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updating || !hasChanges()}
                                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 flex items-center justify-center gap-2"
                                        >
                                            {updating ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Guardando...
                                                </>
                                            ) : (
                                                <>
                                                    <FiSave size={18} />
                                                    Guardar Cambios
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Panel lateral - 1/3 en desktop */}
                    <div className="space-y-6">
                        {/* Vista previa */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FiFolder className="text-gray-400" />
                                Vista Previa
                            </h3>

                            {formData.nombre ? (
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Nombre</h4>
                                        <p className="text-gray-900 font-medium">{formData.nombre}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Descripción</h4>
                                        <p className="text-gray-700">
                                            {formData.descripcion || (
                                                <span className="text-gray-400 italic">Sin descripción</span>
                                            )}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Estado</span>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                Activa
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MdCategory className="text-gray-400" size={24} />
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        Completa el formulario para ver la vista previa
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Información original */}
                        {originalData && (
                            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Información Original
                                </h3>

                                <div className="space-y-3">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Nombre Original</h4>
                                        <p className="text-gray-900 font-medium">{originalData.nombre}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Descripción Original</h4>
                                        <p className="text-gray-700">
                                            {originalData.descripcion || (
                                                <span className="text-gray-400 italic">Sin descripción</span>
                                            )}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Fecha Creación</span>
                                            <span className="text-sm text-gray-700">
                                                {new Date(originalData.fechaCreacion).toLocaleDateString('es-CO')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Consejos */}
                        <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6">
                            <h4 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                                <FiCheck className="text-indigo-600" />
                                Buenas Prácticas
                            </h4>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm text-indigo-800">
                                        Mantén los nombres claros y descriptivos
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm text-indigo-800">
                                        Usa descripciones breves para mejor organización
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm text-indigo-800">
                                        Verifica que el nuevo nombre no exista ya
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm text-indigo-800">
                                        Los cambios afectarán a todos los productos de esta categoría
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditarCategoria;