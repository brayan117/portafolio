import { openWindow } from './windowManager.js';

// Comandos disponibles
const commands = {
    help: {
        description: 'Muestra todos los comandos disponibles',
        execute: (terminalOutput) => showHelp(terminalOutput)
    },
    about: {
        description: 'Muestra información sobre mí',
        execute: () => openWindow('about')
    },
    projects: {
        description: 'Muestra mis proyectos',
        execute: () => openWindow('projects')
    },
    skills: {
        description: 'Muestra mis habilidades técnicas',
        execute: () => openWindow('skills')
    },
    contact: {
        description: 'Muestra información de contacto',
        execute: () => openWindow('contact')
    },
    clear: {
        description: 'Limpia la terminal',
        execute: (_, terminalOutput) => { terminalOutput.innerHTML = ''; }
    },
    whoami: {
        description: 'Muestra información del usuario actual',
        execute: (terminalOutput) => printToTerminal(terminalOutput, 'root', 'system')
    },
    date: {
        description: 'Muestra la fecha y hora actual',
        execute: (terminalOutput) => printToTerminal(terminalOutput, new Date().toLocaleString(), 'system')
    }
};

// Inicializar la terminal
function initTerminal(templates) {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    printToTerminal(terminalOutput, 'Bienvenido a mi portafolio interactivo', 'system');
    printToTerminal(terminalOutput, 'Escribe "help" para ver los comandos disponibles', 'system');
    
    terminalInput.focus();
    
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            processCommand(command, terminalOutput);
            terminalInput.value = '';
        }
    });
}

// Procesar comandos
function processCommand(command, terminalOutput) {
    if (!command) return;
    
    printToTerminal(terminalOutput, `> ${command}`, 'command');
    
    if (commands[command]) {
        commands[command].execute(terminalOutput);
    } else {
        printToTerminal(terminalOutput, `Comando no encontrado: ${command}`, 'error');
        printToTerminal(terminalOutput, 'Escribe "help" para ver los comandos disponibles', 'system');
    }
}

// Mostrar ayuda
function showHelp(terminalOutput) {
    printToTerminal(terminalOutput, 'Comandos disponibles:', 'system');
    for (const [cmd, info] of Object.entries(commands)) {
        printToTerminal(terminalOutput, `  ${cmd} - ${info.description}`, 'system');
    }
}

// Imprimir en la terminal
function printToTerminal(terminalOutput, text, type = 'normal') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

export { initTerminal };
