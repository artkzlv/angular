import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { IMovie } from '../../../shared/models/movie.model';
import { PluralPipe } from '../../../shared/pipes/plural.pipe';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FiltersService } from '../../_layout/services/filters.service';
import { IFilter } from '../../../shared/models/filter.model';
import { HttpService } from '../../../shared/services/http.service';
import { StoreService } from '../../../shared/services/store.service';

@Component({
  selector: 'app-home',
  imports: [CardComponent, PluralPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private _storeService: StoreService = inject(StoreService);
  private _filtersService: FiltersService = inject(FiltersService);
  private _httpService: HttpService = inject(HttpService);
  private readonly _destroyRef = inject(DestroyRef);

  moviesSignal: Signal<IMovie[] | undefined> = toSignal(
    this._storeService.getValueAsync('movies')
  );

  filters: Signal<IFilter | undefined> = toSignal(
    this._filtersService.filters$
  );

  ngOnInit(): void {
    this._filtersService.filters$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(filters => {
        this._httpService.loadByFilters(filters);
      });
  }
}
