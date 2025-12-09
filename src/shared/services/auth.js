import { apiClient } from './apiClient';

export const authAPI = {
    login: async (credentials) => {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw {
                message: 'Error de conexión',
                errors: ['No se pudo conectar con el servidor']
            };
        }
    },
};