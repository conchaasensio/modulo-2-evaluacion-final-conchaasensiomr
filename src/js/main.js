'use strict';

const showsSearchButton = document.querySelector('.js-search-button');
let showNameInput = document.querySelector('.js-search-show');

// Arrays
let shows = [];
let favorites = [];

// Función manejadora del evento que escucha el click al buscar y evento que se produce al hacer click.
function handleshowsSearchClick() {
  getDataFromApi().then(() => paintShows());
}
showsSearchButton.addEventListener('click', handleshowsSearchClick);

//Obtener los datos de la API
function getDataFromApi() {
  event.preventDefault();
  shows = [];
  return fetch(`http://api.tvmaze.com/search/shows?q=${showNameInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const show = data[i];
        shows.push(show);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// ***** CATÁLOGO DE SERIES *****

//Pintamos el catálogo
const showsItems = document.querySelector('.js-shows-list');
const msgNoResults = document.querySelector('.msg-no-results');
function paintShows() {
  let ul = showsItems;
  ul.innerHTML = '';
  if (shows.length > 0) {
    msgNoResults.classList.add('msg-no-results--hidden');
    for (let index = 0; index < shows.length; index++) {
      const show = shows[index];
      let imageUrl =
        show.show.image !== null
          ? show.show.image.medium
          : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

      let li = document.createElement('li');
      ul.appendChild(li);

      let article = document.createElement('article');
      article.classList.add('main__list--item', 'js-shows-items');
      article.dataset.index = index;
      if (isFavorite(show)) {
        article.classList.add('selected');
      }

      article.id = show.show.id;
      li.appendChild(article);
      article.addEventListener('click', handleSetFavorite);

      let imageShow = document.createElement('img');
      imageShow.src = imageUrl;
      article.appendChild(imageShow);

      let showName = document.createElement('h3');
      showName.classList.add('main__list--name', 'js-list-name');
      showName.appendChild(document.createTextNode(show.show.name));
      article.appendChild(showName);
    }
  } else {
    msgNoResults.classList.remove('msg-no-results--hidden');
  }
}

function isFavorite(show) {
  return (
    favorites.find((favorite) => favorite.show.id === show.show.id) !==
    undefined
  );
}

// ***** FAVORITES *****

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
  removeButton.addEventListener('click', handleRemoveFavorite);
}

// Añadir favorito a la lista

function handleSetFavorite(event) {
  event.currentTarget.classList.add('selected');
  const index = event.currentTarget.dataset.index;
  const newFavorite = shows[index];
  if (!isFavorite(newFavorite)) {
    favorites.push(newFavorite);
    paintFavorite(newFavorite, index);
  } else {
    removeFavorite(parseInt(event.currentTarget.id));
  }
  updateLocalStorage();
}

// Eliminar favorito de la lista

function handleRemoveFavorite(event) {
  const id = parseInt(event.currentTarget.dataset.id);
  removeFavorite(id);
}

function removeFavorite(id) {
  const index = favorites.findIndex((favorite) => favorite.show.id === id);
  favorites.splice(index, 1);
  updateLocalStorage();
  const favoritesItems = document.querySelectorAll('.js-favorites-items');
  for (const favoritesItem of favoritesItems) {
    if (id === parseInt(favoritesItem.id)) {
      favoritesItem.remove();
    }
  }

  const showsItems = document.querySelectorAll('.js-shows-items');
  for (const showsItem of showsItems) {
    if (id === parseInt(showsItem.id)) {
      showsItem.classList.remove('selected');
    }
  }
}

// events

// Local storage

function updateLocalStorage() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function getFromLocalStorage() {
  favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];
  paintFavorites();
}

// Reset;

const buttonReset = document.querySelector('.js-reset-button');
function resetFavorites() {
  favorites = [];
  updateLocalStorage();
  paintFavorites();
  const showsItems = document.querySelectorAll('.js-shows-items');
  for (const showsItem of showsItems) {
    showsItem.classList.remove('selected');
  }
}

buttonReset.addEventListener('click', resetFavorites);

getFromLocalStorage();
