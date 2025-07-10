import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge, Image } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { FaShoppingCart, FaHome, FaBoxes, FaUsers, FaEnvelope, FaPlusCircle, FaRegUserCircle } from "react-icons/fa";

function NavBoot() {
  const { productosCarrito } = useContext(CarritoContext);
  const { admin } = useAuthContext();

  return (
    <Navbar style={{ backgroundColor: '#a2529d' }} 
      variant="dark" 
      expand="lg" 
      sticky="top"
    >
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          
          <span>Tienda Arrebo</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-principal" />
        <Navbar.Collapse id="nav-principal">
       
          <Nav className="mx-auto" style={{ gap: "1rem" }}>
            <Nav.Link as={Link} to="/" className="d-flex align-items-center">
              <FaHome style={{ marginRight: "5px" }} />
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/productos" className="d-flex align-items-center">
              <FaBoxes style={{ marginRight: "5px" }} />
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/nosotros" className="d-flex align-items-center">
              <FaUsers style={{ marginRight: "5px" }} />
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="d-flex align-items-center">
              <FaEnvelope style={{ marginRight: "5px" }} />
              Contacto
            </Nav.Link>
            {admin && (
              <Nav.Link as={Link} to="/admin/agregarProductos" className="d-flex align-items-center">
                <FaPlusCircle style={{ marginRight: "5px" }} />
                Agregar productos
              </Nav.Link>
            )}
          </Nav>
          
          <Nav>
            <Nav.Link as={Link} to="/carrito" className="d-flex align-items-center">
              <FaShoppingCart style={{ marginRight: "5px" }} />
              Carrito
              {productosCarrito.length > 0 && (
                <Badge bg="light" text="dark" className="ms-1">
                  {productosCarrito.length}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
              <FaRegUserCircle style={{ marginRight: "5px" }} />
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBoot;
