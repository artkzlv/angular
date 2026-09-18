import {
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [FormsModule],
})
export class ButtonComponent {
  title = input('');
  disabled = input(false);

  btnClick = output();

  onBtnClick(): void {
    this.btnClick.emit();
  }
}
