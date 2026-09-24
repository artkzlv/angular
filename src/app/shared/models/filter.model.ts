export interface IFilter {
  name: string;
  genre: string | null;
  from: string | null;
  to: string | null;
  sort: 'genreIds' | 'title' | 'rating' | null;
}
