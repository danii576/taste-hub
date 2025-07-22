import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact-component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        HttpClientTestingModule,
        FormsModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
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
    const args = (window.scrollTo as jasmine.Spy).calls.mostRecent().args[0];
    expect(args.top).toBe(0);
    expect(args.behavior).toBe('smooth');
  });

  it('should scroll to down', () => {
    spyOn(window, 'scrollTo').and.stub();
    spyOnProperty(document.documentElement, 'scrollHeight').and.returnValue(3000);
    component.scrollToDown();
    const args = (window.scrollTo as jasmine.Spy).calls.mostRecent().args[0];
    expect(args.top).toBe(3000);
    expect(args.behavior).toBe('smooth');
  });

  it('should set success message after successful submission', () => {
    const form = { invalid: false };
    component.formData = {
      name: 'Test Name',
      email: 'test@example.com',
      message: 'Hello',
      people: '2',
      date: '2025-12-31',
      meal: 'Dinner',
      time: '19:00'
    };

    component.onSubmit(form);

    const req = httpMock.expectOne('https://formspree.io/f/xyzpzbgy');
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(component.messageType).toBe('success');
    expect(component.message).toContain('✅ Reservation sent successfully!');
  });

  it('should show validation error when form is invalid', () => {
    const form = { invalid: true };
    component.onSubmit(form);
    expect(component.showValidationError).toBeTrue();
  });

  it('should set error message on failed submission', () => {
    const form = { invalid: false };
    component.onSubmit(form);
    const req = httpMock.expectOne('https://formspree.io/f/xyzpzbgy');
    req.error(new ErrorEvent('Network error'));

    expect(component.messageType).toBe('error');
    expect(component.message).toContain('❌ Failed to book Reservation');
  });

  it('should toggle menu visibility and position', () => {
    const event = new MouseEvent('click', { clientX: 100, clientY: 200 });
    component.toggleMenu(event);
    expect(component.menuVisible).toBeTrue();
    expect(component.menuStyle).toEqual({
      position: 'absolute',
      top: '200px',
      left: '100px'
    });
  });

  it('should close menu when calling closeMenuOutside', () => {
    component.menuVisible = true;
    component.closeMenuOutside();
    expect(component.menuVisible).toBeFalse();
  });

  it('should copy phone number to clipboard', async () => {
    const clipboardSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    await component.copyNumber();
    expect(clipboardSpy).toHaveBeenCalledWith('+351 920-420-832');
    expect(component.menuVisible).toBeFalse();
  });
it('should navigate to tel link', () => {
  spyOn(component, 'navigateToTel');
  component.callNumber();
  expect(component.navigateToTel).toHaveBeenCalledWith('+351920420832');
});



  it('should open WhatsApp number', () => {
    const openSpy = spyOn(window, 'open').and.stub();
    component.whatsappNumber();
    expect(openSpy).toHaveBeenCalledWith('https://wa.me/351920420832', '_blank');
    expect(component.menuVisible).toBeFalse();
  });
});

// Helper function to spy on property setter
function spyOnSetter(obj: any, prop: string) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, prop) || {
    configurable: true,
    set: () => {},
  };
  return spyOnProperty(obj, prop, 'set').and.callFake((value) => descriptor.set!.call(obj, value));
}
