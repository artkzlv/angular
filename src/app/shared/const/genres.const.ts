export interface IGenre {
  /** Уникальный id жанра */
  id: number;
  /** Отображаемое имя */
  name: string;
  /** slug для URL/фильтров */
  slug?: string;
}

export const GENRES: IGenre[] = [
  { id: 0, name: 'Все', slug: 'all' },
  { id: 1, name: 'Мелодрама', slug: 'melodrama' },
  { id: 2, name: 'Фантастика', slug: 'fantasy' },
  { id: 3, name: 'Боевик', slug: 'action' },
  { id: 4, name: 'Триллер', slug: 'thriller' },
  { id: 5, name: 'Детектив', slug: 'detective' },
];
