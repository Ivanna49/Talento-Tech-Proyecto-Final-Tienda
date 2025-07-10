import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useAuthContext } from '../contexts/AuthContext';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { Button, Alert } from 'react-bootstrap'; 

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState(''); 
  const { login, user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation(); 


  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
    setMessage(''); 
  };

  const iniciarSesion = (e) => {
    e.preventDefault();
    
    if (usuario === 'admin@gmail.com' && password === 'test12') {
      login(usuario);
      dispararSweetBasico("Admin logueado", "", "success", "Confirmar");
 
      navigate(location.state?.from || '/');
    } else if (usuario && password.length >= 4) {
      login(usuario);
      dispararSweetBasico("Usuario logueado", "", "success", "Confirmar");
      navigate(location.state?.from || '/');
    } else {
      dispararSweetBasico("Credenciales inválidas", "", "error", "Cerrar");
    }
  };

  const registrarUsuario = (e) => {
    e.preventDefault();
    if (usuario && password.length >= 6) {
      login(usuario);
      dispararSweetBasico("Registro exitoso", "", "success", "Confirmar");
      navigate(location.state?.from || '/');
    } else {
      dispararSweetBasico("Contraseña débil", "Debe tener al menos 6 caracteres", "error", "Cerrar");
    }
  };

  const renderAuthForm = () => (
    <div style={{
      minHeight: 'calc(100vh - 150px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      {message && (
        <Alert variant="warning" className="mb-4" style={{ width: '100%', maxWidth: '500px' }}>
          {message}
        </Alert>
      )}
      
      <form 
        onSubmit={show ? iniciarSesion : registrarUsuario} 
        className="p-4 border rounded shadow" 
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <h2 className="text-center mb-4">{show ? 'Iniciar sesión' : 'Registrarse'}</h2>
        
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            type="email"
            className="form-control"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            required
            minLength={show ? 4 : 6}
          />
        </div>
        
        <div className="d-grid gap-2 mb-3">
          <button 
            type="submit" 
            style={{
              backgroundColor: '#ff66b3',
              borderColor: '#ff66b3',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '0.25rem'
            }}
            className="btn"
          >
            {show ? 'Ingresar' : 'Registrarse'}
          </button>
        </div>
        
        <div className="text-center">
          <button 
            type="button"
            onClick={handleShow}
            style={{
              color: '#9933ff',
              border: 'none',
              background: 'none',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            {show ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </form>
    </div>
  );

  if (user) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 150px)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <form onSubmit={handleLogout} className="text-center">
          <Button 
            style={{
              backgroundColor: '#ff66b3',
              borderColor: '#ff66b3',
              color: 'white',
              padding: '0.75rem 3rem',
              fontSize: '1.25rem'
            }}
            size="lg"
            type="submit"
          >
            Cerrar sesión
          </Button>
        </form>
      </div>
    );
  }

  return renderAuthForm();
}

export default Login;