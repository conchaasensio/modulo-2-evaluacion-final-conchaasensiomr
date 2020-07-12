'use strict';

const showsSearchButton = document.querySelector('.js-search-button');
let showNameInput = document.querySelector('.js-search-show');

//Obtener los datos de la API

let shows = [];
let favorites = [];

function getDataFromApi() {
  shows = [];
  return fetch(`http://api.tvmaze.com/search/shows?q=${showNameInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const show = data[i];
        shows.push(show);
        // paintShows();
      }
    });
}

//Favorites

// Añadir favorito a la lista
function handleSetFavorite(event) {
  event.currentTarget.classList.add('selected');
  const index = event.currentTarget.dataset.index;
  const newFavorite = shows[index];
  if (!favorites.includes(newFavorite)) {
    favorites.push(newFavorite);
    paintFavorite(newFavorite, index);
  }
  updateLocalStorage();
}

// Eliminar favorito de la lista

function handleRemoveFavorite(event) {
  const id = parseInt(event.currentTarget.id);
  const index = favorites.findIndex((favorite) => favorite.show.id === id);
  favorites.splice(index, 1);
  event.currentTarget.remove();
  updateLocalStorage();
}

const favoritesItems = document.querySelector('.js-favorites-items');
function paintFavorites() {
  favoritesItems.innerHTML = '';
  for (let index = 0; index < favorites.length; index++) {
    const favorite = favorites[index];
    paintFavorite(favorite, index);
  }
  // const favoritesItems = document.querySelector('.js-favorites-items'); la tengo declarada fuera, porque existe en HTML. So no existiera, tendría que declararla dentro de paintShows.
}
// Esto lo hacemos porque queremos no pintar todos los favoritos cuando añadimos uno, sino que sólo queremos pintar el último favorito. Esto sustituirá a paintFavorites.
function paintFavorite(favorite, index) {
  let imageUrl =
    favorite.show.image !== null
      ? favorite.show.image.medium
      : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  let div = document.querySelector('.js-favorites-items');
  let article = document.createElement('article');
  article.classList.add('main__favorites--item');
  article.dataset.index = index;
  article.id = favorite.show.id;
  div.appendChild(article);
  article.addEventListener('click', handleRemoveFavorite);
  let imageShow = document.createElement('img');
  imageShow.src = imageUrl;
  article.appendChild(imageShow);
  let showName = document.createElement('h3');
  showName.classList.add('main__list--title', 'js-favorites-name');
  showName.appendChild(document.createTextNode(favorite.show.name));
  article.appendChild(showName);

  // let codeHTML = `<article class="main__favorites--item js-favorites-items" data-index="${index}">`;
  // codeHTML += `<img src="${imageUrl}" alt="" />`; //evaluar condición de que si tiene contenido y si es null, ponga la url por defecto (ternario).
  // codeHTML += `<p class="main__list--title js-favorites-name">${favorite.show.name}</p>`;
  // codeHTML += `</article>`;
  // favoritesItems.innerHTML += codeHTML;
}

//catalog
const showsItems = document.querySelector('.js-shows-list');
function paintShows() {
  // let codeHTML = '';
  let section = document.querySelector('.js-shows-list');
  section.innerHTML = '';
  for (let index = 0; index < shows.length; index++) {
    const show = shows[index];
    let imageUrl =
      show.show.image !== null
        ? show.show.image.medium
        : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

    let article = document.createElement('article');
    article.classList.add('main__list--item', 'js-shows-items');
    article.dataset.index = index;
    if (isFavorite(show)) {
      article.classList.add('selected');
    }

    article.id = show.show.id;
    section.appendChild(article);

    let imageShow = document.createElement('img');
    imageShow.src = imageUrl;
    article.appendChild(imageShow);

    let showName = document.createElement('h3');
    showName.classList.add('main__list--name', 'js-list-name');
    showName.appendChild(document.createTextNode(show.show.name));
    article.appendChild(showName);

    // codeHTML += `<article class="main__list--item js-shows-items" data-index="${index}">`;
    // codeHTML += `<img src="${imageUrl}" alt="" />`; //evaluar condición de que si tiene contenido y si es null, ponga la url por defecto (ternario).
    // codeHTML += `<p class="main__list--name js-list-name">${show.show.name}</p>`;
    // codeHTML += `</article>`;
  }
  // const showsItems = document.querySelector('.js-shows-list'); la tengo declarada en la línea 54, porque existe en HTML. So no existiera, tendría que declararla dentro de paintShows.
  // showsItems.innerHTML = codeHTML;
  // console.log(showsItems);

  //listen events
  const showsItems = document.querySelectorAll('.js-shows-items');
  for (const showsItem of showsItems) {
    showsItem.addEventListener('click', handleSetFavorite);
  }
}
function isFavorite(show) {
  return (
    favorites.find((favorite) => favorite.show.id === show.show.id) !==
    undefined
  );
}
// events

function handleshowsSearchClick() {
  getDataFromApi().then(() => paintShows());
}

showsSearchButton.addEventListener('click', handleshowsSearchClick);

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
}

buttonReset.addEventListener('click', resetFavorites);

getFromLocalStorage();
handleshowsSearchClick();
