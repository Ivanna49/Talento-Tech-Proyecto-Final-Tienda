import { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom"; // Ya no la necesitaremos para la redirección inicial
import { Button, Container, Row, Col, Badge, Modal } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx"; // No es necesario useAuthContext aquí, useContext es suficiente
import CarritoCardBootstrap from "./CarritoCardBootstrap.jsx";

function CarritoBoostrap() {
    // Usamos useContext directamente para user
    const { user } = useContext(AuthContext); 
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);
    const [productosFormateados, setProductosFormateados] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [compraFinalizada, setCompraFinalizada] = useState(false);

    useEffect(() => {
        // Solo formatea productos si hay un usuario logueado
        if (user) { 
            const formatearProductos = () => {
                return productosCarrito.map(producto => {
                    let precio = producto.price;
                    if (typeof precio === 'string') {
                        precio = precio.replace(/[^\d,-]/g, '').replace(',', '.');
                        precio = parseFloat(precio);
                    }
                    
                    let cantidad = producto.cantidad;
                    if (typeof cantidad === 'string') {
                        cantidad = parseInt(cantidad.replace(/\D/g, ''));
                    }
                    
                    const subtotal = !isNaN(precio) && !isNaN(cantidad) ? precio * cantidad : 0;
                    
                    return {
                        ...producto,
                        price: !isNaN(precio) ? precio : 0,
                        cantidad: !isNaN(cantidad) ? cantidad : 0,
                        subtotal
                    };
                });
            };
            setProductosFormateados(formatearProductos());
        } else {
            // Si no hay usuario, asegura que el carrito formateado esté vacío
            setProductosFormateados([]);
        }
    }, [productosCarrito, user]); // Añadimos 'user' como dependencia del useEffect

    const formatPrice = (value) => {
        const number = typeof value === 'number' ? value : 0;
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    };

    const total = productosFormateados.reduce((acc, producto) => acc + (producto.subtotal || 0), 0);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleConfirmPurchase = () => {
        console.log("Compra confirmada!");
        vaciarCarrito();
        setCompraFinalizada(true);
        handleCloseModal();
    };

    // --- NUEVA LÓGICA PARA MOSTRAR EL MENSAJE DE ERROR ---
    if (!user) {
        return (
            <Container className="my-4 text-center">
                <Row>
                    <Col>
                        <h2 className="mb-3">Acceso denegado</h2>
                        <p className="lead">Debes iniciar sesión para ver tu carrito de compras.</p>
                        <Button 
                            href="/login" 
                            variant="primary" 
                            size="lg"
                            style={{
                                backgroundColor: '#ff69b4', // Color de tu botón "Finalizar Compra"
                                borderColor: '#ff69b4',
                                color: 'white',
                                padding: '0.75rem 2.5rem',
                                fontSize: '1.2rem',
                                borderRadius: '5px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#e6499e'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#ff69b4'}
                        >
                            Ir a Iniciar Sesión
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    // El resto de tu código de renderizado del carrito (solo si el usuario está logueado)
    return (
        <Container className="my-4">
            <Row className="align-items-center mb-4">
                <Col md={8}>
                    <h2 className="mb-0">Carrito de compras</h2>
                </Col>
                {!compraFinalizada && productosFormateados.length > 0 && (
                    <Col md={4} className="text-md-end">
                        <Button 
                            variant="danger" 
                            onClick={vaciarCarrito}
                            style={{
                                backgroundColor: '#8a2be2',
                                borderColor: '#8a2be2',
                                padding: '0.5rem 1.5rem'
                            }}
                        >
                            Vaciar carrito
                        </Button>
                    </Col>
                )}
            </Row>

            {productosFormateados.length > 0 ? (
                <>
                    <Row className="mb-2 fw-bold border-bottom pb-2 d-none d-md-flex">
                        <Col md={3}>Producto</Col>
                        <Col md={2}>Descripción</Col>
                        <Col md={2} className="text-center">Cantidad</Col>
                        <Col md={2} className="text-center">Precio Unitario</Col>
                        <Col md={2} className="text-center">Subtotal</Col>
                    </Row>

                    {productosFormateados.map((producto) => (
                        <CarritoCardBootstrap
                            key={producto.id}
                            producto={producto}
                            funcionDisparadora={borrarProductoCarrito}
                            formatPrice={formatPrice}
                        />
                    ))}

                    <Row className="mt-4">
                        <Col md={{ span: 4, offset: 8 }}>
                            <div className="p-3 bg-light rounded text-end">
                                <h4 className="mb-0">
                                    Total a pagar: <Badge bg="primary">{formatPrice(total)}</Badge>
                                </h4>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="text-end">
                            <Button 
                                variant="" 
                                size="lg"
                                className="px-5 py-2"
                                onClick={handleShowModal}
                                style={{
                                    backgroundColor: '#ff69b4',
                                    borderColor: '#ff69b4',
                                    color: 'white'
                                }}
                            >
                                Finalizar Compra
                            </Button>
                        </Col>
                    </Row>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar compra</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>¿Estás seguro que deseas finalizar tu compra por {formatPrice(total)}?</p>
                            <p>Esta acción no se puede deshacer.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cancelar
                            </Button>
                            <Button 
                                variant="success" 
                                onClick={handleConfirmPurchase}
                                style={{
                                    backgroundColor: '#ff69b4',
                                    borderColor: '#ff69b4'
                                }}
                            >
                                Confirmar compra
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <div className="text-center py-5">
                    <h4 className="text-muted">
                        {compraFinalizada ? "¡Compra realizada con éxito!" : "Tu carrito está vacío"}
                    </h4>
                    <Button 
                        href="/productos" 
                        className="mt-3"
                        style={{
                            backgroundColor: '#ff69b4',
                            borderColor: '#ff69b4',
                            color: 'white',
                            padding: '0.5rem 2rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#e6499e'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#ff69b4'}
                    >
                        Ver Productos
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default CarritoBoostrap;