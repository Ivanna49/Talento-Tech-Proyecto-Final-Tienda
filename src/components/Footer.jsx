import React from 'react';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <h3>Seguinos en:</h3>
                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="/imagenes/icons8-facebook.png" alt="Facebook"/>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/imagenes/icons8-instagram.png" alt="Instagram"/>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="/imagenes/icons8-twitter.png" alt="Twitter"/>
                    </a>
                </div>
                <div className="footer-container">
                    <p>Hecho con ❤️ by Ivi. Todos los derechos reservados. {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;