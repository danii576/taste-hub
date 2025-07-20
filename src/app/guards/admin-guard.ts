import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
export const adminGuard: CanActivateFn = (route, state) => {
  return true;
};
// admin.guard.ts
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/home']); // or show an "Access Denied" page
      return false;
    }
  }
}

