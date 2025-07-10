import { useEffect, useState } from "react"
import { useProductosContext } from "../contexts/ProductosContext"
import { useAuthContext } from "../contexts/AuthContext"
import { Helmet } from "react-helmet";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardProducto from "./Card"
import { FaSearch } from "react-icons/fa";

function ProductosContainer({}){
    const {productos, obtenerProductos, filtrarProductos} = useProductosContext();

    const productosPorPagina = 4;
    const [paginaActual, setPaginaActual] = useState(1);
    
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("")

    useEffect(() => {
        obtenerProductos().then((productos) => {
            setCargando(false);
        }).catch((error) => {
            setError('Hubo un problema al cargar los productos.');
            setCargando(false);
        })
    }, []);

    useEffect(() => {
        filtrarProductos(filtro)
    },[filtro])

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div>
                <Helmet>
                    <title>Productos</title>
                    <meta name="description" content="." />
                </Helmet>
                <div className="input-group mb-3 mt-3">
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {productosActuales.length > 0 ? productosActuales.map((producto) => (
                        <Col key={producto.id}>
                            <CardProducto producto={producto} />
                        </Col>
                    )) : <></>}
                </Row>
                <div className="d-flex justify-content-center my-4"> 
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                            style={
                                paginaActual === index + 1 
                                    ? { 
                                        backgroundColor: '#fe83c1', 
                                        borderColor: '#fe83c1' 
                                    } 
                                    : { 
                                        color: '#fe83c1', 
                                        borderColor: '#fe83c1' 
                                    }
                            }
                            onClick={() => cambiarPagina(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        )
    }
}

export default ProductosContainer;
