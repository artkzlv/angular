import { Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NgOptimizedImage, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
})
export class PublicLayoutComponent implements OnInit {
  public activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public router: Router = inject(Router);

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot);
  }
}
