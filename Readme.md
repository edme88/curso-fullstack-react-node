Forma de "compilar" y mantener junto el código de:
HTML + CSS + Js

React -> Es una librería/biblioteca, NO un framework. Por defecto tiene cierta libertad de cómo manejar ciertos recursos.
View
Angular -> Es un framework que ya ofrece ciertas herramientas. Es un marco de trabajo.
Astro

### React
Para crear interfaces de usuario.

Tiene 3 partes principales:
- Virtual DOM -> Comparativa del DOM original y del virtual, y renderizar solo los cambios
- Re-rendización eficiente
- Unidirectional Data Flow -> Se renderiza de padre a hijo

Para crear SPA - Single Page Application
Página de una sola vista.

El 14 de febrero de 2025 se dejo el soporte de "create react app"
Se propone por ejemplo crearla desde "vite".
Evita tener una estructura de archivos base demasiado grande (que para proyectos pequeños no tiene sentido)

### Crear un proyecto
```
npm create vite@latest directorio
```

Si en en el directorio donde estoy "parado":
```
npm create vite@latest .
```

### JSX
Lenguaje mezcla de HTML y Js.
Por eso es necesrio compilarlo.
Antes esto se hacía con "babel".
Se traduce, "transpila" a Js

Vite usa esbuild.


Dev-dependencies: Aquellas herramientas que se usan en la aplicación en instancia de desarrollo.
Dependencies: 

A nivel eficiencia cambia el dev-dependencies o dependencies? NO, es a nivel estructural.
Pero en el servidor donde se sube el proyecto, las dependencias ocuparan espacio.

### para crear directorios
mkdir components pages services store styles utils


#### El package-lock se sube?
Si se hace un "npm ci" se instalan las dependencias del package-lock....Así que si el proyecto por ejemplo usa automation, se suele subir

React es un árbol de componentes. Donde uno engloba a otros.


```
npm run dev
```

Hook!


gabialberini733@gmail.com

Repo de ejemplo:
https://github.com/GabrielAlberini/darwoft-react-node

