// Función para formatear el nombre del archivo como título
function formatFileName(fileName) {
    // Eliminar la extensión .pdf y cualquier ruta
    let title = fileName.replace(/^.*[\\/]/, '').replace(/\.pdf$/i, '');
    
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
            <span>Buscando certificados...</span>
        </div>`;

    try {
        // Obtener la lista de archivos PDF de la carpeta resources
        const response = await fetch('resources/');
        const text = await response.text();
        
        // Extraer nombres de archivos PDF usando una expresión regular
        const pdfFiles = [];
        const parser = new DOMParser();
        const html = parser.parseFromString(text, 'text/html');
        const links = html.querySelectorAll('a[href$=".pdf"]');
        
        // Usar un Set para evitar duplicados
        const uniqueFiles = new Set();
        
        links.forEach(link => {
            let fileName = link.getAttribute('href');
            if (fileName && !fileName.includes('?')) {
                // Limpiar el nombre del archivo
                fileName = fileName.replace(/^.*[\\/]/, ''); // Eliminar cualquier ruta
                
                // Solo agregar si no está ya en el conjunto
                if (fileName && !uniqueFiles.has(fileName.toLowerCase())) {
                    uniqueFiles.add(fileName.toLowerCase());
                    
                    // Crear la ruta correcta
                    const fileUrl = `resources/${fileName}`;
                    
                    pdfFiles.push({
                        id: fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase(),
                        title: formatFileName(fileName),
                        fileName: fileName,
                        fileUrl: fileUrl
                    });
                }
            }
        });

        console.log('Archivos PDF encontrados:', pdfFiles);

        // Mostrar los certificados encontrados
        if (pdfFiles.length > 0) {
            container.innerHTML = pdfFiles.map((cert, index) => {
                // Usar decodeURI para asegurar que no haya doble codificación
                const cleanUrl = `resources/${cert.fileName}`;
                return `
                <div class="certificate-item" id="cert-${cert.id}-${index}">
                    <h3><i class="fas fa-file-pdf"></i> ${cert.title}</h3>
                    <div class="pdf-viewer">
                        <iframe src="${cleanUrl}" 
                                width="100%" 
                                height="500px"
                                style="border: none; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                        </iframe>
                    </div>
                    <div class="certificate-actions">
                        <a href="${cleanUrl}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="btn-download">
                            <i class="fas fa-download"></i> Descargar PDF
                        </a>
                    </div>
                </div>`;
            }).join('');
            
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
                    <p>No se encontraron archivos PDF en la carpeta resources.</p>
                    <p>Por favor, asegúrate de que los archivos PDF estén en la carpeta <code>resources/</code>.</p>
                </div>`;
        }
    } catch (error) {
        console.error('Error al cargar los certificados:', error);
        container.innerHTML = `
            <div class="error-loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los certificados. Por favor, verifica la consola para más detalles.</p>
                <p class="error-details">${error.message || 'Error desconocido'}</p>
                <p>Nota: Esta función requiere ser ejecutada en un servidor web para acceder al sistema de archivos.</p>
                <p>Ruta base: <code>${window.location.origin}/resources/</code></p>
            </div>`;
    }
}

// Inicializar el módulo de certificados
function initCertificates() {
    // Cargar los certificados cuando se abra la ventana
    document.addEventListener('certificates-window-opened', loadCertificates);
}

export { initCertificates };
