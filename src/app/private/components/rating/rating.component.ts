import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="rating"
      [attr.aria-label]="'Rating ' + value() + ' of ' + max()">
      @for (i of stars(); track $index) {
        <span class="star" [style.--fill]="fill(i)" aria-hidden="true">
          <img
            priority
            ngSrc="icons/star.svg"
            width="24"
            height="24"
            alt="star" />
        </span>
      }
    </div>
  `,
  styles: [],
})
export class RatingComponent {
  // signal inputs
  value = input<number>(0); // например 4.3
  max = input<number>(5); // количество звёзд

  // массив индексов звёзд
  stars = computed(() => Array.from({ length: this.max() }, (_, i) => i));

  // 1 = заполнен, 0 = пустая, дробное = частично (под CSS через --fill)
  fill(i: number): number {
    const v = this.value();
    if (v >= i + 1) return 1;
    if (v <= i) return 0;
    return v - i;
  }
}
