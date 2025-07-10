import { Container, Row, Col, Carousel } from "react-bootstrap";

function Main() {
  return (
 <Container fluid className="my-2 px-0"> 
      <Row className="align-items-center">
        <Col md={12}> 
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/imagenes/outlet.jpg"  
                alt="Outlet"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/imagenes/2x1.jpg"
                alt="Promoción 2x1"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/imagenes/sabana.jpg"
                alt="Sábanas"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;