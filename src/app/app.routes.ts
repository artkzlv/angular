import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public/_layout/layout.component';
import { PrivateLayoutComponent } from './private/_layout/layout.component';

export const routes: Routes = [
  {
    path: 'public',
    component: PublicLayoutComponent,
  },
  {
    path: 'private',
    component: PrivateLayoutComponent,
  },
  {
    path: '**',
    redirectTo: 'public',
  },
];
