import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IMovie } from '../../../shared/models/movie.model';
import { FAVORITES } from '../../../shared/const/fake-favorites.const';
import { CardComponent } from '../../components/card/card.component';
import { PluralPipe } from '../../../shared/pipes/plural.pipe';
import { delay, Observable, of } from 'rxjs';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CardComponent, PluralPipe, ButtonComponent, RouterLink, AsyncPipe],
  standalone: true,
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  favorites$: Observable<IMovie[]> = of(FAVORITES).pipe(delay(1000));
}
