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
      }
      // paintShows();
    });
};
//console.log(shows);

const handleSetFavorite = (event) => {
  event.currentTarget.classList.add('selected');
};

//catalog

const showsItems = document.querySelector('.js-shows-list');
const paintShows = () => {
  let codeHTML = '';
  for (const show of shows) {
    let imageUrl =
      show.show.image !== null
        ? show.show.image.medium
        : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    codeHTML += `<li class="main__list--item js-shows-items">`;
    codeHTML += `<article>`;
    codeHTML += `<img src="${imageUrl}" alt="" />`; //evaluar condición de que si tiene contenido y si es null, ponga la url por defecto (ternario).
    codeHTML += `<p class="main__list--title">${show.show.name}</p>`;
    codeHTML += `</article>`;
    codeHTML += `</li>`;
  }
  const showsItems = document.querySelector('.js-shows-list');
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
