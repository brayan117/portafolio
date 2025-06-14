// Importar módulos
import { initTerminal } from './modules/terminal.js';
import { initDesktop } from './modules/desktop.js';
import { initStatusBar } from './modules/statusBar.js';
import { loadTemplates } from './modules/windowManager.js';
import { initUtils } from './modules/utils.js';
import { initCertificates } from './modules/certificates.js';

// Inicializar la aplicación
async function initApp() {
    try {
        // Inicializar utilidades
        initUtils();
        
        // Cargar plantillas
        await loadTemplates();
        
        // Inicializar componentes
        initTerminal();
        initDesktop();
        initStatusBar();
        initCertificates(); // Inicializar el módulo de certificados
        
        console.log('Aplicación inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);
