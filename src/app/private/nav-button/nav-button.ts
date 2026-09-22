import { Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive],
  templateUrl: './nav-button.html',
  styleUrls: ['./nav-button.scss'],
})
export class AppNavButtonComponent {
  text = input('');
  iconUrl = input('');
  iconUrlActive = input('');
  disabled = input(false);
  routerLink = input('');

  clicked = output<Event>();

  onClick(event: Event): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
