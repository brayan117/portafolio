// Hacer un elemento arrastrable
function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    handle.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        
        // Traer al frente
        element.style.zIndex = getHighestZIndex() + 1;
        
        // Obtener la posición del mouse
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        
        // Calcular la nueva posición
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Establecer la nueva posición
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        // Detener el movimiento
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Obtener el z-index más alto
function getHighestZIndex() {
    const elements = document.querySelectorAll('*');
    let zIndex = 0;
    
    elements.forEach(element => {
        const z = parseInt(window.getComputedStyle(element).zIndex);
        if (!isNaN(z) && z > zIndex) {
            zIndex = z;
        }
    });
    
    return zIndex;
}

// Inicializar el formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Inicializar EmailJS con tu User ID
    // IMPORTANTE: Reemplaza 'YOUR_USER_ID' con tu ID de EmailJS
    emailjs.init('YOUR_USER_ID');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Mostrar indicador de carga
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Enviar el correo usando EmailJS
        emailjs.sendForm('default_service', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
                // Éxito
                showNotification('¡Mensaje enviado con éxito!', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                // Error
                console.error('Error al enviar el mensaje:', error);
                showNotification('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
            })
            .finally(() => {
                // Restaurar el botón
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Agregar al documento
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Inicializar utilidades
function initUtils() {
    // Inicializar el formulario de contacto cuando esté disponible
    if (document.readyState === 'complete') {
        initContactForm();
    } else {
        window.addEventListener('load', initContactForm);
    }
}

export { makeDraggable, getHighestZIndex, initUtils, showNotification };
