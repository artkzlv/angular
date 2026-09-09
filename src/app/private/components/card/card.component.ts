import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IMovie } from '../../../shared/models/movie.model';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [NgOptimizedImage, RatingComponent],
})
export class CardComponent {
  @Input() data: IMovie | null = null;

  onClick($event: PointerEvent) {
    console.log('favoriteClick', $event);
  }
}
