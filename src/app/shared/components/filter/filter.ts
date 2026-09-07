import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadioComponent } from '../radio/radio';
import { SelectComponent } from '../select/select';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [RadioComponent, SelectComponent],
  templateUrl: './filter.html',
  styleUrls: ['./filter.scss'],
})
export class FilterComponent {
  @Input() type: 'radio' | 'select' = 'radio';
  @Input() title = '';
  @Input() value = '';
  @Input() filterItems: string[] = [];

  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string) {
    this.valueChange.emit(value);
  }
}
