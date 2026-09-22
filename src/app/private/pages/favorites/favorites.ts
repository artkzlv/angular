import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { PluralPipe } from '../../../shared/pipes/plural.pipe';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { FavoritesService } from './services/favorites.service';
import { IMovie } from '../../../shared/models/movie.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-favorites',
  imports: [CardComponent, PluralPipe, ButtonComponent, RouterLink],
  standalone: true,
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FavoritesService],
})
export class FavoritesComponent implements OnInit {
  private _favoritesService: FavoritesService = inject(FavoritesService);

  favoritesSignal: Signal<IMovie[] | undefined> = toSignal(
    this._favoritesService.favorites$
  );

  ngOnInit(): void {
    this._favoritesService.loadFavorites();
  }
}
