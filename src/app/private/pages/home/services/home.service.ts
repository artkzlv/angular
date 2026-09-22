import { combineLatest, delay, map, Observable, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { StoreService } from '../../../../shared/services/store.service';
import { IMovie } from '../../../../shared/models/movie.model';
import { MOVIES } from '../../../../shared/const/fake-films.const';
import { filterAndSort } from '../../../../shared/utils/filterAndSort';

@Injectable()
export class HomeService {
  private _store: StoreService = inject(StoreService);

  readonly movies$: Observable<IMovie[]> = combineLatest([
    this._store.getValueAsync('movies'),
    this._store.getValueAsync('filters'),
  ]).pipe(map(([movies, filters]) => filterAndSort(movies, filters)));

  loadMovies(): void {
    of(MOVIES)
      .pipe(delay(1000))
      .subscribe(movies => {
        this._store.updateData({ movies });
      });
  }
}
