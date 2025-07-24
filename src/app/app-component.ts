import { Component } from '@angular/core';
import { TopbarComponent } from '../components/topbar-component/topbar-component';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TopbarComponent, RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app-component.html',
  styleUrls: ['./app-component.css'],
})
export class AppComponent {
  protected title = 'taste-hub';
  showTopbar = true;

  constructor( private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showTopbar = event.urlAfterRedirects !== '/login';
      }
    });
  }
}
