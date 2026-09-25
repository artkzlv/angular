export interface IFilter {
  name: string;
  genre: string | null;
  from: string | null;
  to: string | null;
  sort: 'genre' | 'name' | 'rating' | null;
}
