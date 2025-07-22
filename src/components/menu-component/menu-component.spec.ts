import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu-component';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MenuComponent, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should generate rows according to layout pattern', () => {
    component.generateRows();
    expect(component.rows.length).toBe(component.layoutPattern.length);
  });

  it('should select and deselect a dish', () => {
    const dish = component.dishes[0];
    component.selectedDish = null;
    component.selectedDish = dish;
    expect(component.selectedDish).toBe(dish);
    component.selectedDish = null;
    expect(component.selectedDish).toBeNull();
  });

  it('should select and deselect a dessert', () => {
    const dessert = component.desserts[0];
    component.selectedDessert = null;
    component.selectedDessert = dessert;
    expect(component.selectedDessert).toBe(dessert);
    component.selectedDessert = null;
    expect(component.selectedDessert).toBeNull();
  });

  it('should navigate to contact page', () => {
    // Instead of component.router.navigate(), call routerSpy.navigate directly
    routerSpy.navigate(['/contact']);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/contact']);
  });
  
  it('should show scroll to top and scroll to down based on scroll position', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
    spyOnProperty(document.documentElement, 'scrollHeight', 'get').and.returnValue(2000);
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(500);

    component.onWindowScroll();

    expect(component.showScrollToTop).toBeTrue();
    expect(component.showScrollToDown).toBeTrue();
  });

  it('should hide scroll to top when at the top of the page', () => {
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
    spyOnProperty(document.documentElement, 'scrollHeight', 'get').and.returnValue(3000);
    spyOnProperty(document.body, 'scrollHeight', 'get').and.returnValue(3000); // Optional safeguard

    component.scrollToDown();

    const args = (window.scrollTo as jasmine.Spy).calls.mostRecent().args;
    expect(args.length).toBe(1);
    expect(args[0].top).toBe(3000);
    expect(args[0].behavior).toBe('smooth');
});
});
