import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about-component';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Location } from '@angular/common';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AboutComponent, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to contact page on goToContact()', () => {
    component.goToContact();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/contact']);
  });

  it('should show scroll to top and hide scroll to down when scrolled down', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
    spyOnProperty(document.documentElement, 'scrollHeight', 'get').and.returnValue(2000);
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(500);

    component.onWindowScroll();

    expect(component.showScrollToTop).toBeTrue();
    expect(component.showScrollToDown).toBeTrue();
  });

  it('should hide scroll to top and show scroll to down when near top', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(0);
    spyOnProperty(document.documentElement, 'scrollHeight', 'get').and.returnValue(2000);
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(500);

    component.onWindowScroll();

    expect(component.showScrollToTop).toBeFalse();
    expect(component.showScrollToDown).toBeTrue();
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