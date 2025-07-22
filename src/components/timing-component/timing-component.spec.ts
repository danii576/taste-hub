import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimingComponent } from './timing-component';
import { TranslateModule } from '@ngx-translate/core';

describe('TimingComponent', () => {
  let component: TimingComponent;
  let fixture: ComponentFixture<TimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimingComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show scroll buttons when scrollY > 50', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
    component.onWindowScroll();
    expect(component.showScrollToTop).toBeTrue();
    expect(component.showScrollToDown).toBeTrue();
  });

  it('should hide scroll buttons when scrollY <= 50', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(20);
    component.onWindowScroll();
    expect(component.showScrollToTop).toBeFalse();
    expect(component.showScrollToDown).toBeFalse();
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
