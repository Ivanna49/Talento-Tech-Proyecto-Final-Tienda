import { useEffect, useState } from 'react';
import './App.css';
import Home from './layouts/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductosContainer from './components/ProductosContainer';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import FormularioEdicion from './components/FormularioEdicion';
import FormularioProducto from './components/FormularioProducto';
import Login from './components/Login';
import NavBoot from './components/NavBoot';
import CarritoBoostrap from './components/CarritoBoostrap';
import Footer from './components/Footer';

import { AuthProvider } from './contexts/AuthContext';
import { ProductosProvider } from './contexts/ProductosContext';

function App() {
  return (
    <Router>
   
      <AuthProvider>
        <ProductosProvider>
          <div className="d-flex flex-column min-vh-100">
            <NavBoot />

            
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/productos" element={<ProductosContainer />} />
                <Route path="/carrito" element={<CarritoBoostrap/>} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/productos/:id" element={<ProductoDetalle />} />
                <Route path="/admin/editarProducto/:id" element={<FormularioEdicion />} />
                <Route path="/admin/agregarProductos" element={<FormularioProducto />} />
              </Routes>
            </main>

            <Footer className="mt-auto" />
          </div>
        </ProductosProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;