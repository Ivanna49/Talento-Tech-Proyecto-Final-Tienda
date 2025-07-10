import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function InformacionSection() {
  
  const cardsData = [
    {
      id: 1,
      image: "/imagenes/sabanas.jpg",
      alt: "Sabana",
      title: "Descubrí el placer de la suavidad de nuestras telas",
      text: "Encontrá el textil que define tu estilo y personalidad."
    },
    {
      id: 2,
      image: "/imagenes/cortinas_variedad.jpg",
      alt: "Cortina",
      title: "Calidad Garantizada",
      text: "Solo trabajamos con productos de primera calidad."
    },
    {
      id: 3,
      image: "/imagenes/toalla.jpg",
      alt: "Toalla",
      title: "Para cada ocasión",
      text: "Desde lo elegante y cómodo hasta lo fresco y casual."
    },
    {
      id: 4,
      image: "/imagenes/envío.jpg",
      alt: "Envíos",
      title: "Envío rápido y seguro",
      text: "Recibí tu producto favorito directamente en tu puerta."
    }
  ];

 
  const textStyle = {
    color: '#6a2f6b'
  };


  const imageStyle = {
    width: "100px", 
    height: "50px", 
    margin: "0 auto",
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer'
  };

  return (
    <section id="informacion" className="text-center py-5" style={textStyle}>
      <h2 style={{ 
        justifyContent: "center", 
        marginBottom: "2em",
        color: '#6a2f6b'
      }}>
        Descubrí la calidad de nuestros productos
      </h2>
      
      <Container>
        <Row className="justify-content-center">
          {cardsData.map((card) => (
            <Col key={card.id} md={3} sm={6} className="mb-4">
              <Card className="h-100 p-3 border-0" style={{ backgroundColor: 'transparent' }}>
                <Card.Img 
                  variant="top" 
                  src={card.image} 
                  alt={card.alt}
                  style={imageStyle}
                  className="img-hover" 
                />
                <Card.Body>
                  <Card.Title as="h3" style={textStyle}>{card.title}</Card.Title>
                  <Card.Text style={textStyle}>{card.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Estilos CSS para el efecto hover */}
      <style jsx>{`
        .img-hover:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}

export default InformacionSection;