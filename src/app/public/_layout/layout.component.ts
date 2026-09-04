import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    ButtonComponent,
    InputComponent,
    PasswordInputComponent,
    NgOptimizedImage,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
})
export class PublicLayoutComponent {
  onBtnClick(): void {
    console.log('btn clicked');
  }

  onInputChange($event: string) {
    console.log($event);
  }

  onPasswordInputChange($event: string) {
    console.log($event);
  }
}
