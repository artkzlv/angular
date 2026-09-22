import { inject, Injectable } from '@angular/core';
import { delay,  Observable, of } from 'rxjs';
import { GENRES, IGenre } from '../../../shared/const/genres.const';
import { IFilter } from '../../../shared/models/filter.model';
import { StoreService } from '../../../shared/services/store.service';

@Injectable()
export class FiltersService {
  private _store: StoreService = inject(StoreService);
  readonly genres$: Observable<IGenre[]> = this._store.getValueAsync('genres');
  readonly filters$: Observable<IFilter> = this._store.getValueAsync('filters');

  setFilter<K extends keyof IFilter>(key: K, value: IFilter[K]): void {
    const filters = this._store.getValue('filters');

    this._store.setValue('filters', {
      ...filters,
      [key]: value,
    });
  }

  loadGenres(): void {
    of(GENRES)
      .pipe(delay(1000))
      .subscribe(genres => {
        this._store.updateData({ genres });
      });
  }
}
