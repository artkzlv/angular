import { Component } from '@angular/core';
import { PublicLayoutComponent } from './public/_layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [PublicLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
