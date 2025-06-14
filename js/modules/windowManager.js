import { makeDraggable } from './utils.js';

// Almacén de plantillas
let templates = {};

// Cargar plantillas
async function loadTemplates() {
    const templateFiles = [
        'window-base',
        'about-window',
        'projects-window',
        'skills-window',
        'contact-window'
    ];

    for (const file of templateFiles) {
        try {
            const response = await fetch(`views/${file}.html`);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const template = doc.querySelector('template');
            if (template) {
                templates[template.id] = template;
            }
        } catch (error) {
            console.error(`Error cargando la plantilla ${file}:`, error);
        }
    }
    
    return templates;
}

// Función para abrir ventanas
function openWindow(windowType) {
    const templateId = `${windowType}-window-template`;
    const template = templates[templateId];
    const windowsContainer = document.getElementById('windows-container');
    
    if (!template) {
        console.error(`No se encontró la plantilla: ${templateId}`);
        return null;
    }
    
    // Cerrar ventana si ya está abierta
    const existingWindow = document.getElementById(`window-${windowType}`);
    if (existingWindow) {
        existingWindow.style.display = 'flex';
        existingWindow.style.zIndex = getHighestZIndex() + 1;
        return existingWindow;
    }
    
    // Clonar la plantilla
    const windowElement = template.content.cloneNode(true).firstElementChild;
    windowElement.id = `window-${windowType}`;
    
    // Configurar controles de la ventana
    const closeBtn = windowElement.querySelector('.control-btn.close');
    
    closeBtn?.addEventListener('click', () => {
        windowElement.remove();
    });
    
    // Hacer la ventana arrastrable
    const header = windowElement.querySelector('.window-header');
    if (header) {
        makeDraggable(windowElement, header);
    }
    
    // Añadir al contenedor
    windowsContainer.appendChild(windowElement);
    
    // Posicionar ventana
    const windows = document.querySelectorAll('.app-window');
    const offset = windows.length * 20;
    windowElement.style.top = `${100 + offset}px`;
    windowElement.style.left = `${100 + offset}px`;
    windowElement.style.zIndex = getHighestZIndex() + 1;
    
    return windowElement;
}

// Función para obtener el z-index más alto
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

export { loadTemplates, openWindow, getHighestZIndex };
