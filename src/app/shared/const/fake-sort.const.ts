export interface ISort {
  id: string;
  name: string;
  fieldName: string;
}

export const SORT: ISort[] = [
  { id: 'genreIds', name: 'По жанру', fieldName: 'genreIds' },
  { id: 'title', name: 'По названию', fieldName: 'title' },
  { id: 'rating', name: 'По рейтингу', fieldName: 'rating' },
];
