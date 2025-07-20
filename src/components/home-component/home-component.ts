import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  showScrollToTop = false;
  showScrollToDown = true;

  currentImageIndex = 0;
  totalImages = 4;
  intervalId: any;

  loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.showScrollToTop = scrollTop > 50;
    const nearBottom =
    window.innerHeight + scrollTop >= document.body.scrollHeight - 50;
    this.showScrollToDown = !nearBottom;  }

  isAdmin(): boolean {
    return this.loggedUser.role === 'admin';
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 4000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.totalImages) % this.totalImages;
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToDown() {
    const target = document.documentElement.scrollHeight;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  // Navigate to admin manage users page
  manageUsers() {
    this.router.navigate(['/admin/manage-users']); // adjust route as needed
  }
}
