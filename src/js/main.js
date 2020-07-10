'use strict';

const showsSearchButton = document.querySelector('.js-search-button');
let showNameInput = document.querySelector('.js-search-show');

//Obtener los datos de la API

let shows = [];
let favorites = [];

const getDataFromApi = () => {
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
};

//Favorites

const handleSetFavorite = (event) => {
  event.currentTarget.classList.add('selected');
  const newFavorite = shows[event.currentTarget.dataset.index];
  if (!favorites.includes(newFavorite)) {
    favorites.push(newFavorite);
    paintFavorites();
  }
};

const favoritesItems = document.querySelector('.js-favorites-items');
const paintFavorites = () => {
  favoritesItems.innerHTML = '';
  for (let index = 0; index < favorites.length; index++) {
    const favorite = favorites[index];
    let imageUrl =
      favorite.show.image !== null
        ? favorite.show.image.medium
        : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    let codeHTML = `<li class="main__favorites--item js-favorites-items" data-index="${index}">`;
    codeHTML += `<article>`;
    codeHTML += `<img src="${imageUrl}" alt="" />`; //evaluar condición de que si tiene contenido y si es null, ponga la url por defecto (ternario).
    codeHTML += `<p class="main__list--title js-favorites-name">${favorite.show.name}</p>`;
    codeHTML += `</article>`;
    codeHTML += `</li>`;
    favoritesItems.innerHTML += codeHTML;
  }
  // const favoritesItems = document.querySelector('.js-favorites-items'); la tengo declarada en la línea 54, porque existe en HTML. So no existiera, tendría que declararla dentro de paintShows.
};

//catalog

const showsItems = document.querySelector('.js-shows-list');
const paintShows = () => {
  let codeHTML = '';
  for (let index = 0; index < shows.length; index++) {
    const show = shows[index];
    let imageUrl =
      show.show.image !== null
        ? show.show.image.medium
        : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    codeHTML += `<li class="main__list--item js-shows-items" data-index="${index}">`;
    codeHTML += `<article>`;
    codeHTML += `<img src="${imageUrl}" alt="" />`; //evaluar condición de que si tiene contenido y si es null, ponga la url por defecto (ternario).
    codeHTML += `<p class="main__list--name js-list-name">${show.show.name}</p>`;
    codeHTML += `</article>`;
    codeHTML += `</li>`;
  }
  // const showsItems = document.querySelector('.js-shows-list'); la tengo declarada en la línea 54, porque existe en HTML. So no existiera, tendría que declararla dentro de paintShows.
  showsItems.innerHTML = codeHTML;
  // console.log(showsItems);
  //listen events
  const showsFavorites = document.querySelectorAll('.js-shows-items');
  for (const showsFavorite of showsFavorites) {
    showsFavorite.addEventListener('click', handleSetFavorite);
  }
};

// events

const handleshowsSearchClick = () => {
  getDataFromApi().then(() => paintShows());
};

showsSearchButton.addEventListener('click', handleshowsSearchClick);
handleshowsSearchClick();
