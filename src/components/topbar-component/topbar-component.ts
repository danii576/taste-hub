import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar-component',
  imports: [CommonModule, TranslateModule],
  standalone: true,
  templateUrl: './topbar-component.html',
  styleUrls: ['./topbar-component.css'],
})
export class TopbarComponent implements OnInit {
  isDarkMode = false;
  currentRoute: string = '';
  menuOpen = false;
  loggedUser: any;
  showProfileDropdown = false;
  showLogoutConfirm = false;
  currentLang: string = 'en';

  constructor(private router: Router, private translate: TranslateService) {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser) {
      this.loggedUser = JSON.parse(localUser);
    }

    translate.addLangs(['en', 'pt']);
    const savedLang = localStorage.getItem('lang');
    const browserLang = translate.getBrowserLang();
    this.currentLang = savedLang || (browserLang === 'pt' ? 'pt' : 'en');
    this.translate.use(this.currentLang);
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('isDarkMode');
    this.isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;
    document.body.classList.toggle('dark-mode', this.isDarkMode);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

    this.currentRoute = this.router.url;
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  onLogOut() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login');
  }

  confirmLogout() {
    this.showLogoutConfirm = false;
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login');
  }

  cancelLogout() {
    this.showLogoutConfirm = false;
  }

  themeClick() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  pageLogoClick() {
    this.router.navigate(['/home']);
  }

  homeClick() {
    this.router.navigate(['/home']);
  }

  MenuClick() {
    this.router.navigate(['/menu']);
  }

  aboutClick() {
    this.router.navigate(['/about']);
  }

  timingClick() {
    this.router.navigate(['/timing']);
  }

  contactClick() {
    this.router.navigate(['/contact']);
  }
toggleLang(): void {
  this.currentLang = this.currentLang === 'en' ? 'pt' : 'en';
  this.translate.use(this.currentLang);
  localStorage.setItem('lang', this.currentLang);
}


}
