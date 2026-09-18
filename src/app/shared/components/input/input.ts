import {
  Component,
  input,
  output
} from '@angular/core';
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
  iconUrl = input<string | null>(null);
  buttonIconUrl = input<string | null>(null);
  type = input<'text' | 'email'>('text');
  placeholder = input('');
  disabled = input(false);
  value = input('');

  controlValue = output<string>();

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value || '';

    this.controlValue.emit(value);
  }

  onButtonToggleClick(): void {
    console.log('searchButtonClick');
  }
}
