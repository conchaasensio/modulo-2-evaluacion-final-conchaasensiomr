'use strict';

const showsSearchButton = document.querySelector('.js-search-button');

//Obtener los datos de la API

let shows = [];

const getDataFromApi = () => {
  fetch(`http://api.tvmaze.com/search/shows?q=girls`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const show = data[i];
        shows.push(show);
      }
      paintShows();
      console.log(shows);
    });
};
getDataFromApi();
//console.log(shows);

//catalog

const showsItems = document.querySelector('.js-shows-items');
const paintShows = () => {
  let codeHTML = '';
  for (const show of shows) {
    let imageUrl =
      show.show.image !== null
        ? show.show.image.medium
        : 'https://via.placeholder.com/150';

    codeHTML += `<article class="main__list--item js-shows-items">`;
    codeHTML += `<img src="${imageUrl}" alt="" />`; //evaluar condición de que si tiene contenido y si es null, ponga la url por defecto (ternario).
    codeHTML += `<p class="main__list--title">${show.show.name}</p>`;
    codeHTML += `</article class="main__list--item js-shows-items">`;
  }
  const showsItems = document.querySelector('.js-shows-items');
  showsItems.innerHTML = codeHTML;
  // console.log(showsItems);
};

getDataFromApi();

// events

const handleshowsSearchClick = () => {
  console.log('me han clickado');
};

showsSearchButton.addEventListener('click', handleshowsSearchClick);
