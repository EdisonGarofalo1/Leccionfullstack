import { Component } from '@angular/core';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';


import { AuthService } from '../../service/auth.service';
import { Send } from 'src/app/core/model/Send';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  constructor(private _router:Router, private _AuthService:AuthService){}
  usuario:Send={
    userName: '',
    password: ''
  }
  recuperar(){

if(this.usuario.userName === ''){
  Swal.fire('Error', 'Debe ingresar su correo o usuario.', 'error');

  return;

}

this._AuthService.recuperarpassword(this.usuario.userName!).subscribe(res => {
  if (res.data && res.data['user']) 
    { 
    const password = res.data['user'].password; 
    
    Swal.fire({
      icon: 'success',
      title: 'Recuperación Exitosa',
      html: `Contraseña recuperada: <strong>${password}</strong>`
    });
  } else {
    Swal.fire('Error', 'No se encontró la contraseña.', 'error');
  }
}, error => {

  Swal.fire('Error', 'Ocurrió un error al recuperar la contraseña.', 'error');
});
}

Longin(){

  this._router.navigateByUrl('/auth/login');

}

  }

  

