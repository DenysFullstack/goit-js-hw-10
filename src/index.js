import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'
import Notiflix from 'notiflix';

const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './style.css';

loader.classList.add('visually-hidden');

select.addEventListener('change', onSearch);

fetchBreeds()
  .then(cats => {
    console.log(cats);
    const markup = cats
    .map(cat => {
        return `
            <option value='${cat.id}'>${cat.name}</option>
        `;
      })
      .join('');
    select.innerHTML = markup;
    new SlimSelect({
     select: select,
     settings: {
      placeholderText: 'Pease, choose the breed',
    },
    })
    loader.classList.add('visually-hidden')
    select.classList.remove('visually-hidden');
  })
  .catch(error => {
    console.log(error);
    loader.classList.add('visually-hidden');
    Notiflix.Notify.failure(
      `❌ Oops! Something went wrong! Try reloading the page!`
    );
  });

function onSearch(e) {
  const catId = e.target.value
  fetchCatByBreed(catId)
    .then(catBreedInfo => {
      catInfo.innerHTML = renderCatBreedInfo(catBreedInfo);
    })
    .catch(error => {
      console.log(error);
      loader.classList.add('visually-hidden');
      Notiflix.Notify.failure(
        `❌ Oops! Something went wrong! Try reloading the page!`
      );
    })
}

function renderCatBreedInfo(arr) {
  loader.classList.add('visually-hidden')
  catInfo.classList.remove('visually-hidden')
  return arr
    .map(({ url, breeds }) => {
      return `
      <div class="card-info">
        <img src="${url}" alt="${breeds[0].name}" width=300>
        <div class="breed-info">
        <h2>${breeds[0].name}</h2>
        <p>${breeds[0].description}</p>
        <p><b class="temp-text">Temperament:</b> ${breeds[0].temperament}.</p>
        </div>
      </div>
    `;
    })
    .join('');
}