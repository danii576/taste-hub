import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-component',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TranslateModule],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css'
})
export class AboutComponent {
  showScrollToTop = false;
  showScrollToDown = true;

  constructor(private router: Router) {}

  goToContact(): void {
    this.router.navigate(['/contact']);
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
      window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 30;
    this.showScrollToDown = !nearBottom;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToDown(): void {
    const target = document.documentElement.scrollHeight;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
}
