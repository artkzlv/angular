export interface IMovie {
  /** Уникальный id фильма */
  id: string;
  /** Название фильма */
  title: string;
  /** Год выхода */
  releaseYear: number;
  /** Список жанров фильма (id из GENRES, кроме 'all') */
  genreIds: number[];
  /** Рейтинг в звёздах. Храним дробным, но рендерить округлённо в меньшую сторону */
  rating: number; // 0..5
  /** URL постера */
  posterUrl: string;
  /** Опционально: краткое описание/подзаголовок */
  description?: string;
  /** Опционально: длительность, страна и т.п. */
  durationMin?: number;
  /** Флаг избранного */
  isFavorite: boolean;
}
