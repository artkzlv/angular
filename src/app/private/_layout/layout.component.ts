import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
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
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs';
import { FiltersService } from './services/filters.service';
import { IFilter } from '../../shared/models/filter.model';
import { TitleNavigationStrategy } from '../../shared/services/titleNavigationStrategy';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
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

  private readonly _destroyRef = inject(DestroyRef);

  filterForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    from: new FormControl<string | null>(null),
    to: new FormControl<string | null>(null),
    genre: new FormControl<string | null>(null),
    sort: new FormControl<'genreIds' | 'title' | 'rating'>('title'),
  });

    ngOnInit(): void {
        this._filtersService.loadGenres();

        this._filtersService.filters$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(filters => {
                this.filterForm.patchValue(filters, { emitEvent: false });
            });

        this.filterForm.valueChanges
            .pipe(
                debounceTime(500),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(filters => {
                this._filtersService.updateFilters(filters);
            });
    }

  onLogoutClick(): void {
    console.log('onLogoutClick');
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
}
