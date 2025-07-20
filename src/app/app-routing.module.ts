import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login-component/login-component';
import { AboutComponent } from '../components/about-component/about-component';
import { ContactComponent } from '../components/contact-component/contact-component';
import { HomeComponent } from '../components/home-component/home-component';
import { MenuComponent } from '../components/menu-component/menu-component';
import { TimingComponent } from '../components/timing-component/timing-component';
import {HttpClientModule} from '@angular/common/http';
import { AdminGuard } from './guards/admin-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: 'timing', component: TimingComponent },
  { path: 'contact', component: ContactComponent },
    { path: 'admin', component: LoginComponent, canActivate: [AdminGuard] },

  { path: '**', redirectTo: '/login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
