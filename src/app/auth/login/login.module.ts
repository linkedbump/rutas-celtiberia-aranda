import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginComponent,
    FormsModule,
    RouterModule.forChild(routes),
    NavbarComponent 
  ]
})
export class LoginModule { }
