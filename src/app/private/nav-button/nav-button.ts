import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [NgClass, NgOptimizedImage],
  templateUrl: './nav-button.html',
  styleUrls: ['./nav-button.scss'],
})
export class AppNavButtonComponent implements AfterViewInit {
  private _elementRef: ElementRef = inject(ElementRef);
  private _observer!: MutationObserver;

  type = 'button';
  isActive = signal<boolean>(false);
  text = input('');
  iconUrl = input('');
  iconUrlActive = input('');
  disabled = input(false);

  clicked = output<Event>();

  onClick(event: Event): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }

  ngAfterViewInit(): void {
    this._observer = new MutationObserver(() => {
      const hasClass =
        this._elementRef.nativeElement.classList.contains('active');
      this.isActive.set(hasClass);
    });

    this._observer.observe(this._elementRef.nativeElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }
}
