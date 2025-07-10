import React from 'react'; 
import { Helmet } from 'react-helmet';
 
function About() {
    return (
        <>
            <Helmet>
                <title>Nosotros </title>
            </Helmet>
            
            <section style={{ padding: "20px", maxWidth: "600px", margin: "auto", color:"#6a2f6b" }}>
                <h1>Quiénes somos</h1> 
                <p>
                    Nuestra tienda nace de un sueño familiar. Fundada en 2021 somos una
                    empresa 100% de carácter familiar con un objetivo constante: ofrecer a nuestros
                    clientes los productos textiles que buscan. Creemos firmemente que el confort debería ser accesible
                    para todos. Todos merecen cuidarse, mimarse y sentir su mejor versión,
                    por eso trabajamos incansablemente para hacerlo posible.
                </p>
                <h2>Misión</h2>
                <p>
                    En la tienda tenemos una misión clara: hacer que el confort esté al
                    alcance de todos. Trabajamos arduamente todos los días para ofrecer
                    los mejores productos a los precios más competitivos. A lo largo de
                    los años, hemos enfocado nuestros esfuerzos en desarrollar una
                    estrategia eficiente y una comunicación integral que coloque
                    al cliente en el centro de todo lo que hacemos.
                </p>
                <h2>Nuestra presencia en línea</h2>
                <p>
                    Siempre hemos apostado fuertemente por el comercio en línea, buscando
                    mejorar constantemente la experiencia de nuestros clientes. Durante la
                    pandemia, fuimos una de las principales empresas en adaptarnos y
                    potenciar nuestra presencia en línea, convirtiéndonos en uno de los
                    principales distribuidores en Argentina.
                </p>
                <p>
                    Contamos con un talentoso equipo digital que trabaja incansablemente
                    para mejorar la experiencia de nuestros clientes, tanto a nivel
                    nacional como internacional. Nuestros planes se centran en la
                    fidelidad, el compromiso y el bienestar de nuestros clientes,
                    ofreciendo una amplia variedad de productos que incluyen marcas
                    líderes a precios imbatibles. Esta es nuestra manera de democratizar
                    las mejores marcas del mercado para que todos los hogares tengan
                    acceso a lo mejor en productos textiles.
                </p>
                <h2>Recomendaciones</h2>
                <div style={{ width: '100vw', marginLeft: '-50vw', left: '50%', position: 'relative' }}>
                    <iframe 
                        src="https://www.youtube.com/embed/0AkU92vb8AY"
                        style={{ width: '90%', height: '56.25vw', border: 'none' }}
                        allowFullScreen
                        title="Video sobre nuestra tienda"
                    />
                </div>
            </section>

        </>
    );
}

export default About;