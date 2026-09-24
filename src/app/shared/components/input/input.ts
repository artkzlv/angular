import { Component, input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  prefixIcon = input<string | null>(null);
  postfixIcon = input<string | null>(null);
  type = input<'text' | 'email'>('text');
  placeholder = input('');
  disabled = input(false);

  innerValue = '';
  innerDisabled = false;

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
    console.log('postfixIconClick');
  }
}
