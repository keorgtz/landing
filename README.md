# Keorsoft landing

Sitio estático en HTML, CSS y JavaScript. La página principal conserva su contenido de servicios y productos e incorpora temas claro/oscuro, una escena CSS 3D, paneles interactivos, proceso de trabajo y preguntas frecuentes.

## Desarrollo local

```sh
python3 -m http.server 4173
```

Abre `http://localhost:4173`. No se necesita compilación ni dependencias de producción. Las páginas de `REASP/` y `RACSP/` conservan sus estilos y scripts independientes.

- `css/Styles.css`: componentes y estilos originales.
- `css/experience.css`: temas, nueva composición, escena 3D y adaptación móvil.
- `js/theme.js`: aplica el tema antes del primer render; sigue al sistema hasta elegir una preferencia y la guarda cuando el almacenamiento está disponible.
- `js/main.js`: navegación, controles accesibles, animaciones y contacto.

Las animaciones respetan `prefers-reduced-motion`, pueden pausarse manualmente y se pausan al ocultar la pestaña. La escena y su terminal también se pausan fuera de pantalla. Los paneles son representaciones conceptuales, no datos de clientes ni telemetría real.

El formulario prepara un mensaje y abre WhatsApp para que la persona confirme el envío. No hay backend de correo ni confirmaciones de envío simuladas; los datos permanecen en el formulario y hay un enlace alternativo si se bloquea la nueva pestaña.

## Validación

Requiere Node.js 20 o posterior:

```sh
npm ci
npx playwright install chromium
npm test
```

Para utilizar un Chrome instalado, ejecuta `CHROME_PATH=/ruta/a/google-chrome npm test`. El servidor de pruebas se inicia y cierra automáticamente. Se comprueban temas y almacenamiento, menú móvil, pestañas y teclado, pausa y movimiento reducido, preparación de WhatsApp, enlaces locales, contenido sin JavaScript, accesibilidad con axe y tamaños de pantalla de 320 a 1920 px.

Para publicar basta con servir los archivos estáticos; `node_modules` y `tests` no son necesarios en el servidor.
