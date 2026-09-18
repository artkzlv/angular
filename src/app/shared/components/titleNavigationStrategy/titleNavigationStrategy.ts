import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class TitleNavigationStrategy extends TitleStrategy {
  private _titleService = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);

    if (title) {
      this._titleService.setTitle(title);
    }
  }
}
