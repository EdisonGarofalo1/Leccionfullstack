import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './page/list/list.component';
import { AddComponent } from './page/add/add.component';
import { LoginComponent } from './page/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { PasswordComponent } from './page/password/password.component';
import { HistorialSesionComponent } from './page/historial-sesion/historial-sesion.component';





@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    LoginComponent,
    PasswordComponent,
    HistorialSesionComponent,
   

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
