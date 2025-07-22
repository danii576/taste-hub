import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home-component';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize interval on ngOnInit', () => {
    spyOn(window, 'setInterval').and.callThrough();
    component.ngOnInit();
    expect(component.intervalId).toBeDefined();
  });

  it('should clear interval on ngOnDestroy', () => {
    const clearSpy = spyOn(window, 'clearInterval').and.callThrough();
    component.ngOnDestroy();
    expect(clearSpy).toHaveBeenCalledWith(component.intervalId);
  });

  it('should set showScrollToTop and showScrollToDown on window scroll', () => {
    spyOnProperty(window, 'scrollY').and.returnValue(100);
    component.onWindowScroll();
    expect(component.showScrollToTop).toBeTrue();
    expect(component.showScrollToDown).toBeTrue();
  });

  it('should detect admin user', () => {
    localStorage.setItem('loggedUser', JSON.stringify({ role: 'admin' }));
    component = new HomeComponent(routerSpy);
    expect(component.isAdmin()).toBeTrue();
  });

  it('should not detect admin user if role is not admin', () => {
    localStorage.setItem('loggedUser', JSON.stringify({ role: 'user' }));
    component = new HomeComponent(routerSpy);
    expect(component.isAdmin()).toBeFalse();
  });

  it('should navigate to contact page', () => {
    component.goToContact();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/contact']);
  });

  it('should navigate to manage users page', () => {
    component.manageUsers();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/manage-users']);
  });

  it('should cycle next and previous images correctly', () => {
    component.currentImageIndex = 0;
    component.nextImage();
    expect(component.currentImageIndex).toBe(1);

    component.prevImage();
    expect(component.currentImageIndex).toBe(0);
  });


it('should scroll to top', () => {
    spyOn(window, 'scrollTo').and.stub();
    component.scrollToTop();

    const args = (window.scrollTo as jasmine.Spy).calls.mostRecent().args;
    expect(args.length).toBe(1);
    expect(args[0].top).toBe(0);
    expect(args[0].behavior).toBe('smooth');
  });

  it('should scroll to down', () => {
    spyOn(window, 'scrollTo').and.stub();
    spyOnProperty(document.documentElement, 'scrollHeight').and.returnValue(3000);
    component.scrollToDown();

    const args = (window.scrollTo as jasmine.Spy).calls.mostRecent().args;
    expect(args.length).toBe(1);
    expect(args[0].top).toBe(3000);
    expect(args[0].behavior).toBe('smooth');
  });
});