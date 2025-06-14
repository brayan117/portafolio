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

// Inicializar utilidades
function initUtils() {
    // Aquí puedes añadir cualquier inicialización de utilidades que necesites
    console.log('Utilidades inicializadas');
}

export { makeDraggable, getHighestZIndex, initUtils };
