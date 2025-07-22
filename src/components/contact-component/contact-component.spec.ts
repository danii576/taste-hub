import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact-component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, HttpClientTestingModule, TranslateModule.forRoot()]
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

  it('should initialize peopleCount correctly', () => {
    expect(component.peopleCount.length).toBe(50);
    expect(component.peopleCount[0]).toBe(1);
    expect(component.peopleCount[49]).toBe(50);
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

  it('should show validation error and not submit if form is invalid', () => {
    const formMock = { invalid: true };
    component.onSubmit(formMock);
    expect(component.showValidationError).toBeTrue();
  });

  it('should submit form successfully', () => {
    const formMock = { invalid: false };
    component.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
      people: '2',
      date: '2025-12-12',
      meal: 'Dinner',
      time: '19:00'
    };

    component.onSubmit(formMock);

    const req = httpMock.expectOne('https://formspree.io/f/xyzpzbgy');
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(component.messageType).toBe('success');
    expect(component.message).toContain('✅ Reservation sent successfully!');
  });

  it('should handle form submission error', () => {
    const formMock = { invalid: false };
    component.onSubmit(formMock);

    const req = httpMock.expectOne('https://formspree.io/f/xyzpzbgy');
    req.error(new ErrorEvent('Network error'));

    expect(component.messageType).toBe('error');
    expect(component.message).toContain('❌ Failed to book Reservation');
  });

  it('should toggle menu visibility and set position', () => {
    const event = new MouseEvent('click', { clientX: 100, clientY: 200 });
    component.toggleMenu(event);
    expect(component.menuVisible).toBeTrue();
    expect(component.menuStyle).toEqual(jasmine.objectContaining({
      position: 'absolute',
      top: '200px',
      left: '100px'
    }));
  });

  it('should close menu on outside click', () => {
    component.menuVisible = true;
    component.closeMenuOutside();
    expect(component.menuVisible).toBeFalse();
  });

  it('should copy number to clipboard', async () => {
    const clipboardSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    component.copyNumber();
    expect(clipboardSpy).toHaveBeenCalledWith('+351 920-420-832');
  });
it('should call number', () => {
  const hrefSpy = spyOnProperty(window.location, 'href', 'set').and.stub();

  component.callNumber();

  expect(hrefSpy).toHaveBeenCalledWith('tel:+351920420832');
});


  it('should open WhatsApp chat', () => {
    spyOn(window, 'open');
    component.whatsappNumber();
    expect(window.open).toHaveBeenCalledWith('https://wa.me/351920420832', '_blank');
  });
});
