import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.html',
  styleUrls: ['./select.scss'],
})
export class SelectComponent {
  @Input() options: string[] = [];
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.valueChange.emit(value);
  }
}
