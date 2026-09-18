import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { InputComponent } from '../../shared/components/input/input';
import { AppNavButtonComponent } from '../nav-button/nav-button';
import { IMenu, NAV_CONST } from '../const/menu-items.const';
import { GENRES, IGenre } from '../../shared/const/genres.const';
import { YEARS } from '../../shared/const/fake-years.const';
import { RadioComponent } from '../../shared/components/radio/radio';
import { SelectComponent } from '../../shared/components/select/select';
import { ISort, SORT } from '../../shared/const/fake-sort.const';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { delay, filter, map, startWith, switchMap, tap } from 'rxjs';

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
    SelectComponent
  ],
})
export class PrivateLayoutComponent implements OnInit {
  private _titleService = inject(Title);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);

  title = signal<string>('');

  navLinks: IMenu[] = NAV_CONST;
  filterGenres: IGenre[] = GENRES;
  filterYears: string[] = YEARS;
  sorters: ISort[] = SORT;
  selectedGenreId = this.filterGenres[0].id;
  selectedYearFrom = this.filterYears[0];
  selectedYearTo = this.filterYears[0];
  sorterId: number | null = null;

  onLogoutClick(): void {
    console.log('onLogoutClick');
  }

  onYearFromChange(year: string) {
    this.selectedYearFrom = year;
    console.log(year);
  }

  onYearToChange(year: string) {
    this.selectedYearTo = year;
    console.log(year);
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

  searchValue = toSignal(
    this._activatedRoute.queryParamMap.pipe(map(v => v.get('q') ?? ''))
  );

  ngOnInit(): void {
    this._router.events
      .pipe(
        delay(100),
        tap(event => {
          if (event instanceof NavigationEnd) {
            this.title.set(this._titleService.getTitle());
          }
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  onInputSearchChange(q: string): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { q },
      queryParamsHandling: 'merge',
    });
  }
}
