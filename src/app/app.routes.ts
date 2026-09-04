import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public/_layout/layout.component';
import { PrivateLayoutComponent } from './private/_layout/layout.component';
import { LogInComponent } from './public/pages/log-in/log-in';
import { DashboardComponent } from './private/pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'log-in',
        component: LogInComponent,
      },
      {
        path: '**',
        redirectTo: 'log-in',
      },
    ],
  },
  {
    path: 'private',
    component: PrivateLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'public',
  },
];
