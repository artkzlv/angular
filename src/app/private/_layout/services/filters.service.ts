import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGenre } from '../../../shared/const/genres.const';
import { IFilter } from '../../../shared/models/filter.model';
import { StoreService } from '../../../shared/services/store.service';

@Injectable()
export class FiltersService {
  private _store: StoreService = inject(StoreService);
  readonly genres$: Observable<IGenre[]> = this._store.getValueAsync('genres');
  readonly filters$: Observable<IFilter> = this._store.getValueAsync('filters');

  updateFilters(filters: Partial<IFilter>): void {
    const currentFilters = this._store.getValue('filters');

    this._store.setValue('filters', {
      ...currentFilters,
      ...filters,
    });
  }
}
