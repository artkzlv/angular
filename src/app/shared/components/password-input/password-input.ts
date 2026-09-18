import {
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export enum EPasswordInputIcons {
  Opened = 'icons/eye_opened.svg',
  Closed = 'icons/eye_closed.svg',
}

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
})
export class PasswordInputComponent {
  iconUrl = input<string | null>(null);
  type = signal<'text' | 'password'>('password');
  placeholder = input('');
  disabled = input(false);
  value = input('');

  controlValue = output<string>();

  buttonIcon = EPasswordInputIcons.Closed;

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value || '';

    this.controlValue.emit(value);
  }

  onButtonToggleClick(): void {
    if (this.type() === 'password') {
      this.type.set('text');
      this.buttonIcon = EPasswordInputIcons.Opened;
    } else {
      this.type.set('password');
      this.buttonIcon = EPasswordInputIcons.Closed;
    }
  }
}
