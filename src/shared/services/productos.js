import { apiClient } from './apiClient';

export const productoAPI = {
    getProductos: async (params = {}) => {
        try {
            const response = await apiClient.get('/productos', { params });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching productos:', error);
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Error al cargar productos');
        }
    },

    getCategorias: async () => {
        try {
            const response = await apiClient.get('/categorias');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching categorias:', error);
            throw new Error('Error al cargar categorías');
        }
    },

    getProductoById: async (id) => {
        try {
            const response = await apiClient.get(`/productos/${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching producto:', error);
            throw new Error('Error al cargar producto');
        }
    },

    searchProductos: async (nombre, params = {}) => {
        try {
            const response = await apiClient.get('/productos/buscar', {
                params: { nombre, ...params }
            });
            return response.data.data;
        } catch (error) {
            console.error('Error searching productos:', error);
            throw new Error('Error al buscar productos');
        }
    },

    getProductosPorCategoria: async (categoriaId, params = {}) => {
        try {
            const response = await apiClient.get(`/productos/categoria/${categoriaId}`, {
                params
            });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching productos por categoría:', error);
            throw new Error('Error al cargar productos por categoría');
        }
    },
};