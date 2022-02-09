import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Globals } from "./global";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/public/login/login.component';
import { SignupComponent } from './components/public/signup/signup.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { HomepageComponent } from './components/secure/homepage/homepage.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { CreateRepoComponent } from './components/secure/create-repo/create-repo.component';
import { RepositoriesComponent } from './components/secure/repositories/repositories.component';
import { RepositoryDetailComponent } from './components/secure/repository-detail/repository-detail.component';
import { ProfileComponent } from './components/secure/profile/profile.component';
import { SettingsComponent } from './components/secure/settings/settings.component';
import { SupportComponent } from './components/secure/support/support.component';
import { FaqComponent } from './components/secure/faq/faq.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LayoutComponent,
    SidebarComponent,
    HomepageComponent,
    CreateRepoComponent,
    RepositoriesComponent,
    RepositoryDetailComponent,
    ProfileComponent,
    SettingsComponent,
    SupportComponent,
    FaqComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
  }),
  BrowserAnimationsModule,
  ],
  providers: [
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
