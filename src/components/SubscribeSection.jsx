import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

function SubscribeSection() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombreApellido: '',
    correoElectronico: '',
    productosInteres: [],
    otrosProductos: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        productosInteres: checked 
          ? [...prev.productosInteres, name]
          : prev.productosInteres.filter(item => item !== name)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    setShowModal(false);
  };

  const lightPinkStyle = {  
    backgroundColor: '#ffb6e1',
    borderColor: '#ffb6e1',
    color: 'white'
  };

  const darkPinkStyle = {  
    backgroundColor: '#ff69b4',
    borderColor: '#ff69b4',
    color: 'white'
  };

  return (
    <>
      <section 
        id="suscribir" 
        className="py-5 py-lg-8 d-flex align-items-center justify-content-center" 
        style={{ 
          backgroundImage: "url('/imagenes/cortinas_variedad.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', 
          minHeight: '60vh', 
          color: '#453264',
        }}
      >
        <div className="container text-center">
          <h2>¡Suscribíte a nuestro Newsletter!</h2>
          <Button 
            variant="secondary" 
            onClick={() => setShowModal(true)}
            style={lightPinkStyle}
          >
            Suscribir
          </Button>
        </div>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Suscripción</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <p>Completa el siguiente formulario para hacerte llegar nuestro Newsletter</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="nombreApellido">Nombre y apellido</label>
              <input 
                type="text" 
                className="form-control" 
                id="nombreApellido" 
                name="nombreApellido"
                placeholder="Escribe tu nombre y apellido"
                value={formData.nombreApellido}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="correoElectronico">Correo electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                id="correoElectronico" 
                name="correoElectronico"
                placeholder="Escribe tu correo electrónico"
                value={formData.correoElectronico}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label>Selecciona los productos que más te interesan</label>
              
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="toalla"
                  name="toalla"
                  checked={formData.productosInteres.includes('toalla')}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="toalla">TOALLAS</label>
              </div>
              
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="sabana"
                  name="sabana"
                  checked={formData.productosInteres.includes('sabana')}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="sabana">SÁBANAS</label>
              </div>
              
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="cortinas"
                  name="cortinas"
                  checked={formData.productosInteres.includes('cortinas')}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="cortinas">CORTINAS</label>
              </div>
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="otrosProductos">¿Qué otros productos quisieras ver en nuestra web?</label>
              <textarea 
                className="form-control" 
                id="otrosProductos" 
                name="otrosProductos"
                rows="3"
                value={formData.otrosProductos}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div className="modal-footer">
              <Button 
                variant="secondary" 
                onClick={() => setShowModal(false)}
                style={lightPinkStyle}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                style={darkPinkStyle}
              >
                Enviar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SubscribeSection;
