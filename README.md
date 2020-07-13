
# Ejercicio de evaluación final del Módulo 2 de Adalab: Buscador de series.

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite des/marcar las series como favoritas y guardarlas en local storage.

## Hitos del ejercicio

1. **Estructura básica**   
   La aplicación de búsqueda de series consta de dos partes:
   1. Un campo de texto y un botón para buscar series por su título.
   2. Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.   
2. **Búsqueda**   
   - Al hacer click sobre el botón de **Buscar**, la aplicación debe conectarse al [API abierto de TVMaze para búsqueda de series](http://www.tvmaze.com/api#show-search).
   - Para construir la URL de búsqueda, hay que recoger el texto que ha introducido la ususaria en el campo de búsqueda.
   - Por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos una imagen de la serie y el título.
   - Algunas de las series que devuelve el API no tienen imagen. EN ese caso, hay que mostrar una imagen de relleno.
   - Para pintar la información en la página se puede elegir entre hacerlo de forma básica con innerHTML o manipulando de forma avanzada el DOM.
3. **Favoritos**
   Una vez aparecen los resultados de búsqueda, la ususaria puede indicar cuáles son sus series favoritas. para ello, al hacer click sobre una serie, debe pasar lo siguiente:
   - El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.
   - Hay que mostrar un listado en la parte izquerda de la pantalla, debajo del formulario de búsqueda, con las series favoritas.
   - Las series favoritas deben seguir apareciendo a la izquerda aunque la usuaria realice otra búsqueda.
4. **Almacenamiento local**
   Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página, el listado de favoritos debe mostrarse.
5. **BONUS: Borrar favoritos**
   Como bonus, se propone la opción de borrar favoritos. Al hacer click sobre el icono de una "X" al lado de cada favorito, hay que borrar el favorito clickado de la lista y del local storage.
   Para terminar de rematar nuestra App de series, nos gustaría poder añadir/quitar como favorito al hacer click sobre una serie del lado de la derecha. Si relaizamos una nueva búsqueda y sale una serie que ya es favorita, aparezca ya resaltada en los resultados de búsqueda.
   Por último, sería fantástico si al final de la lista de favoritos hubiera un botón para borrar todos los favoritos a la vez.
6. **BONUS: Afinar la maquetación**
   Una vez terminada la parte de interacción, nos podemos centrar en la parte de maquetación.

## Adalab Starter Kit

Este ejercicio lo he realizado utilizando el Starter Kit creado en **node y gulp**. ¿Y qué es un Starter kit? Pues es una **plantilla de proyecto con funcionalidades preinstaladas y preconfiguradas**.

Este Kit incluye un motor de plantillas HTML, el preprocesador SASS y un servidor local y muchas cosas más. El Kit nos ayuda a trabajar más cómodamente, nos automatiza tareas.

En el Kit hay 3 tipos de ficheros y carpetas:

- Los ficheros que están sueltos en la raíz del repositorio, como gulpfile.js, package.json... Son la configuración del proyecto y no necesitamos modificarlos.
- La carpeta `src/`: son los ficheros de nuestra página web, como HTML, CSS, JS...
- Las carpetas `public/` y `docs/`, que son generadas automáticamente cuando arrancamos el proyecto. El Kit lee los ficheros que hay dentro de `src/`, los procesa y los genera dentro de `public/` y `docs/`.

## Guía de inicio rápido

> **NOTA:** Necesitas tener instalado [Node JS](https://nodejs.org/) para trabajar con este Starter Kit:

### Pasos a seguir cada vez que queremos arrancar un proyecto desde cero:

1. **Crea tu propio repositorio.**
1. Descarga este **Starter kit desde GitHub**.
   - No recomendamos que clones este repo ya que no podrás añadir commits.
1. **Copia todos los ficheros** de este Starter kit en la carpeta raíz de tu repositorio.
   - Recuerda que debes copiar **también los ficheros ocultos**.
   - Si has decidido clonar este repo, no debes copiar la carpeta `.git`. Si lo haces estarás machacando tu propio repositorio.
1. **Abre una terminal** en la carpeta raíz de tu repositorio.
1. **Instala las dependencias** locales ejecutando en la terminal el comando:

```bash
npm install
```

### Pasos para arrancar el proyecto:

Una vez hemos instalado las dependencias, vamos a arrancar el proyecto. **El proyecto hay que arrancarlo cada vez que te pongas a programar.** Para ello ejecuta el comando:

```bash
npm start
```

Este comando:

- **Abre una ventana de Chrome y muestra tu página web**, al igual que hace el plugin de VS Code Live Server (Go live).
- También **observa** todos los ficheros que hay dentro de la carpeta `src/`, para que cada vez que modifiques un fichero **refresca tu página en Chrome**.
- También **procesa los ficheros** HTML, SASS / CSS y JS y los **genera y guarda en la carpeta `public/`**. Por ejemplo:
   - Convierte los ficheros SASS en CSS.
   - Combina los diferentes ficheros de HTML y los agrupa en uno o varios ficheros HTML.

Después de ejecutar `npm start` ya puedes empezar a editar todos los ficheros que están dentro de la carpeta `src/` y programar cómodamente.

### Pasos para publicar el proyecto en GitHub Pages:

Para generar tu página para producción ejecuta el comando:

```bash
npm run docs
```

Y a continuación:

1. Sube a tu repo la carpeta `docs/` que se te acaba de generar.
1. Entra en la pestaña `settings` de tu repo.
1. Y en el apartado de GitHub Pages activa la opción **master branch /docs folder**.
1. Y ya estaría!!!

Además, los comandos:

```bash
npm run push-docs
```
o

```bash
npm run deploy
```

son un atajo que nos genera la versión de producción y hace push de la carpeta `docs/` del tirón. Te recomendamos ver el fichero `package.json` para aprender cómo funciona.

## Flujo de archivos con Gulp

Estas tareas de Gulp producen el siguiente flujo de archivos:

![Gulp flow](./gulp-flow.png)

## `gulpfile.js` y `config.json`

Nuestro **gulpfile.js** usa el fichero `config.json` de configuración con las rutas de los archivos a generar / observar.

De esta manera separarmos las acciones que están en `gulpfile.js` de la configuración de las acciones que están en `config.json`.

## Estructura de carpetas

La estructura de carpetas tiene esta pinta:

```
src
 ├─ api // los ficheros de esta carpeta se copian en public/api/
 |  └─ data.json
 ├─ images
 |  └─ logo.jpg
 ├─ js // los ficheros de esta carpeta se concatenan en el fichero main.js y este se guarda en public/main.js
 |  ├─ main.js
 |  └─ events.js
 ├─ scss
 |  ├─ components
 |  ├─ core
 |  ├─ layout
 |  └─ pages
 └─ html
    └─ partials
```

> **NOTA:** Los partials de HTML y SASS del proyecto son orientativos. Te recomendamos usar los que quieras, y borrar los que no uses.


