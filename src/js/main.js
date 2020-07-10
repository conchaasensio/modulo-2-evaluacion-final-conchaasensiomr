'use strict';

//api

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
    });
};
getDataFromApi();
console.log(shows);

//catalog

const showsItems = document.querySelector('.js-shows-items');
const paintShows = () => {
  let codeHTML = '';
  for (const show of shows) {
    codeHTML += `<article class="main__list--item js-shows-items">`;
    codeHTML += `<img src="${show.show.image.medium}" alt="" />`;
    codeHTML += `<p class="main__list--title">${show.show.name}</p>`;
    codeHTML += `</article class="main__list--item js-shows-items">`;
  }
  const showsItems = document.querySelector('.js-shows-items');
  showsItems.innerHTML = codeHTML;
};
