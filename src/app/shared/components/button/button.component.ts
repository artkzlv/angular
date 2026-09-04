import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [FormsModule],
})
export class ButtonComponent {
  @Input() title = '';
  @Input() disabled = false;

  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();

  onBtnClick(): void {
    this.btnClick.emit();
  }
}
