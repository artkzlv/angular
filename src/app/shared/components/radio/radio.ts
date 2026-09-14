import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGenre } from '../../const/genres.const';
import { ISort } from '../../const/fake-sort.const';

@Component({
  selector: 'app-radio',
  standalone: true,
  templateUrl: './radio.html',
  styleUrls: ['./radio.scss'],
})
export class RadioComponent {
  @Input() options: (IGenre | ISort)[] = [];
  @Input() value: number | null = null;

  @Output() valueChange = new EventEmitter<number>();

  onChange(value: number) {
    this.valueChange.emit(value);
  }
}
