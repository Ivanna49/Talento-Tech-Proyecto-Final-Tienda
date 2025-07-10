import Swal from 'sweetalert2'

export function dispararSweetBasico(titulo, text, icon, textoBoton) {
    Swal.fire({
    title: titulo,
    text: text,
    icon: icon,
    confirmButtonText: 'Aceptar',
    background: '#2a2a2a',
        color: '#e0e0e0',
        confirmButtonColor: '#b1a9ec',
        iconColor: '#941cb4',
        titleTextColor: '#941cb4',
    customClass: {
        popup: 'custom-popup',
        title: 'custom-title',
        confirmButton: 'custom-button',
    }
})    
}