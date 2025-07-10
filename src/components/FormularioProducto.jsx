import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  FloatingLabel,
  Alert
} from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';
import { useProductosContext } from '../contexts/ProductosContext';
import { dispararSweetBasico } from '../assets/SweetAlert';

function FormularioProducto() {
  const { agregarProducto } = useProductosContext();
  const { admin } = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ""
  });

  const [submitting, setSubmitting] = useState(false);

  const validarFormulario = () => {
    const errors = [];
    
    if (!producto.name.trim()) {
      errors.push("El nombre es obligatorio.");
    }
    if (!producto.price || producto.price <= 0) {
      errors.push("El precio debe ser mayor a 0.");
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      errors.push("La descripción debe tener al menos 10 caracteres.");
    }
    if (!producto.imagen.trim()) {
      errors.push("La URL de la imagen no debe estar vacía.");
    }
    
    return errors.length > 0 ? errors : true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const validacion = validarFormulario();
    
    if (validacion === true) {
      try {
        await agregarProducto(producto);
        setProducto({ name: '', price: '', description: '', imagen: "" });
        dispararSweetBasico(
          "Éxito", 
          "Producto agregado correctamente", 
          "success", 
          "Aceptar"
        );
      } catch (error) {
        dispararSweetBasico(
          "Error", 
          "Hubo un problema al agregar el producto", 
          "error", 
          "Cerrar"
        );
      }
    } else {
      validacion.forEach(error => {
        dispararSweetBasico(
          "Error en el formulario", 
          error, 
          "error", 
          "Cerrar"
        );
      });
    }
    
    setSubmitting(false);
  };

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body style={{ color: '#6a2f6b' }}> 
              <Card.Title className="text-center mb-4 h2">Agregar Nuevo Producto</Card.Title>
              
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="name" label="Nombre del producto" className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    value={producto.name}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel controlId="imagen" label="URL de la imagen" className="mb-3">
                  <Form.Control
                    type="url"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handleChange}
                    placeholder="URL de la imagen"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel controlId="price" label="Precio ($)" className="mb-3">
                  <Form.Control
                    type="number"
                    name="price"
                    value={producto.price}
                    onChange={handleChange}
                    placeholder="Precio"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel controlId="description" label="Descripción" className="mb-4">
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={producto.description}
                    onChange={handleChange}
                    placeholder="Descripción detallada del producto"
                    style={{ height: "150px" }}
                    required
                  />
                </FloatingLabel>

                <div className="d-grid gap-2">
                  <Button 
                    style={{
                      backgroundColor: '#ff66b3',
                      borderColor: '#ff66b3',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#ff4da6'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ff66b3'}
                    type="submit" 
                    size="lg"
                    disabled={submitting}
                  >
                    {submitting ? 'Agregando...' : 'Agregar Producto'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FormularioProducto;