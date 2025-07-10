import { useState } from 'react';
import '../styles/Contacto.css'; 


const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Formulario enviado:', formData);
  
  };

  return (
    <div className="page-container">
      <main className="contact-content">
        <section className="contact-section">
          <h2 className="contact-title">Contacto</h2>
          <p className="contact-subtitle">Si tenés alguna consulta podés comunicarte con nosotros</p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Escribe tu nombre aquí"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Escribe tu email aquí"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí"
                rows="6"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Enviar Mensaje
            </button>
          </form>
        </section>
      </main>
      
    </div>
  );
};

export default Contacto;