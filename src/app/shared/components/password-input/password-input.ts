import { Component, forwardRef, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export enum EPasswordInputIcons {
  Opened = 'icons/eye_opened.svg',
  Closed = 'icons/eye_closed.svg',
}

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  prefixIcon = input<string | null>(null);
  type = signal<'text' | 'password'>('password');
  placeholder = input('');

  innerValue = '';
  innerDisabled = false;

  buttonIcon = EPasswordInputIcons.Closed;

  onChange: (value: string) => void = () => {
    /* empty */
  };
  onTouched: () => void = () => {
    /* empty */
  };

  writeValue(value: string | null): void {
    this.innerValue = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.innerDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.innerValue = value;
    this.onChange(value);
    this.onTouched();
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
