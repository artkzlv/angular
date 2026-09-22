import { inject, Injectable } from '@angular/core';
import { combineLatest, delay, map, Observable, of } from 'rxjs';
import { StoreService } from '../../../../shared/services/store.service';
import { IMovie } from '../../../../shared/models/movie.model';
import { FAVORITES } from '../../../../shared/const/fake-favorites.const';
import { filterAndSort } from '../../../../shared/utils/filterAndSort';

@Injectable()
export class FavoritesService {
  private _store: StoreService = inject(StoreService);

  readonly favorites$: Observable<IMovie[]> = combineLatest([
    this._store.getValueAsync('favorites'),
    this._store.getValueAsync('filters'),
  ]).pipe(map(([favorites, filters]) => filterAndSort(favorites, filters)));

  loadFavorites(): void {
    of(FAVORITES)
      .pipe(delay(1000))
      .subscribe(favorites => {
        this._store.updateData({ favorites });
      });
  }
}
