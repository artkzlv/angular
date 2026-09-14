import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IMovie } from '../../../shared/models/movie.model';
import { FAVORITES } from '../../../shared/const/fake-favorites.const';
import { CardComponent } from '../../components/card/card.component';
import { PluralPipe } from '../../../shared/pipes/plural.pipe';

@Component({
  selector: 'app-favorites',
  imports: [CardComponent, PluralPipe],
  standalone: true,
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  favorites: IMovie[] = FAVORITES;
}
