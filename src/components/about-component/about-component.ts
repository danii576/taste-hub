import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-about-component',
  imports: [CommonModule, TranslatePipe,TranslateModule],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css'
})
export class AboutComponent {
  constructor(private router: Router){}
  goToContact() {
    this.router.navigate(['/contact']); // Update this route if your contact route has a different path
  }
showScrollToTop = false;
  showScrollToDown = true; 

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.showScrollToTop = scrollTop > 50;
    const nearBottom =
    window.innerHeight + scrollTop >= document.body.scrollHeight - 30;
    this.showScrollToDown = !nearBottom;  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToDown() {
    const target = document.documentElement.scrollHeight; // Scroll to bottom
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
}
