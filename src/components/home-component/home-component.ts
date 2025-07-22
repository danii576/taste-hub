import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TranslateModule],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  showScrollToTop = false;
  showScrollToDown = true;

  currentImageIndex = 0;
  totalImages = 4;
  intervalId!: ReturnType<typeof setInterval>;

  loggedUser: any = {};

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('loggedUser');
    this.loggedUser = storedUser ? JSON.parse(storedUser) : {};
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.showScrollToTop = scrollTop > 50;

    const nearBottom =
      window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 50;
    this.showScrollToDown = !nearBottom;
  }

  isAdmin(): boolean {
    return this.loggedUser?.role === 'admin';
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
  }

  prevImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.totalImages) % this.totalImages;
  }

  goToContact(): void {
    this.router.navigate(['/contact']);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToDown(): void {
    const target = document.documentElement.scrollHeight;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  manageUsers(): void {
    this.router.navigate(['/admin/manage-users']);
  }
}
