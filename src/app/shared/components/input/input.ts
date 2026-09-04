import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputComponent {
  @Input() iconUrl!: string | null;
  @Input() type: 'text' | 'email' = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() value = '';

  @Output()
  controlValue: EventEmitter<string> = new EventEmitter<string>();

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement)?.value;

    this.controlValue.emit(this.value);
  }
}
