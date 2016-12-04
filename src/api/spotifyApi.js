import 'whatwg-fetch';

export function search({filter, searchQuery}) {
  return get(`https://api.spotify.com/v1/search?type=${filter}&q=${searchQuery}&limit=10`);
}

export function get(url) {
  return fetch(url).then(onSuccess, onError);
}

function onSuccess(response) {
  if (response.status >= 400 && response.status < 600) {
    throw new Error(response.statusText);
  }

  return response.json();
}

function onError(error) {
  throw error;
}
