import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { IMovie } from '../../../shared/models/movie.model';
import { MOVIES } from '../../../shared/const/fake-films.const';
import { combineLatest, delay, map, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PluralPipe } from '../../../shared/pipes/plural.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CardComponent, PluralPipe, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  cards$: Observable<IMovie[]> = of(MOVIES).pipe(delay(1000));
  private _activatedRoute = inject(ActivatedRoute);

  filterCards$ = combineLatest([
    this.cards$,
    this._activatedRoute.queryParamMap.pipe(
      map(params => (params.get('q') ?? '').trim().toLowerCase())
    ),
  ]).pipe(
    map(([cards, query]) => ({
      cards: query
        ? cards.filter(
            card =>
              card.title.toLowerCase().includes(query) ||
              card.description?.toLowerCase().includes(query)
          )
        : cards,
      query,
    }))
  );
}
