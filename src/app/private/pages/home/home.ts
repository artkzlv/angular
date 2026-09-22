import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { IMovie } from '../../../shared/models/movie.model';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PluralPipe } from '../../../shared/pipes/plural.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { HomeService } from './services/home.service';

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
  private _activatedRoute = inject(ActivatedRoute);
  private _homeService: HomeService = inject(HomeService);

  moviesSignal: Signal<IMovie[] | undefined> = toSignal(
    this._homeService.movies$
  );

  searchQuery = toSignal(
    this._activatedRoute.queryParamMap.pipe(
      map(params => (params.get('q') ?? '').trim().toLowerCase())
    ),
    {
      initialValue: '',
    }
  );

  ngOnInit(): void {
    this._homeService.loadMovies();
  }
}
