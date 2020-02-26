import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import { SiteNoticeComponent } from './site-notice/site-notice.component';


const routes: Routes = [{
  path: 'data-privacy', component: DataPrivacyComponent
}, {
  path: 'site-notice', component: SiteNoticeComponent
}, {
  path: '**', component: MainComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
