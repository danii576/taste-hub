import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent, registerModel, loginModel } from './login-component'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, NoopAnimationsModule],
      declarations: [],
      providers: [
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility for login and register', () => {
    expect(component.showPasswordLogin).toBeFalse();
    expect(component.showPasswordRegister).toBeFalse();

    component.togglePasswordVisibility('login');
    expect(component.showPasswordLogin).toBeTrue();
    component.togglePasswordVisibility('login');
    expect(component.showPasswordLogin).toBeFalse();

    component.togglePasswordVisibility('register');
    expect(component.showPasswordRegister).toBeTrue();
    component.togglePasswordVisibility('register');
    expect(component.showPasswordRegister).toBeFalse();
  });

  it('should switch active form', () => {
    expect(component.activeForm).toBe('login');
    component.toggleForm('register');
    expect(component.activeForm).toBe('register');
    component.toggleForm('login');
    expect(component.activeForm).toBe('login');
  });

  describe('isValidEmail', () => {
    it('should validate email correctly', () => {
      expect(component.isValidEmail('test@example.com')).toBeTrue();
      expect(component.isValidEmail('invalid-email')).toBeFalse();
      expect(component.isValidEmail('test@.com')).toBeFalse();
      expect(component.isValidEmail('')).toBeFalse();
    });
  });

  describe('registerFormHandler', () => {
    it('should show error if email is invalid', () => {
      component.registerobg.email = 'invalid-email';
      component.registerFormHandler();

      expect(snackbarSpy.open).toHaveBeenCalledWith(
        'Please enter a valid email address!',
        'Close',
        jasmine.any(Object)
      );
    });

    it('should show error if user already exists', () => {
      const existingUser = new registerModel();
      existingUser.email = 'user@example.com';
      localStorage.setItem('users', JSON.stringify([existingUser]));

      component.registerobg.email = 'user@example.com';
      component.registerFormHandler();

      expect(snackbarSpy.open).toHaveBeenCalledWith(
        'User already exists!',
        'Close',
        jasmine.any(Object)
      );
    });

    it('should register new user and navigate to home', () => {
      component.registerobg = {
        name: 'Test User',
        email: 'newuser@example.com',
        password: '123456',
        role: 'user',
      };

      component.registerFormHandler();

      const users = JSON.parse(localStorage.getItem('users')!);
      expect(users.length).toBe(1);
      expect(users[0].email).toBe('newuser@example.com');

      const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
      expect(loggedUser.email).toBe('newuser@example.com');

      expect(snackbarSpy.open).toHaveBeenCalledWith(
        'User registered successfully',
        'Close',
        jasmine.any(Object)
      );

      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/home');
    });
  });

  describe('loginFormHandler', () => {
    beforeEach(() => {
      const user = {
        name: 'Test User',
        email: 'user@example.com',
        password: 'pass123',
        role: 'user',
      };
      localStorage.setItem('users', JSON.stringify([user]));
    });

    it('should login successfully with correct credentials', () => {
      component.loginobj.email = 'user@example.com';
      component.loginobj.password = 'pass123';

      component.loginFormHandler();

      const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
      expect(loggedUser.email).toBe('user@example.com');

      expect(snackbarSpy.open).toHaveBeenCalledWith(
        'Login successful',
        '',
        jasmine.any(Object)
      );

      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/home');
    });

    it('should show error on invalid login', () => {
      component.loginobj.email = 'user@example.com';
      component.loginobj.password = 'wrongpass';

      component.loginFormHandler();

      expect(snackbarSpy.open).toHaveBeenCalledWith(
        'Invalid email or password!',
        '',
        jasmine.any(Object)
      );
    });

    it('should do nothing if no users in localStorage', () => {
      localStorage.removeItem('users');

      component.loginobj.email = 'user@example.com';
      component.loginobj.password = 'pass123';

      component.loginFormHandler();

      expect(snackbarSpy.open).not.toHaveBeenCalled();
      expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
    });
  });
});
