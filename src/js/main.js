'use strict';

//Obtener los datos de la API

let shows = [];

const getDataFromApi = () => {
  fetch(`http://api.tvmaze.com/search/shows?q=game`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        //const show = data[i];
        shows.push(data[i]);
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
    codeHTML += `<article class="main__list--item js-shows-items">`;
    codeHTML += `<img src="${show.show.image.medium}" alt="" />`; //evaluar condición de que si tiene contenido y si es null, ponga la url por defecto (ternario).
    // show.show.image !== null
    //   ? img src="${show.show.image.medium}";
    //   : img src="https://via.placeholder.com/150C/O https://placeholder.com/";
    codeHTML += `<p class="main__list--title">${show.show.name}</p>`;
    codeHTML += `</article class="main__list--item js-shows-items">`;
  }
  const showsItems = document.querySelector('.js-shows-items');
  showsItems.innerHTML = codeHTML;
  // console.log(showsItems);
};
