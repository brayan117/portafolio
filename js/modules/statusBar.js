// Inicializar la barra de estado
function initStatusBar() {
    updateCpuUsage();
    setupIpTarget();
    updateClock();
    setInterval(updateClock, 60000); // Actualizar cada minuto
    
    // Establecer IP local
    const localIpElement = document.querySelector('.local-ip-value');
    if (localIpElement) {
        localIpElement.textContent = '192.168.1.100';
    }
}

// Actualizar el reloj
function updateClock() {
    const currentTimeElement = document.getElementById('current-time');
    if (currentTimeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        currentTimeElement.textContent = timeString;
    }
}

// Simular uso de CPU
function updateCpuUsage() {
    const cpuUsageElement = document.querySelector('.cpu-percent');
    if (!cpuUsageElement) return;
    
    // Generar un valor aleatorio entre 1% y 99%
    const randomUsage = Math.floor(Math.random() * 99) + 1;
    cpuUsageElement.textContent = `${randomUsage}%`;
    
    // Cambiar el color según el uso
    if (randomUsage > 80) {
        cpuUsageElement.style.color = '#ff5f56';
    } else if (randomUsage > 50) {
        cpuUsageElement.style.color = '#ffbd2e';
    } else {
        cpuUsageElement.style.color = '#4CAF50';
    }
    
    // Actualizar cada 2 segundos
    setTimeout(updateCpuUsage, 2000);
}

// Configurar el objetivo IP
function setupIpTarget() {
    const targetIpElement = document.querySelector('.target-ip-value');
    const ipInput = document.getElementById('ip-input');
    const setIpButton = document.getElementById('set-ip');
    const targetIpContainer = document.getElementById('target-ip');
    
    if (!targetIpElement || !ipInput || !setIpButton || !targetIpContainer) return;
    
    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!targetIpContainer.contains(e.target) && e.target !== ipInput) {
            const ipContainer = targetIpContainer.querySelector('.ip-input-container');
            if (ipContainer) {
                ipContainer.style.display = 'none';
            }
        }
    });
    
    // Mostrar/ocultar el input de IP
    targetIpContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        const ipContainer = targetIpContainer.querySelector('.ip-input-container');
        if (ipContainer) {
            const isVisible = ipContainer.style.display === 'flex';
            ipContainer.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                ipInput.focus();
            }
        }
    });
    
    // Establecer la IP objetivo
    function setTargetIp() {
        const ip = ipInput.value.trim();
        if (ip) {
            // Validación simple de IP
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (ipRegex.test(ip)) {
                targetIpElement.textContent = ip;
                ipInput.value = '';
                // Guardar en localStorage
                localStorage.setItem('targetIp', ip);
                // Mostrar notificación
                showNotification(`IP objetivo establecida: ${ip}`);
            } else {
                showNotification('Formato de IP inválido', 'error');
            }
        }
    }
    
    setIpButton.addEventListener('click', setTargetIp);
    ipInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            setTargetIp();
        }
    });
    
    // Cargar IP guardada si existe
    const savedIp = localStorage.getItem('targetIp');
    if (savedIp) {
        targetIpElement.textContent = savedIp;
    }
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

export { initStatusBar };
