import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
// import { SignInComponent }  from './user1/sign-in/sign-in.component';
// import { SignUpComponent }  from './user1/sign-up/sign-up.component';
// import { ProfileComponent }  from './user1/profile/profile.component';
// import { AuthGuard }  from './user1/auth.guard';

import { SignInComponent }  from './user/sign-in/sign-in.component';
import { SignUpComponent }  from './user/sign-up/sign-up.component';
import { ProfileComponent }  from './user/profile/profile.component';
import { AuthGuard }  from './user/auth.guard';


const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'heroes', component: HeroesComponent },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }