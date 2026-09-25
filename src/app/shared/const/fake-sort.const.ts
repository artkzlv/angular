export interface ISort {
  id: string;
  name: string;
  fieldName: string;
}

export const SORT: ISort[] = [
  { id: 'genre', name: 'По жанру', fieldName: 'genre' },
  { id: 'name', name: 'По названию', fieldName: 'name' },
  { id: 'rating', name: 'По рейтингу', fieldName: 'rating' },
];
