import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { HomeComponent } from './components/home/home.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path: 'registration', component:RegistrationComponent},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'home', component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
