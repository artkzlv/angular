import { inject, Injectable } from '@angular/core';
import { IMovie } from '../models/movie.model';
import { IGenre } from '../const/genres.const';
import { StoreService } from './store.service';
import { HttpClient } from '@angular/common/http';
import { IFilter } from '../models/filter.model';
import { filterAndSort } from '../utils/filterAndSort';
import { Router } from '@angular/router';

export interface IPagedResponse<T> {
  items: T[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class HttpService {
  private _store = inject(StoreService);
  private _http = inject(HttpClient);

  private _router = inject(Router);

  loadByFilters(filters: IFilter): void {
    if (this._router.url.includes('/favorites')) {
      this.loadFavorites(filters);
    } else {
      this.loadMovies(filters);
    }
  }

  loadMovies(filters: IFilter): void {
    const params = filterAndSort(filters);

    this._http
      .get<IPagedResponse<IMovie>>('http://localhost:3000/api/v1/movies', {
        params,
      })
      .subscribe({
        next: response => {
          const movies = filters.name
            ? response.items.filter(movie =>
                movie.title.toLowerCase().includes(filters.name.toLowerCase())
              )
            : response.items;

          this._store.updateData({ movies });
        },
        error: () => {
          alert('Не удалось загрузить фильмы');
        },
      });
  }

  loadGenres(): void {
    this._http.get<IGenre[]>('http://localhost:3000/api/v1/genres').subscribe({
      next: genres => {
        this._store.updateData({ genres });
      },
      error: () => {
        alert('Не удалось загрузить жанры');
      },
    });
  }

  loadFavorites(filters: IFilter): void {
    const params = filterAndSort(filters);

    this._http
      .get<IPagedResponse<IMovie>>('http://localhost:3000/api/v1/favorites', {
        params,
      })

      .subscribe({
        next: response => {
          this._store.updateData({
            favorites: response.items,
          });
        },
        error: () => {
          alert('Не удалось загрузить избранное');
        },
      });
  }
}
