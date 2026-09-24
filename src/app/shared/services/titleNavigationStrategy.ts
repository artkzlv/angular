import { Injectable, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class TitleNavigationStrategy extends TitleStrategy {
  private _titleService = inject(Title);

  title = signal('');

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState) ?? '';

    this._titleService.setTitle(title);
    this.title.set(title);
  }
}
