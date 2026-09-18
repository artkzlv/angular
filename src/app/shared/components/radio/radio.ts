import {
  Component,
  input,
  output,
} from '@angular/core';
import { IGenre } from '../../const/genres.const';
import { ISort } from '../../const/fake-sort.const';

@Component({
  selector: 'app-radio',
  standalone: true,
  templateUrl: './radio.html',
  styleUrls: ['./radio.scss'],
})
export class RadioComponent {
  options = input<(IGenre | ISort)[]>([]);
  value = input<number | null>(null);

  valueChange = output<number>();

  onChange(value: number) {
    this.valueChange.emit(value);
  }
}
