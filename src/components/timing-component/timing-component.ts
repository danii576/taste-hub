import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-timing-component',
  imports: [CommonModule, TranslatePipe, TranslateModule],
  templateUrl: './timing-component.html',
  styleUrl: './timing-component.css'
})
export class TimingComponent {
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
    this.showScrollToDown = scrollTop > 50;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToDown() {
    const target = document.documentElement.scrollHeight; // Scroll to bottom
    window.scrollTo({ top: target, behavior: 'smooth' });
  }}
