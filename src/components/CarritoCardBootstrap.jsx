import { Card, Row, Col, Button, Badge } from "react-bootstrap";

function CarritoCardBoostrap({ producto, funcionDisparadora, vaciarCarrito }) {
    
    function borrarDelCarrito() {
        funcionDisparadora(producto.id);
    }

    
    const priceNumber = typeof producto.price === 'string' ? 
                       parseFloat(producto.price) : producto.price;
    const cantidadNumber = typeof producto.cantidad === 'string' ?
                         parseInt(producto.cantidad) : producto.cantidad;
    
  
    const subtotal = cantidadNumber * priceNumber;

    return (
        <>
            <Card className="mb-3 shadow-sm">
                <Card.Body>
                    <Row className="align-items-center">
                     
                        <Col xs={12} md={3} className="mb-3 mb-md-0">
                            <Card.Img
                                variant="top"
                                src={producto.imagen}
                                style={{ 
                                    height: "80px", 
                                    width: "80px",
                                    objectFit: "cover",
                                    borderRadius: "4px"
                                }}
                                className="mx-auto d-block"
                            />
                        </Col>

                      
                        <Col xs={6} md={2} className="text-center text-md-start">
                            <Card.Title className="h6 mb-1">{producto.name}</Card.Title>
                            <Card.Text className="small text-muted mb-0">{producto.description}</Card.Text>
                        </Col>

                        
                        <Col xs={3} md={2} className="text-center">
                            <Badge bg="secondary" className="fs-6 py-2 px-3">
                                {cantidadNumber}
                            </Badge>
                        </Col>

                        <Col xs={3} md={2} className="text-center">
                            <span className="fw-bold">${priceNumber.toFixed(2)}</span>
                        </Col>

                 
                        <Col xs={6} md={2} className="text-center">
                            <span className="fw-bold text-primary">
                                ${!isNaN(subtotal) ? subtotal.toFixed(2) : '0.00'}
                            </span>
                        </Col>

                        
                        <Col xs={6} md={1} className="text-center">
                            <Button 
                                variant="outline-danger"
                                onClick={borrarDelCarrito}
                                size="sm"
                                className="rounded-circle me-2"
                                style={{ width: "32px", height: "32px" }}
                                aria-label="Eliminar producto"
                            >
                                <span style={{ lineHeight: "1" }}>×</span>
                            </Button>
                            <span className="text-muted small d-none d-md-inline">Eliminar</span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            
            {vaciarCarrito && (
                <div className="text-center mt-4">
                    <Button 
                        variant="primary"
                        onClick={vaciarCarrito}
                        style={{ 
                            backgroundColor: '#8a2be2', 
                            borderColor: '#8a2be2',
                            padding: '0.5rem 2rem'
                        }}
                    >
                        Vaciar Carrito
                    </Button>
                </div>
            )}
        </>
    );
}

export default CarritoCardBoostrap;