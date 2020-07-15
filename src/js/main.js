'use strict';

const showsSearchButton = document.querySelector('.js-search-button'); //Botón de búsqueda.
let showNameInput = document.querySelector('.js-search-show'); //Barra de búsqueda.

// Arrays
let shows = [];
let favorites = [];
// let languages = ['Spanish', 'English', 'German']; //Para la pregunta del idioma.

// Función manejadora del evento que escucha el click al buscar y evento que se produce al hacer click.
function handleshowsSearchClick() {
  //De esta forma queda más claro que leo los datos y una vez los he leído, pinto.
  getDataFromApi().then(() => paintShows()); //Aquí estoy ejecutando la función para obterner los datos de la API y una vez tenga la respuesta, me pinte los objetos contenidos en el array shows.
} //Puedo encadenar el .then al getDataFromApi porque en esta función devuelve la promesa del fetch con el return.
showsSearchButton.addEventListener('click', handleshowsSearchClick); //Evento que ejecuta la función manejadora.

//Obtener los datos de la API
function getDataFromApi() {
  event.preventDefault(); //Lo pongo para que al hacer click en buscar, no envíe el formulario.
  shows = []; //Al principio, para que cada vez que pregunte no añada más series, sino que empiece la búsqueda de 0.
  return fetch(`http://api.tvmaze.com/search/shows?q=${showNameInput.value}`) //Aquí le especificamos que la serie que tiene que buscar es la que escribimos en el cuadro de búsqueda.
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        //Bucle para recorrer el array con los datos que hemos obtenido del json.
        const show = data[i]; //Variable en la que guardo la información referente a cada elemento del array.
        shows.push(show); //Con push, incluyo cada uno de los elementos al array.
      }
    }) //.then(() => paintShows()) Esto sería si no lo tuviera en handleShowClick(). También podría poner el paintshows fuera del for (sin el .then).
    .catch((error) => {
      //Para localizar errores en la petición al servidor.
      console.log(error);
    });
}

// ***** CATÁLOGO DE SERIES *****

//Pintamos el catálogo
const showsItems = document.querySelector('.js-shows-list'); //Ul que contiene cada uno de los lis con los artículos en los que se pintan las series que aparecen tras la búsqueda.
const msgNoResults = document.querySelector('.msg-no-results'); //Contenido del mensaje que aparece cuando no se encuentran resultados.
function paintShows() {
  //Función que ejecuto para pintar los resultados de la búsqueda.
  let ul = showsItems;
  ul.innerHTML = ''; //String vacío porque así limpiamos y no se repiten.
  if (shows.length > 0) {
    msgNoResults.classList.add('msg-no-results--hidden');
    for (let index = 0; index < shows.length; index++) {
      //Bucle para recorrer el array shows.
      const show = shows[index];
      let imageUrl =
        show.show.image !== null //Si el elemento que recibimos desde el json tiene imagen:
          ? show.show.image.medium //enseña la imagen que especifico aquí.
          : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'; //Si no tiene, me muestra la que le indico en este enlace.

      let li = document.createElement('li');
      ul.appendChild(li);

      let article = document.createElement('article');
      article.classList.add('main__list--item', 'js-shows-items');
      article.dataset.index = index; //Incluyo el dato del índice en el DOM mediante dataset.
      if (isFavorite(show)) {
        //Con esto le estoy diciendo que al artículo, al pintarlo, le añada la clase "selected" si se trata de un favorito (le cambia el color de fondo). Ejecuto la función isFavorite.
        article.classList.add('selected');
      }

      article.id = show.show.id; //Le añado el dato del id al DOM para después poderlo utilizar.
      li.appendChild(article);
      article.addEventListener('click', handleSetFavorite); //Añadimos un evento para que al clickar en el artículo, lo selecciono como favorito, al ejecutarse la función handleSetFavorite.

      let imageShow = document.createElement('img');
      imageShow.src = imageUrl;
      article.appendChild(imageShow);

      let showName = document.createElement('h3');
      showName.classList.add('main__list--name', 'js-list-name');
      showName.appendChild(document.createTextNode(show.show.name));
      // showName.appendChild(document.createTextNode(show.show.language)); Para la pregunta del idioma.
      // if (languages.includes(show.show.language)) {
      //   showName.appendChild(document.createTextNode(' Recomendada'));
      // }
      //¿Se podría hacer con ternario?

      article.appendChild(showName);
    }
  } else {
    msgNoResults.classList.remove('msg-no-results--hidden');
  }
}

//Función para determinar si una serie es favorita.
function isFavorite(show) {
  //Le paso como parámetro show.
  return (
    favorites.find((favorite) => favorite.show.id === show.show.id) !==
    undefined //Busca en favoritos si hay algún favorito que tenga el mismo id del show que le estamos pasando.
  ); //Le pido que busque si la serie está en favoritos y me devuelva si es true o false.
}

// ***** FAVORITOS *****

// Pintamos los favoritos
const favoritesItems = document.querySelector('.js-favorites-list'); //la tengo declarada fuera, porque existe en HTML. So no existiera, tendría que declararla dentro de paintShows.
function paintFavorites() {
  favoritesItems.innerHTML = ''; //Limpiamos los favoritos antes de pintarlos, para que no se repitan.
  for (let index = 0; index < favorites.length; index++) {
    const favorite = favorites[index];
    paintFavorite(favorite, index);
  }
}

