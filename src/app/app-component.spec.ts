import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { App } from './app-component';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let routerEventsSubject: Subject<RouterEvent>;
  let routerMock: any;

  beforeEach(() => {
    routerEventsSubject = new Subject<RouterEvent>();
    routerMock = {
      events: routerEventsSubject.asObservable()
    };

    TestBed.configureTestingModule({
      imports: [App], // standalone component
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    });

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should set showTopbar to false when navigating to /login', fakeAsync(() => {
    // emit a NavigationEnd event with urlAfterRedirects = '/login'
    routerEventsSubject.next(new NavigationEnd(1, '/some-route', '/login'));
    tick();
    expect(component.showTopbar).toBeFalse();
  }));

  it('should set showTopbar to true when navigating to any route other than /login', fakeAsync(() => {
    routerEventsSubject.next(new NavigationEnd(1, '/login', '/dashboard'));
    tick();
    expect(component.showTopbar).toBeTrue();
  }));
});
