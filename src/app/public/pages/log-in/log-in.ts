import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [
    ButtonComponent,
    InputComponent,
    PasswordInputComponent,
    RouterLink,
  ],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogInComponent {
  onLoginBtnClick(): void {
    // this.router.navigate(['/private'], {
    //   queryParams: {
    //     from: 'auth',
    //   },
    // });
    console.log('btn clicked');
  }

  onInputChange($event: string) {
    console.log($event);
  }

  onPasswordInputChange($event: string) {
    console.log($event);
  }
}
