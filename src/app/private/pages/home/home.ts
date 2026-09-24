import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { IMovie } from '../../../shared/models/movie.model';
import { PluralPipe } from '../../../shared/pipes/plural.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { HomeService } from './services/home.service';
import { FiltersService } from '../../_layout/services/filters.service';
import { IFilter } from '../../../shared/models/filter.model';

@Component({
  selector: 'app-home',
  imports: [CardComponent, PluralPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeService],
})
export class HomeComponent implements OnInit {
  private _homeService: HomeService = inject(HomeService);
  private _filtersService: FiltersService = inject(FiltersService);

  moviesSignal: Signal<IMovie[] | undefined> = toSignal(
    this._homeService.movies$
  );

  filters: Signal<IFilter | undefined> = toSignal(this._filtersService.filters$);

  ngOnInit(): void {
    this._homeService.loadMovies();
  }
}
