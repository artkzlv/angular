import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input';
import { AppNavButtonComponent } from '../nav-button/nav-button';
import { IMenu, NAV_CONST } from '../const/menu-items.const';
import { GENRES, IGenre } from '../../shared/const/genres.const';
import { YEARS } from '../../shared/const/fake-years.const';
import { RadioComponent } from '../../shared/components/radio/radio';
import { SelectComponent } from '../../shared/components/select/select';
import { ISort, SORT } from '../../shared/const/fake-sort.const';

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
    RadioComponent,
    SelectComponent,
  ],
})
export class PrivateLayoutComponent {
  navLinks: IMenu[] = NAV_CONST;
  filterGenres: IGenre[] = GENRES;
  filterYears: string[] = YEARS;
  sorters: ISort[] = SORT;
  searchString = '';
  selectedGenreId = this.filterGenres[0].id;
  selectedYearFrom = this.filterYears[0];
  selectedYearTo = this.filterYears[0];
  sorterId: number | null = null;

  onLogoutClick(): void {
    console.log('onLogoutClick');
  }

  onInputSearchChange($event: string) {
    this.searchString = $event;
    console.log($event);
  }

  onYearFromChange(year: string) {
    this.selectedYearFrom = year;
    console.log(year);
  }

  onYearToChange(year: string) {
    this.selectedYearTo = year;
    console.log(year);
  }
}
