import { apiClient } from './apiClient';

const categoriaAPI = {
    getCategorias: async (params = {}) => {
        const response = await apiClient.get('/api/categorias', { params });
        return response.data.data;
    },

    getCategoriasTodas: async () => {
        const response = await apiClient.get('/api/categorias/todas');
        return response.data.data;
    },

    getCategoriaById: async (id) => {
        const response = await apiClient.get(`/api/categorias/${id}`);
        return response.data.data;
    },

    getEstadisticas: async (id) => {
        const response = await apiClient.get(`/api/categorias/${id}/estadisticas`);
        return response.data.data;
    },

    crearCategoria: async (categoriaData) => {
        const response = await apiClient.post('/api/categorias', categoriaData);
        return response.data.data;
    },

    actualizarCategoria: async (id, categoriaData) => {
        const response = await apiClient.put(`/api/categorias/${id}`, categoriaData);
        return response.data.data;
    },

    eliminarCategoria: async (id) => {
        const response = await apiClient.delete(`/api/categorias/${id}`);
        return response.data;
    },

    buscarCategorias: async (search, params = {}) => {
        const response = await apiClient.get('/api/categorias', {
            params: { ...params, search }
        });
        return response.data.data;
    }
};

export { categoriaAPI };