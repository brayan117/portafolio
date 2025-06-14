# 🖥️ Portafolio Interactivo - Terminal Web

Un portafolio interactivo con temática de terminal de comandos, inspirado en interfaces de línea de comandos y sistemas operativos retro.

## 🚀 Características

- Interfaz de terminal interactiva
- Ventanas arrastrables con efectos visuales
- Visualizador de certificados PDF integrado
- Diseño responsivo y adaptable
- Temática personalizable
- Efectos visuales retro

## 📂 Estructura del Proyecto

```
portafolio/
├── index.html          # Página principal
├── js/                 # Código JavaScript
│   ├── main.js         # Inicialización principal
│   └── modules/        # Módulos de funcionalidad
│       ├── desktop.js  # Gestión del escritorio
│       ├── windowManager.js  # Gestión de ventanas
│       └── certificates.js   # Gestión de certificados
├── styles/             # Hojas de estilo CSS
├── views/              # Plantillas HTML para ventanas
├── certificado1.pdf    # Archivos PDF en la raíz del proyecto
└── certificado2.pdf
```

## 🛠️ Cómo Configurar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/portafolio.git
   cd portafolio
   ```

2. Instala un servidor local (si no tienes uno):
   ```bash
   npm install -g live-server
   ```

3. Inicia el servidor:
   ```bash
   live-server --port=3000
   ```

4. Abre tu navegador en `http://localhost:3000`

## 📝 Cómo Personalizar

### Añadir Certificados

1. Coloca tus archivos PDF directamente en la carpeta raíz del proyecto
2. Los certificados se cargarán automáticamente en la ventana de Certificados
3. Los nombres de los archivos se formatearán automáticamente (los espacios y guiones se convertirán en espacios)

### Cambiar la Paleta de Colores

Edita las variables CSS en `styles/style.css`:

```css
:root {
    --primary-color: #00ff00;    /* Verde neón para elementos principales */
    --text-color: #00ff00;       /* Color del texto general */
    --bg-color: #0a0a0a;         /* Color de fondo principal */
    --window-bg: rgba(0, 0, 0, 0.85);
    --window-header-bg: rgba(0, 20, 0, 0.9);
    --border-color: rgba(0, 255, 0, 0.3);
    --terminal-bg: rgba(0, 15, 0, 0.8);
    --prompt-color: #33ff33;
    --command-color: #00cc00;
}
```

### Añadir Nuevas Ventanas

1. Crea un nuevo archivo HTML en la carpeta `views/`
2. Agrega el script a `index.html` dentro del div `#templates`
3. Crea un nuevo icono en el escritorio con el atributo `data-window` que coincida con el nombre de tu plantilla

## 🎨 Personalización Avanzada

### Temas

Puedes crear nuevos temas modificando las variables CSS o añadiendo nuevos estilos en `styles/`.

### Comandos de la Terminal

Los comandos disponibles están definidos en `js/modules/terminal.js`. Puedes añadir nuevos comandos editando el objeto `commands`.

## 🌐 Despliegue

1. Configura tu servidor web para que sirva los archivos estáticos
2. Asegúrate de que todas las rutas sean relativas
3. Configura las reglas de reescritura si es necesario para soportar HTML5 History API

## 🤝 Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## ✉️ Contacto

Tu Nombre - [@tu_usuario](https://twitter.com/tu_usuario)

Enlace del proyecto: [https://github.com/tu-usuario/portafolio](https://github.com/tu-usuario/portafolio)

---

<div align="center">
    Hecho por Brayan
</div>