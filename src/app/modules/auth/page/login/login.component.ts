import { Component } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  constructor(private _router:Router, private _AuthService:AuthService,private FB: FormBuilder){ 
  this.loginForm= this.FB.group({
    userName:['JuanAlberto1',[Validators.required]],
    password:['12345678nJ@',[Validators.required]],
  })
  }  
  login(){

    
    if(this.loginForm.value.userName === '' && this.loginForm.value.password ) {
      Swal.fire("Error", "Debe ingresar Usuario y contraseña", 'error');
      return;
    }
    if (this.loginForm.valid) {
     
     this._AuthService.Login(this.loginForm.value.userName,this.loginForm.value.password).subscribe(
      res =>{
      if(res.code !==null){
        localStorage.setItem('token', res.code! );
        localStorage.setItem('Data', JSON.stringify(res.data) );
        localStorage.setItem('username', res.data['user'].userName);
        this._router.navigateByUrl('/home');
     
     
        } else {
     
          Swal.fire('Error', res.message, 'error');
        }
     } )
    } else { 
 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos.'
      });
    } 
  }
  recuperarPassword(){
     this._router.navigateByUrl('/auth/password');
  }
}
