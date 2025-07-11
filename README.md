<div align="center">
  <img src="https://raw.githubusercontent.com/zarvent/zarvent.github.io/main/public/25-escitalopram/logo-escitalopram.png" alt="Logo del Proyecto Escitalopram" width="150">
  <h1 style="font-size: 3rem; border-bottom: none;">Una Mirada al Escitalopram</h1>
</div>

<div align="center">
  <!-- Badges de Estado y Tecnología -->
  <img src="https://img.shields.io/badge/estado-activo-green?style=for-the-badge" alt="Estado del Proyecto: Activo">
  <img src="https://img.shields.io/badge/versión-1.0.0-blue?style=for-the-badge" alt="Versión: 1.0.0">
  <img src="https://img.shields.io/badge/licencia-MIT-lightgrey?style=for-the-badge" alt="Licencia: MIT">
  <br>
  <img src="https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Chart.js-FF6384.svg?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js">
</div>

---

## 🚀 Visión General del Sistema

Este repositorio no contiene simplemente un artículo; presenta un **sistema de publicación de contenido académico. El primer ejemplar, **"Una Mirada al Escitalopram"**, 


<div align="center" style="margin-top: 2rem; margin-bottom: 2rem;">
  <a href="https://zarvent.github.io/25-escitalopram/" target="_blank" rel="noopener noreferrer" style="background-color: #6366f1; color: white; padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold; font-size: 1.1rem; box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.39);">
    Ver la Publicación en Vivo
  </a>
</div>

## ✨ Capturas de la Experiencia

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <p><strong>☀️ Tema Claro</strong></p>
      <img src="https://raw.githubusercontent.com/zarvent/zarvent.github.io/main/public/25-escitalopram/preview-light.png" alt="Vista previa del artículo en tema claro">
    </td>
    <td width="50%" align="center">
      <p><strong>🌙 Tema Oscuro</strong></p>
      <img src="https://raw.githubusercontent.com/zarvent/zarvent.github.io/main/public/25-escitalopram/preview-dark.png" alt="Vista previa del artículo en tema oscuro">
    </td>
  </tr>
</table>

## 🏛️ Filosofía de Arquitectura y Diseño

Este proyecto se fundamenta en principios de ingeniería de software robustos, aplicados al dominio del contenido académico.

* **🧩 Principio de Aislamiento Total:** Cada artículo es un módulo completamente independiente. Sus estilos, scripts y assets están rigurosamente prefijados y autocontenidos, garantizando que cambios en una publicación **nunca** afecten a otra.
* **🏗️ Escalabilidad Nativa:** La arquitectura está diseñada para crecer. Añadir un nuevo artículo es tan simple como duplicar la plantilla, sin incrementar la complejidad del sistema global.
* **⚡ Rendimiento como Requisito:** La optimización no es una ocurrencia tardía. Se implementan técnicas como carga diferida (lazy loading) de recursos pesados (ej. Chart.js), CSS optimizado y un DOM eficiente para garantizar tiempos de carga casi instantáneos (FCP < 1.5s, LCP < 2.5s).
* **♿ Accesibilidad Universal (WCAG 2.1 AA):** El diseño sigue las directrices de accesibilidad web. Se utiliza HTML semántico, atributos ARIA, navegación por teclado completa (incluyendo "skip links"), y un contraste de color validado para asegurar que el conocimiento sea accesible para todos.
* **🎨 Diseño Sofisticado y Funcional:** La estética no está reñida con el rigor. Se utiliza un sistema de diseño coherente basado en Tailwind CSS, enriquecido con una tipografía profesional y microinteracciones que mejoran la experiencia de lectura sin distraer.

## 🎯 Características Destacadas

