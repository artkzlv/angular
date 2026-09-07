import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.html',
  styleUrls: ['./radio.scss'],
})
export class RadioComponent {
  @Input() options: string[] = [];
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();

  onChange(value: string) {
    this.valueChange.emit(value);
  }
}
