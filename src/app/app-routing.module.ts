import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { LoginComponent } from "./components/public/login/login.component";
import { SignupComponent } from "./components/public/signup/signup.component";

import { HomepageComponent } from './components/secure/homepage/homepage.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { AuthGuard } from './gaurds/auth.guard';
import { CreateRepoComponent } from './components/secure/create-repo/create-repo.component';
import { RepositoriesComponent } from './components/secure/repositories/repositories.component';
import { RepositoryDetailComponent } from './components/secure/repository-detail/repository-detail.component';
import { SettingsComponent } from './components/secure/settings/settings.component';
import { ProfileComponent } from './components/secure/profile/profile.component';
import { SupportComponent } from './components/secure/support/support.component';
import { FaqComponent } from './components/secure/faq/faq.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  {
    path: '',
    component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: HomepageComponent },
      { path: 'create', component: CreateRepoComponent },
      { path: 'repositories', component: RepositoriesComponent },
      { path: 'repository-detail', component: RepositoryDetailComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'support', component: SupportComponent },
      { path: 'faq', component: FaqComponent },
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
