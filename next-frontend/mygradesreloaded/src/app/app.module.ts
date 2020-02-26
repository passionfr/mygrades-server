import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import { MainComponent } from './main/main.component';
import { SiteNoticeComponent } from './site-notice/site-notice.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DataPrivacyComponent,
    MainComponent,
    SiteNoticeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
