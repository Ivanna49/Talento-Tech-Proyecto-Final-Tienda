import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { Button } from "react-bootstrap";

function ProductoDetalle({}) {
  const navegar = useNavigate();

  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();

  const { id } = useParams();

  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id).then(() => {
      setCargando(false);
    }).catch((error) => {
      if(error == "Producto no encontrado"){
        setError("Producto no encontrado")
      }
      if(error == "Hubo un error al obtener el producto."){
        setError("Hubo un error al obtener el producto.");
      }
      setCargando(false);
    })
  }, [id]);

  function funcionCarrito() {
    if (cantidad < 1) return;

    console.log("Agregar al carrito")
    agregarAlCarrito({ ...productoEncontrado, cantidad });
    dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
  }

  function dispararEliminar(){
    eliminarProducto(id).then(() => {
      navegar("/productos")
    }).catch((error) => {
      dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
    })
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  const pinkButtonStyle = {
    backgroundColor: '#ffacec',
    borderColor: '#ffacec',
    color: 'white',
    transition: 'all 0.3s ease',
    margin: '5px'
  };

  const pinkButtonHover = {
    backgroundColor: '#e69bd4',
    borderColor: '#e69bd4'
  };

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      
      <img className="detalle-imagen" src={productoEncontrado.imagen} alt={productoEncontrado.name} />
      <div className="detalle-info">
        <h2>{productoEncontrado.name}</h2>
        <p>{productoEncontrado.description}</p>
        <p>{productoEncontrado.price} </p>
        <div className="detalle-contador">
          <button 
            onClick={restarContador}
            style={{ 
              ...pinkButtonStyle, 
              width: '30px',
              ':hover': pinkButtonHover
            }}
          >
            -
          </button>
          <span>{cantidad}</span>
          <button 
            onClick={sumarContador}
            style={{ 
              ...pinkButtonStyle, 
              width: '30px',
              ':hover': pinkButtonHover
            }}
          >
            +
          </button>
        </div>
        {admin ? (
          <>
            <Link to={"/admin/editarProducto/" + id}>
              <Button 
                style={pinkButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = pinkButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = pinkButtonStyle.backgroundColor}
              >
                Editar Producto
              </Button>
            </Link>
            <Button 
              onClick={dispararEliminar}
              style={pinkButtonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = pinkButtonHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = pinkButtonStyle.backgroundColor}
            >
              Eliminar Producto
            </Button>
          </>
        ) : (
          <Button 
            onClick={funcionCarrito}
            style={pinkButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = pinkButtonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = pinkButtonStyle.backgroundColor}
          >
            Agregar al carrito
          </Button>
        )}
      </div>

   

    </div>
  );
}

export default ProductoDetalle;