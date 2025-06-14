import { openWindow } from './windowManager.js';
import { makeDraggable } from './utils.js';

// Inicializar el escritorio
function initDesktop() {
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    const terminalWindow = document.getElementById('main-terminal');
    
    // Hacer la ventana de la terminal movible
    if (terminalWindow) {
        const windowHeader = terminalWindow.querySelector('.window-header');
        if (windowHeader) {
            makeDraggable(terminalWindow, windowHeader);
            
            // Establecer posición inicial de la terminal
            terminalWindow.style.position = 'absolute';
            terminalWindow.style.top = '100px';
            terminalWindow.style.left = '100px';
            terminalWindow.style.zIndex = '1000';
            
            // Añadir evento para el botón de cerrar
            const closeBtn = terminalWindow.querySelector('.close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    terminalWindow.style.display = 'none';
                });
            }
            
            // Añadir evento para el botón de minimizar
            const minimizeBtn = terminalWindow.querySelector('.minimize');
            if (minimizeBtn) {
                minimizeBtn.addEventListener('click', () => {
                    const content = terminalWindow.querySelector('.terminal-content');
                    if (content) {
                        content.style.display = content.style.display === 'none' ? 'block' : 'none';
                    }
                });
            }
        }
    }
    
    // Configurar los iconos del escritorio
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const windowType = icon.getAttribute('data-window');
            if (windowType) {
                openWindow(windowType);
            }
        });
        
        // Efecto hover
        icon.addEventListener('mouseover', () => {
            icon.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
        });
        
        icon.addEventListener('mouseout', () => {
            icon.style.backgroundColor = 'transparent';
        });
    });
}

export { initDesktop };
