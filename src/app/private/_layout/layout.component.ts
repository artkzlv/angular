import { Component, inject, OnInit, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { InputComponent } from '../../shared/components/input/input';
import { AppNavButtonComponent } from '../nav-button/nav-button';
import { IMenu, NAV_CONST } from '../const/menu-items.const';
import { IGenre } from '../../shared/const/genres.const';
import { YEARS } from '../../shared/const/fake-years.const';
import { RadioComponent } from '../../shared/components/radio/radio';
import { SelectComponent } from '../../shared/components/select/select';
import { ISort, SORT } from '../../shared/const/fake-sort.const';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith, switchMap } from 'rxjs';
import { TitleNavigationStrategy } from '../../shared/components/titleNavigationStrategy/titleNavigationStrategy';
import { FiltersService } from './services/filters.service';
import { IFilter } from '../../shared/models/filter.model';

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
    InputComponent,
    RadioComponent,
    SelectComponent,
  ],
  providers: [FiltersService],
})
export class PrivateLayoutComponent implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _titleStrategy = inject(TitleNavigationStrategy);
  private _filtersService: FiltersService = inject(FiltersService);

  title = this._titleStrategy.title;
  filterGenres: Signal<IGenre[] | undefined> = toSignal(
    this._filtersService.genres$
  );
  filters: Signal<IFilter | undefined> = toSignal(
    this._filtersService.filters$
  );

  navLinks: IMenu[] = NAV_CONST;
  filterYears: string[] = YEARS;
  sorters: ISort[] = SORT;

  onLogoutClick(): void {
    console.log('onLogoutClick');
  }

  onYearFromChange(year: string) {
    console.log(year);
    this._filtersService.setFilter('from', year);
  }

  onYearToChange(year: string) {
    console.log(year);
    this._filtersService.setFilter('to', year);
  }

  onGenreChange(genre: string | null): void {
    this._filtersService.setFilter('genre', genre);
  }

  onSortChange(sort: string | null): void {
    this._filtersService.setFilter('sort', sort as never);
  }

  isShowSearch = toSignal<boolean>(
    this._router.events.pipe(
      startWith(null),
      filter(e => e === null || e instanceof NavigationEnd),
      map(() => {
        let r: ActivatedRoute | null = this._activatedRoute;
        while (r?.firstChild) r = r.firstChild;
        return r!;
      }),
      switchMap(r => r['data']),
      map(v => v['isShowSearch'] ?? false)
    )
  );

  onInputSearchChange(q: string): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { q },
      queryParamsHandling: 'merge',
    });

    this._filtersService.setFilter('name', q);
  }

  ngOnInit(): void {
    this._filtersService.loadGenres();
  }
}
