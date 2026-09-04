import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() iconUrl!: string | null;
  @Input() type: 'text' | 'password' = 'password';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() value = '';

  @Output()
  controlValue: EventEmitter<string> = new EventEmitter<string>();

  buttonIcon = EPasswordInputIcons.Closed;

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement)?.value;

    this.controlValue.emit(this.value);
  }

  onButtonToggleClick(): void {
    if (this.type === 'password') {
      this.type = 'text';
      this.buttonIcon = EPasswordInputIcons.Opened;
    } else {
      this.type = 'password';
      this.buttonIcon = EPasswordInputIcons.Closed;
    }
  }
}
