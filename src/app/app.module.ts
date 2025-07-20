import { NgModule, Component as AppComponent } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
// Components
import { HomeComponent } from '../components/home-component/home-component';
import { AboutComponent } from '../components/about-component/about-component';
import { ContactComponent } from '../components/contact-component/contact-component';
import { MenuComponent } from '../components/menu-component/menu-component';
import { TimingComponent } from '../components/timing-component/timing-component';
import { TopbarComponent } from '../components/topbar-component/topbar-component';

// Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Translation loader function
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    TimingComponent,
    MenuComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgForm,
    FormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [ AppComponent] // Or your main root component
})
export class AppModule {}
