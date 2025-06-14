# 🖥️ Portafolio Interactivo - Terminal Web

Un portafolio interactivo con temática de terminal de comandos, inspirado en interfaces de línea de comandos y sistemas operativos retro.

## 🚀 Características

- Interfaz de terminal interactiva
- Ventanas arrastrables
- Efectos visuales retro
- Diseño responsivo
- Temática personalizable


## 🎨 Personalización

### Paleta de Colores

La interfaz usa variables CSS para una fácil personalización. Los colores principales están definidos en [styles/style.css](cci:7://file:///c:/Users/Brayan/Desktop/portafolio/portafolio/styles/style.css:0:0-0:0):

```css
:root {
    /* Colores principales */
    --primary-color: #00ff00;    /* Verde neón para elementos principales */
    --text-color: #00ff00;       /* Color del texto general */
    --bg-color: #0a0a0a;         /* Color de fondo principal */
    
    /* Ventanas */
    --window-bg: rgba(0, 0, 0, 0.85);        /* Fondo de ventanas */
    --window-header-bg: rgba(0, 20, 0, 0.9); /* Encabezado de ventanas */
    --border-color: rgba(0, 255, 0, 0.3);    /* Bordes y detalles */
    
    /* Terminal */
    --terminal-bg: rgba(0, 15, 0, 0.8);      /* Fondo de la terminal */
    --prompt-color: #33ff33;                 /* Color del prompt */
    --command-color: #00cc00;                /* Color de los comandos */
    
    /* Estado y feedback */
    --success-color: #00ff00;    /* Éxito */
    --warning-color: #ffff00;    /* Advertencia */
    --error-color: #ff3333;      /* Error */
    --info-color: #00ccff;       /* Información */
}