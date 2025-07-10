import { useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button, Container, Card, FloatingLabel, Spinner, Alert, Row, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function FormularioEdicion() {
  const navigate = useNavigate();
  const { admin } = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  if (!admin) {
    return <Navigate to="/login" state={{ from: `/admin/editar-producto/${id}` }} replace />;
  }

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        await obtenerProducto(id);
        setIsLoading(false);
      } catch (error) {
        setApiError(error.message);
        setIsLoading(false);
      }
    };

    cargarProducto();
  }, [id, obtenerProducto]);

  useEffect(() => {
    if (productoEncontrado && !isLoading) {
      setFormData({
        name: productoEncontrado.name || '',
        price: productoEncontrado.price || '',
        description: productoEncontrado.description || '',
        imagen: productoEncontrado.imagen || ''
      });
    }
  }, [productoEncontrado, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name': return !value.trim() ? 'Nombre es requerido' : '';
      case 'price': 
        return !value || isNaN(value) || Number(value) <= 0 ? 'Precio debe ser mayor a 0' : '';
      case 'description': 
        return !value.trim() || value.length < 10 ? 'Descripción debe tener al menos 10 caracteres' : '';
      case 'imagen':
        if (!value.trim()) return 'URL de imagen es requerida';
        if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(value)) 
          return 'URL debe ser una imagen válida (jpg, png, webp)';
        return '';
      default: return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitLoading(false);
      return;
    }

    try {
      await editarProducto({ ...formData, id });
      toast.success('Producto actualizado correctamente!');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (error) {
      toast.error(`Error al actualizar: ${error.message}`);
      setApiError(error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (apiError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {apiError}
          <div className="mt-3">
            <Button 
              variant="primary"
              onClick={() => navigate('/admin')}
            >
              Volver al panel
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4 h2">
                Editar Producto
              </Card.Title>
              
              <Form onSubmit={handleSubmit} noValidate>
                <FloatingLabel controlId="name" label="Nombre" className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="imagen" label="URL de imagen" className="mb-3">
                  <Form.Control
                    type="url"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    isInvalid={!!errors.imagen}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.imagen}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="price" label="Precio ($)" className="mb-3">
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    isInvalid={!!errors.price}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="description" label="Descripción" className="mb-4">
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{ height: '150px' }}
                    isInvalid={!!errors.description}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={submitLoading}
                    style={{
                      backgroundColor: '#ff69b4',
                      borderColor: '#ff69b4',
                      '&:hover': {
                        backgroundColor: '#e6499e',
                        borderColor: '#e6499e'
                      }
                    }}
                  >
                    {submitLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Actualizando...
                      </>
                    ) : 'Actualizar Producto'}
                  </Button>
                  
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate('/admin')}
                  >
                    Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
      />
    </Container>
  );
}

export default FormularioEdicion;