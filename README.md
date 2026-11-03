# Invitación de Diego y Gery

## Mesas y lugares

Editá `tableStatus` al inicio de `src/App.jsx`. Por ejemplo:

```js
const tableStatus = [
  { name: 'Mesa 1', capacity: 8, occupied: 5 },
  { name: 'Mesa 2', capacity: 10, occupied: 7 },
];
```

La página calcula automáticamente cantidad de mesas, lugares ocupados y lugares disponibles.

## Fotos de los invitados

Pegá el enlace compartido de la carpeta de Drive en `googleDriveFolderUrl` al inicio de `src/App.jsx`. El botón “Subir fotos” abrirá esa carpeta para que los invitados agreguen sus imágenes allí. Configurá el acceso de la carpeta para que los invitados tengan permiso de carga; Drive puede pedirles iniciar sesión con Google.
