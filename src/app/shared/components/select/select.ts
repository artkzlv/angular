import {
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.html',
  styleUrls: ['./select.scss'],
})
export class SelectComponent {
  options = input<string[]>([]);
  value = input('');

  valueChange = output<string>();

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.valueChange.emit(value);
  }
}
