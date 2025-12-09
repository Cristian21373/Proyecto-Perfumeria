import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../shared/services/auth';
import '../../admin/styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        console.log("LOGIN → Enviando credenciales:", username, password);

        try {
            const response = await authAPI.login({ username, password });

            console.log("LOGIN → Respuesta del backend:", response);
            console.log("LOGIN → response.success:", response.success);
            console.log("LOGIN → response.data:", response.data);

            if (response.status === "success" && response.data?.token) {
                console.log("LOGIN → Token recibido:", response.data.token);

                localStorage.setItem('adminToken', response.data.token);
                localStorage.setItem('adminUser', JSON.stringify({
                    username: response.data.username,
                    email: response.data.email,
                    rol: response.data.rol
                }));

                console.log("LOGIN → Datos guardados en localStorage");
                console.log("LOGIN → Navegando a /admin/dashboard...");

                navigate('/admin/dashboard');

            } else {
                console.log("LOGIN → Backend NO devolvió success");
                setError(response.message || 'Credenciales incorrectas');
            }
        } catch (err) {
            console.log("LOGIN → CATCH ERROR:", err);
            setError(err.message || 'Error de autenticación');
        } finally {
            console.log("LOGIN → FINALIZADO handleSubmit");
            setLoading(false);
        }
    };


    return (
        <div className="login-admin-container">
            <div className="login-admin-card">
                <div className="login-admin-header">
                    <h2>Panel de Administración</h2>
                    <p>Pétalos Parfum</p>
                </div>

                <form onSubmit={handleSubmit} className="login-admin-form">
                    {error && <div className="login-error">{error}</div>}

                    <div className="login-input-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="login-input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="login-submit-btn" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="login-admin-footer">
                    <p className="login-credentials">
                        <strong>Credenciales de prueba:</strong><br />
                        Usuario: <code>admin</code><br />
                        Contraseña: <code>admin123</code>
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="login-back-btn"
                    >
                        ← Volver al sitio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;