// Esto lo hacemos porque queremos no pintar todos los favoritos cuando añadimos uno, sino que sólo queremos pintar el último favorito. Esto sustituirá a paintFavorites.
function paintFavorite(favorite, index) {
  let imageUrl =
    favorite.show.image !== null
      ? favorite.show.image.medium
      : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

  let ul = document.querySelector('.js-favorites-list');
  let li = document.createElement('li');
  li.classList.add('main__favorites--list', 'js-favorites-items');
  ul.appendChild(li);

  li.id = favorite.show.id;

  let article = document.createElement('article');
  article.classList.add('main__favorites--item');
  article.dataset.index = index;
  li.appendChild(article);

  let imageShow = document.createElement('img');
  imageShow.src = imageUrl;
  article.appendChild(imageShow);

  let showName = document.createElement('h3');
  showName.classList.add('main__list--title', 'js-favorites-name');
  showName.appendChild(document.createTextNode(favorite.show.name));
  article.appendChild(showName);

  let removeButton = document.createElement('button');
  removeButton.classList.add('remove__button', 'js-remove-button');
  removeButton.innerHTML = 'X';
  removeButton.dataset.id = favorite.show.id;
  article.appendChild(removeButton);
  removeButton.addEventListener('click', handleRemoveFavorite); //Evento del botón X para eliminar favoritos.
}

// Añadir favorito a la lista
function handleSetFavorite(event) {
  //Función manejadora para seleccionar como favorito.
  event.currentTarget.classList.add('selected'); //Al event.currentTarget, que es el artículo, le añadirá la clase selected para cambiar el fondo.
  const index = event.currentTarget.dataset.index;
  const newFavorite = shows[index];
  if (!isFavorite(newFavorite)) {
    favorites.push(newFavorite); //Le decimos que si no es favorita, que la añada como nuevo favorito.
    paintFavorite(newFavorite, index); //Y que la pinte.
    //paintFavorites(); // Si hiciéramos esto, habría un parpadeo en los favoritos
  } else {
    removeFavorite(parseInt(event.currentTarget.id)); //Cuando pinchamos una segunda vez sobre la serie, si ya estaba marcada como favorita, la elimina de favoritos.
  }
  updateLocalStorage(); //Guardamos la información en localStorage.
}

// Eliminar favorito de la lista
function handleRemoveFavorite(event) {
  //Función manejadora para eliminar de favoritos con el botón X.
  const id = parseInt(event.currentTarget.dataset.id);
  removeFavorite(id);
}

function removeFavorite(id) {
  //Función que se ejecuta al llamar a la función manejadora para eliminar favorito.
  const index = favorites.findIndex((favorite) => favorite.show.id === id); //Busca cuál es el índice en el que está y lo borramos con splice.
  favorites.splice(index, 1);
  updateLocalStorage(); //Siempre que cambiamos favoritos, actualizamos localStorage.
  const favoritesItems = document.querySelectorAll('.js-favorites-items');
  for (const favoritesItem of favoritesItems) {
    if (id === parseInt(favoritesItem.id)) {
      //Recorre la lista de elementos favoritos y cuando encuentra el id que le hemos pasado en la lista de favoritos, lo borra.
      favoritesItem.remove(); //Borra el elemento del HTML.
    }
  }

  const showsItems = document.querySelectorAll('.js-shows-items'); //Con esto le quito el fondo de favoritos en la parte de la derecha (series).
  for (const showsItem of showsItems) {
    if (id === parseInt(showsItem.id)) {
      showsItem.classList.remove('selected');
    }
  }
}

// Local storage
function updateLocalStorage() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function getFromLocalStorage() {
  // favorites = JSON.parse(localStorage.getItem('favorites'))
  //   ? JSON.parse(localStorage.getItem('favorites'))
  //   : [];
  favorites = JSON.parse(localStorage.getItem('favorites')) ?? []; //Si hay algo en el localStorage, recuperamos la información y pone eso; si no, el array vacío.
  paintFavorites(); //Como es la primera vez que los estoy leyendo, los leo y los pinto.
}

// Reset;
const buttonReset = document.querySelector('.js-reset-button');
function resetFavorites() {
  favorites = [];
  updateLocalStorage(); //Cada vez que cambiemos los favoritos, recargamos el localStorage.
  paintFavorites(); //Repintamos los favoritos para que desaparezcan los que han sido borrados.
  const showsItems = document.querySelectorAll('.js-shows-items');
  for (const showsItem of showsItems) {
    showsItem.classList.remove('selected');
  }
}

buttonReset.addEventListener('click', resetFavorites);

// Botón log
// const buttonLog = document.querySelector('#btn-log');
// function getLogFavorites() {
//   for (let favorite of favorites) {
//     console.log(favorite.show.name);
//   }
// }
// buttonLog.addEventListener('click', getLogFavorites);

// Botón log con DOM
// const buttonLog = document.createElement('button');
// let section = document.querySelector('.page__left--section');
// buttonLog.classList.add('js-btn-log');
// buttonLog.appendChild(document.createTextNode('Log'));
// section.appendChild(buttonLog);
// function getLogFavorites() {
//   for (let favorite of favorites) {
//     console.log(favorite.show.name);
//   }
// }
// buttonLog.addEventListener('click', getLogFavorites);

// Al arrancar la página
getFromLocalStorage();
