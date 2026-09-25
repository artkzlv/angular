import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { PluralPipe } from '../../../shared/pipes/plural.pipe';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { IMovie } from '../../../shared/models/movie.model';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { HttpService } from '../../../shared/services/http.service';
import { StoreService } from '../../../shared/services/store.service';
import { FiltersService } from '../../_layout/services/filters.service';

@Component({
  selector: 'app-favorites',
  imports: [CardComponent, PluralPipe, ButtonComponent, RouterLink],
  standalone: true,
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  private _storeService: StoreService = inject(StoreService);
  private _httpService: HttpService = inject(HttpService);
  private readonly _destroyRef = inject(DestroyRef);
  private _filtersService: FiltersService = inject(FiltersService);

  favoritesSignal: Signal<IMovie[] | undefined> = toSignal(
    this._storeService.getValueAsync('favorites')
  );

  ngOnInit(): void {
    this._filtersService.filters$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(filters => {
        this._httpService.loadByFilters(filters);
      });
  }
}
