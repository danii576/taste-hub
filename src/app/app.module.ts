import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Import your actual root AppComponent (make sure file is app.component.ts)
import { AppComponent } from './app-component'

// Other components (make sure none of these are standalone, else remove from declarations)
import { HomeComponent } from '../components/home-component/home-component';
import { AboutComponent } from '../components/about-component/about-component';
import { ContactComponent } from '../components/contact-component/contact-component';
import { MenuComponent } from '../components/menu-component/menu-component';
import { TimingComponent } from '../components/timing-component/timing-component';
import { TopbarComponent } from '../components/topbar-component/topbar-component';

// Translate modules
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Angular routing fix for GitHub Pages
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// Translation loader factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
  ],
  imports: [ContactComponent,MenuComponent,TimingComponent,TopbarComponent,
    AboutComponent,
    HomeComponent,
    AppComponent,
    BrowserModule,
    HttpClientModule,
    CommonModule,
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
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }  // fix routing on GH Pages
  ],
  bootstrap: []
})
export class AppModule {}
