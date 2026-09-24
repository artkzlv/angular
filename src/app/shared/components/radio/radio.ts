import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IGenre } from '../../const/genres.const';
import { ISort } from '../../const/fake-sort.const';

@Component({
  selector: 'app-radio',
  standalone: true,
  templateUrl: './radio.html',
  styleUrls: ['./radio.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  options = input<(IGenre | ISort)[]>([]);

  innerValue: string | null = null;
  disabled = false;

  private onModelChange: (value: string) => void = () => {
    /* empty */
  };
  onTouched: () => void = () => {
    /* empty */
  };

  writeValue(value: string | null): void {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(value: string): void {
    this.innerValue = value;
    this.onModelChange(value);
    this.onTouched();
  }
}
