export interface ISort {
  id: number;
  name: string;
  fieldName: string;
}

export const SORT: ISort[] = [
  { id: 0, name: 'По жанру', fieldName: 'genreIds' },
  { id: 1, name: 'По названию', fieldName: 'title' },
  { id: 2, name: 'По рейтингу', fieldName: 'rating' },
];
