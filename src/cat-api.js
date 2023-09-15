
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

const BASE_URL = 'https://api.thecatapi.com/v1'
const API_KEY = 'live_1NuflkvHe5UEH3sqKTw8yu41EpLIlEmEzyL3cypmYINhQESTegEfCuGLo138Hhfs'

loader.classList.add('visually-hidden');

export function fetchBreeds() {
  loader.classList.remove('visually-hidden')
  select.classList.add('visually-hidden');
  return fetch(
    `${BASE_URL}/breeds?api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(catId) {
  loader.classList.remove('visually-hidden')
  catInfo.classList.add('visually-hidden');
  return fetch(
    `${BASE_URL}/images/search?breed_ids=${catId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// const CAT_API_INFO = `https://api.thecatapi.com/v1/images/search?breed_ids=${e.target.value}&api_key=live_1NuflkvHe5UEH3sqKTw8yu41EpLIlEmEzyL3cypmYINhQESTegEfCuGLo138Hhfs`;
// console.log(CAT_API_INFO);
// return fetch(
//   `https://api.thecatapi.com/v1/images/search?breed_ids=${e.target.value}&api_key=live_1NuflkvHe5UEH3sqKTw8yu41EpLIlEmEzyL3cypmYINhQESTegEfCuGLo138Hhfs`
// )
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   })