* **🌗 Tema Dual (Claro/Oscuro):** Selector de tema con persistencia en `localStorage` para recordar la preferencia del usuario. El sistema de theming está implementado con variables CSS para un rendimiento óptimo.
* **📊 Gráficos Interactivos y Responsivos:** Visualización de datos complejos mediante Chart.js. Los gráficos se adaptan al tema seleccionado y son completamente responsivos.
* **🖱️ Navegación Fluida e Inteligente:**
    * **Scroll Suave:** Desplazamiento elegante entre secciones.
    * **Resaltado Activo:** La navegación indica automáticamente la sección visible en pantalla.
    * **Barra de Progreso:** Una barra visual indica el progreso de lectura del artículo.
* **📖 Experiencia de Lectura Mejorada:**
    * **Citas Interactivas:** Referencias académicas con tooltips que muestran la fuente sin interrumpir el flujo de lectura.
    * **Tipografía Profesional:** Uso de la familia de fuentes 'Inter' con una escala tipográfica matemática para una legibilidad máxima.
* **🖨️ Optimización para Impresión:** Una hoja de estilos dedicada (`print.css`) formatea el artículo para una impresión limpia y profesional, eliminando elementos interactivos y optimizando el contenido para el papel.
* **⚖️ Modal de Advertencia:** Un aviso legal inicial informa al usuario sobre la naturaleza del contenido, asegurando un uso responsable de la información.

## 🛠️ Stack Tecnológico

Este proyecto utiliza un conjunto de tecnologías modernas y eficientes, seleccionadas por su rendimiento, robustez y excelente experiencia de desarrollo.

| Logo                                                                                                                              | Tecnología     | Descripción                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------- |
| <img src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" height="25">          | **HTML5** | Para una estructura de contenido semántica, accesible y optimizada para SEO.                            |
| <img src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" height="25">             | **CSS3** | Para estilos avanzados, theming con variables CSS, animaciones y diseño responsivo.                     |
| <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" height="25"> | **JavaScript** | Para toda la interactividad del cliente: cambio de tema, gráficos, navegación y mejoras de UX.         |
| <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" height="25"> | **Tailwind CSS** | Framework CSS utility-first para un desarrollo rápido y un diseño consistente y personalizable.      |
| <img src="https://img.shields.io/badge/-Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white" alt="Chart.js" height="25"> | **Chart.js** | Para la creación de gráficos interactivos y visualmente atractivos que presentan datos complejos. |

## 📂 Estructura del Repositorio

La organización del proyecto está diseñada para ser intuitiva y escalable.


/
├── Articulos/
│   ├── 2025-03-11/                 # Directorio autocontenido para el artículo de Escitalopram
│   │   ├── css/
│   │   │   ├── 2025-03-11-escitalopram-enhanced.css
│   │   │   └── 2025-03-11-escitalopram-print.css
│   │   ├── js/
│   │   │   └── 2025-03-11-escitalopram-enhanced.js
│   │   ├── index.html              # El archivo principal del artículo
│   │   └── readme.md               # Documentación específica del módulo
│   └── (futuros artículos seguirán esta estructura...)
│
├── .vscode/
│   └── tasks.json                  # Tarea de VSCode para iniciar un servidor local
│
└── README.md                       # Este archivo: la documentación principal del proyecto


## 🚀 Cómo Empezar (Getting Started)

Puedes clonar este repositorio para explorar el código, experimentar o usarlo como base para tus propias publicaciones.

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/zarvent/25-escitalopram.git](https://github.com/zarvent/25-escitalopram.git)
    cd 25-escitalopram
    ```

2.  **Inicia un servidor local:**
    La forma más sencilla de servir los archivos localmente es utilizando el módulo `http.server` de Python.
    ```bash
    # Asegúrate de tener Python instalado
    python -m http.server 8000
    ```
    Si usas VSCode, puedes ejecutar la tarea preconfigurada `Servir Artículo Escitalopram` (Presiona `Ctrl+Shift+P` y busca `Tasks: Run Task`).

3.  **Abre en tu navegador:**
    Navega a la siguiente URL en tu navegador web:
    [`http://localhost:8000/`](http://localhost:8000/)

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Esto significa que eres libre de usar, modificar y distribuir el código, s
---

<div align="center">
  
</div>
