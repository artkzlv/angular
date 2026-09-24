import { IMovie } from '../models/movie.model';
import { IFilter } from '../models/filter.model';

export const filterAndSort = (movies: IMovie[], filters: IFilter, skipNameFilter?: boolean) => {
  const filteredMovies = movies.filter(
    movie =>
      (skipNameFilter ||
        !filters.name ||
        movie.title.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!Number(filters.genre) ||
        movie.genreIds.includes(Number(filters.genre))) &&
      (!filters.from ||
        filters.from === 'Все' ||
        movie.releaseYear >= Number(filters.from)) &&
      (!filters.to ||
        filters.to === 'Все' ||
        movie.releaseYear <= Number(filters.to))
  );

  return [...filteredMovies].sort((a, b) => {
    const field = filters.sort;

    if (field === 'genreIds') {
      return a.genreIds[0] - b.genreIds[0];
    }

    if (field === 'title') {
      return a.title.localeCompare(b.title);
    }

    return b.rating - a.rating;
  });
};
