import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar-component';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let translate: TranslateService;
  let routerEvents$: Subject<any>;

  beforeEach(async () => {
    routerEvents$ = new Subject();
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'], {
      events: routerEvents$.asObservable(),
      url: '/home',
    });

    await TestBed.configureTestingModule({
      imports: [TopbarComponent, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('should create the component and initialize properties', () => {
    expect(component).toBeTruthy();
    expect(component.currentRoute).toBe('/home');
  });

  it('should toggle profile dropdown', () => {
    expect(component.showProfileDropdown).toBeFalse();
    component.toggleProfileDropdown();
    expect(component.showProfileDropdown).toBeTrue();
  });

  it('should update currentRoute on NavigationEnd event', () => {
    routerEvents$.next(new NavigationEnd(1, '/test-prev', '/test-next'));
    expect(component.currentRoute).toBe('/test-next');
  });

  it('should handle logout correctly', () => {
    localStorage.setItem('loggedUser', JSON.stringify({ name: 'test' }));
    component.onLogOut();
    expect(localStorage.getItem('loggedUser')).toBeNull();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should confirm logout correctly', () => {
    localStorage.setItem('loggedUser', JSON.stringify({ name: 'test' }));
    component.confirmLogout();
    expect(component.showLogoutConfirm).toBeFalse();
    expect(localStorage.getItem('loggedUser')).toBeNull();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should cancel logout correctly', () => {
    component.showLogoutConfirm = true;
    component.cancelLogout();
    expect(component.showLogoutConfirm).toBeFalse();
  });

  it('should toggle theme and save to localStorage', () => {
    spyOn(document.body.classList, 'toggle');
    component.isDarkMode = false;
    component.themeClick();
    expect(component.isDarkMode).toBeTrue();
    expect(localStorage.getItem('isDarkMode')).toBe('true');
    expect(document.body.classList.toggle).toHaveBeenCalledWith('dark-mode', true);
  });

  it('should navigate to routes correctly', () => {
    component.pageLogoClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);

    component.homeClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);

    component.MenuClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/menu']);

    component.aboutClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/about']);

    component.timingClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/timing']);

    component.contactClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/contact']);
  });

  it('should toggle language and save to localStorage', () => {
    spyOn(translate, 'use');
    component.currentLang = 'en';
    component.toggleLang();
    expect(component.currentLang).toBe('pt');
    expect(translate.use).toHaveBeenCalledWith('pt');
    expect(localStorage.getItem('lang')).toBe('pt');
  });
});
