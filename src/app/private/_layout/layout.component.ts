import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input';
import { FilterComponent } from '../../shared/components/filter/filter';
import { AppNavButtonComponent } from '../nav-button/nav-button';
import { IMenu, NAV_CONST } from '../const/menu-items.const';

@Component({
  selector: 'app-private-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterOutlet,
    AppNavButtonComponent,
    RouterLink,
    RouterLinkActive,
    InputComponent,
    FilterComponent,
  ],
})
export class PrivateLayoutComponent {
  navLinks: IMenu[] = NAV_CONST;
  selectedGenre = 'Комедия';
  filterGenres = [
    'Комедия',
    'Мелодрамма',
    'Фантастика',
    'Боевик',
    'Триллер',
    'Детектив',
  ];

  filterYears = ['2024', '2025', '2026'];
  selectedYear = '';

  onLogoutClick(): void {
    console.log('onLogoutClick');
  }

  onInputSearchChange($event: string) {
    console.log($event);
  }

  onYearChange(year: string) {
    this.selectedYear = year;
    console.log(year);
  }
}
