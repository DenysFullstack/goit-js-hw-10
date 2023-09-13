import axios from 'axios';
import SlimSelect from 'slim-select'

axios.defaults.headers.common['x-api-key'] =
  'live_1NuflkvHe5UEH3sqKTw8yu41EpLIlEmEzyL3cypmYINhQESTegEfCuGLo138Hhfs';

const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');

select.addEventListener('click', fetchCatByBreed);

function fetchBreeds() {
  return fetch(
    'https://api.thecatapi.com/v1/breeds?api_key=live_1NuflkvHe5UEH3sqKTw8yu41EpLIlEmEzyL3cypmYINhQESTegEfCuGLo138Hhfs'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

fetchBreeds()
  .then(cats => {
    console.log(cats);
    renderCatsBreeds(cats);
    new SlimSelect({
      select: '.breed-select',
      data: cats
    })
  })
  .catch(err => console.log(err));

function renderCatsBreeds(cats) {
  const markup = cats
    .map(cat => {
      return `
        <option value='${cat.id}'>${cat.name}</option>
    `;
    })
    .join('');
  select.innerHTML = markup;
}

function fetchCatByBreed(e) {
  console.log(e.target.value);
  const CAT_API_INFO = `https://api.thecatapi.com/v1/images/search?breed_ids=${e.target.value}&api_key=live_1NuflkvHe5UEH3sqKTw8yu41EpLIlEmEzyL3cypmYINhQESTegEfCuGLo138Hhfs`;
  console.log(CAT_API_INFO);
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${e.target.value}&api_key=live_1NuflkvHe5UEH3sqKTw8yu41EpLIlEmEzyL3cypmYINhQESTegEfCuGLo138Hhfs`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(catBreedInfo => {
      console.log(catBreedInfo);
      catInfo.innerHTML = renderCatBreedInfo(catBreedInfo);
    })
    .catch(err => console.log(err));
}

function renderCatBreedInfo(arr) {
    return arr.map(({url, breeds}) => {
     return `
      <div>
        <img src="${url}" alt="${breeds[0].name}" width=300>
        <h2>${breeds[0].name}</h2>
        <p>${breeds[0].description}</p>
        <p>Temperament: ${breeds[0].temperament}</з>
      </div>
    `;
    })
    .join('');
}

// function fetchBreeds(){
//   const BASE_URL = 'https://api.thecatapi.com/v1'
//   const API_KEY = 'live_1NuflkvHe5UEH3sqKTw8yu41EpLIlEmEzyL3cypmYINhQESTegEfCuGLo138Hhfs'
//   return axios.get(
//     'https://api.thecatapi.com/v1/breeds?api_key=live_1NuflkvHe5UEH3sqKTw8yu41EpLIlEmEzyL3cypmYINhQESTegEfCuGLo138Hhfs')
// }