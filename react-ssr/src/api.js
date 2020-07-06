export const getFilms = async value => {
  return await fetch(`http://www.omdbapi.com/?apikey=dfe6d885&s=${value}`)
    .then(response => response.json())
    .then(data => {
      if (!data.Search) return [];

      return data.Search;
    })
};
