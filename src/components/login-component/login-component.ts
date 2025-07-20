import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css'],
})
export class LoginComponent {
  activeForm: 'login' | 'register' = 'login';
  registerobg: registerModel = new registerModel();
  loginobj: loginModel = new loginModel();

  showPasswordLogin = false;
  showPasswordRegister = false;

  constructor(private _snackbar: MatSnackBar, private _router: Router) {}

  togglePasswordVisibility(field: 'login' | 'register') {
    if (field === 'login') {
      this.showPasswordLogin = !this.showPasswordLogin;
    } else {
      this.showPasswordRegister = !this.showPasswordRegister;
    }
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  registerFormHandler() {
    if (!this.isValidEmail(this.registerobg.email)) {
      this._snackbar.open('Please enter a valid email address!', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-white'],
      });
      return;
    }

    const localusers = localStorage.getItem('users');
    const users = localusers ? JSON.parse(localusers) : [];

    // Check if user already exists by email
    const userExists = users.some(
      (user: registerModel) => user.email === this.registerobg.email
    );
    if (userExists) {
      this._snackbar.open('User already exists!', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-white'],
      });
      return;
    }

    users.push(this.registerobg);
    localStorage.setItem('users', JSON.stringify(users));

    // Automatically log in the new user
    localStorage.setItem('loggedUser', JSON.stringify(this.registerobg));

    this._snackbar.open('User registered successfully', 'Close', {
      duration: 2000,
      panelClass: ['snackbar-white'],
    });

    // Redirect to home page immediately
    this._router.navigateByUrl('/home');
  }

  loginFormHandler() {
    const localusers = localStorage.getItem('users');
    if (localusers) {
      const users = JSON.parse(localusers);
      const user = users.find(
        (u: registerModel) =>
          u.email === this.loginobj.email && u.password === this.loginobj.password
      );
      if (user) {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this._snackbar.open('Login successful', '', {
          duration: 2000,
          panelClass: ['snackbar-white'],
        });
        this._router.navigateByUrl('/home');
      } else {
        this._snackbar.open('Invalid email or password!', '', {
          duration: 2000,
          panelClass: ['snackbar-white'],
        });
      }
    }
  }
}

export class registerModel {
  name: string = '';
  email: string = '';
  password: string = '';
  role: 'user' | 'admin' = 'user';
}

export class loginModel {
  email: string = '';
  password: string = '';
}
