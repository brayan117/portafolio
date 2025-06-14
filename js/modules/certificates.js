// Lista de certificados disponibles
const KNOWN_CERTIFICATES = [
    'Ethical hacker.pdf',
    'Tecnico de Ciberseguridad.pdf',
    'analista junior.pdf'
    // Añade aquí más certificados según sea necesario
];

// Función para formatear el nombre del archivo como título
function formatFileName(fileName) {
    // Eliminar la extensión .pdf
    let title = fileName.replace(/\.pdf$/i, '');
    
    // Reemplazar guiones bajos y guiones con espacios
    title = title.replace(/[_\-]/g, ' ');
    
    // Poner en mayúscula la primera letra de cada palabra
    title = title.replace(/\b\w/g, l => l.toUpperCase());
    
    return title || 'Certificado sin nombre';
}

// Función para cargar y mostrar los certificados
async function loadCertificates() {
    const container = document.getElementById('certificates-container');
    if (!container) {
        console.error('No se encontró el contenedor de certificados');
        return;
    }

    // Mostrar indicador de carga
    container.innerHTML = `
        <div class="loading-certificates">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Cargando certificados...</span>
        </div>`;

    try {
        // Usar la lista predefinida de certificados
        const pdfFiles = KNOWN_CERTIFICATES.map(fileName => ({
            id: fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase(),
            title: formatFileName(fileName),
            fileName: fileName,
            fileUrl: fileName
        }));

        console.log('Archivos PDF encontrados:', pdfFiles);

        // Mostrar los certificados encontrados
        if (pdfFiles.length > 0) {
            container.innerHTML = pdfFiles.map((cert, index) => `
                <div class="certificate-item" id="cert-${cert.id}-${index}">
                    <h3><i class="fas fa-file-pdf"></i> ${cert.title}</h3>
                    <div class="pdf-viewer">
                        <iframe src="${cert.fileUrl}" 
                                width="100%" 
                                height="500px"
                                style="border: none; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                        </iframe>
                    </div>
                    <div class="certificate-actions">
                        <a href="${cert.fileUrl}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="btn-download">
                            <i class="fas fa-download"></i> Descargar PDF
                        </a>
                    </div>
                </div>`).join('');
            
            // Verificar si los iframes se cargaron correctamente
            setTimeout(() => {
                const iframes = container.querySelectorAll('iframe');
                iframes.forEach(iframe => {
                    iframe.onerror = () => {
                        const parent = iframe.closest('.certificate-item');
                        if (parent) {
                            const title = parent.querySelector('h3')?.textContent || 'Certificado';
                            parent.innerHTML = `
                                <div class="certificate-error">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <h3>${title}</h3>
                                    <p>No se pudo cargar el certificado.</p>
                                    <p>Ruta intentada: <code>${iframe.src}</code></p>
                                    <a href="${iframe.src}" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       class="btn-download">
                                        <i class="fas fa-download"></i> Intentar descargar
                                    </a>
                                </div>`;
                        }
                    };
                });
            }, 2000);
        } else {
            container.innerHTML = `
                <div class="no-certificates">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>No se encontraron certificados configurados.</p>
                    <p>Por favor, verifica el archivo certificates.js</p>
                </div>`;
        }
    } catch (error) {
        console.error('Error al cargar los certificados:', error);
        container.innerHTML = `
            <div class="error-loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los certificados. Por favor, verifica la consola para más detalles.</p>
                <p class="error-details">${error.message || 'Error desconocido'}</p>
            </div>`;
    }
}

// Inicializar el módulo de certificados
function initCertificates() {
    // Cargar los certificados cuando se abra la ventana
    document.addEventListener('certificates-window-opened', loadCertificates);
}

export { initCertificates };
