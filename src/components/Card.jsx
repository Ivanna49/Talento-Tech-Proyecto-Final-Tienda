import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function CardProducto({ producto }) {
   return (
      <Card 
         className="h-100 text-center shadow-sm" 
         style={{ backgroundColor: '#ffcaf4' }}
      >
         <Card.Img
            variant="top"
            src={producto.imagen}
            style={{ maxHeight: "150px", objectFit: "contain", padding: "10px" }}
         />
         <Card.Body>
            <Card.Title>{producto.name}</Card.Title>
            <Card.Text className="text-muted"></Card.Text>
            <h5 style={{ color: '#b4497e', marginBottom: '1rem' }}>{producto.price}</h5>
            <div className="d-flex justify-content-around">
               <Link to={`/productos/${producto.id}`}>
                  <Button 
                     variant="primary" 
                     size="sm"
                     style={{ backgroundColor: '#6e3d6c', borderColor: '#6e3d6c' }}
                  >
                     Ver detalle
                  </Button>
               </Link>
            </div>
         </Card.Body>
      </Card>
   )
}

export default CardProducto