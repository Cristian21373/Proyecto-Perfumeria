import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./shared/context/AuthContext";  
import PrivateRoute from "./admin/components/PrivateRoute"; 
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Productos from "./admin/pages/Productos";
import Categorias from "./admin/pages/Categorias";
import NuevaCategoria from "./admin/pages/NuevaCategoria";
import EditarCategoria from "./admin/pages/EditarCategoria";
import InicioSesion from "./pages/InicioSesion";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas del cliente (públicas) */}
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Rutas del administrador */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route path="/admin/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/productos" element={
            <PrivateRoute>
              <Productos />
            </PrivateRoute>
          } />
          <Route path="/admin/categorias" element={
            <PrivateRoute>
              <Categorias />
            </PrivateRoute>
          } />
          <Route path="/admin/categorias/nueva" element={
            <PrivateRoute>
              <NuevaCategoria />
            </PrivateRoute>
          } />
          <Route path="/admin/categorias/editar/:id" element={
            <PrivateRoute>
              <EditarCategoria />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;