import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { IMovie } from '../models/movie.model';
import { IGenre } from '../const/genres.const';
import { IFilter } from '../models/filter.model';

export interface IAppStore {
  genres: IGenre[];
  movies: IMovie[];
  favorites: IMovie[];
  filters: IFilter;
}

export const STORE_DEFAULT_VALUE: IAppStore = {
  genres: [],
  movies: [],
  favorites: [],
  filters: {
    name: '',
    genre: '0',
    from: null,
    to: null,
    sort: 'name',
  },
};

@Injectable({ providedIn: 'root' })
export class StoreService {
  // Хранить
  private readonly _storeSubject = new BehaviorSubject<IAppStore>({
    ...STORE_DEFAULT_VALUE,
  });
  // Отдавать
  public getValue<K extends keyof IAppStore>(key: K): IAppStore[K] {
    return this._storeSubject.getValue()[key];
  }

  public getValueAsync<K extends keyof IAppStore>(
    key: K
  ): Observable<IAppStore[K]> {
    return this._storeSubject.asObservable().pipe(
      map(state => state[key]),
      distinctUntilChanged()
    );
  }

  public updateData(data: Partial<IAppStore>): void {
    this._storeSubject.next({
      ...this._storeSubject.getValue(),
      ...data,
    });
  }

  // Сохранять
  public setValue<K extends keyof IAppStore>(
    key: K,
    value: IAppStore[K]
  ): void {
    this._storeSubject.next({
      ...this._storeSubject.getValue(),
      [key]: value,
    });
  }
}
