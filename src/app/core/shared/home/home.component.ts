import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { Send } from '../../model/Send';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent {

  logueado:boolean=false;
  rol!:String |null;
  nombre:string = "";
  constructor(private _router:Router, private _AuthService:AuthService){

  

  }
  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.logueado = true;
      this.rol = localStorage.getItem('token');
      this.nombre = localStorage.getItem('username')??"";
    }
  

  }
  


  Salir(){
 

    const userDataString = localStorage.getItem('Data');
if (userDataString) {
  const userData = JSON.parse(userDataString);
  const username = userData.user.userName;
  this._AuthService.logout(username).subscribe(
    (resp) => {
  
      if (resp.code === 'ok') {
        Swal.fire("Exito", resp.message, 'success');
        localStorage.clear();
        this._router.navigateByUrl('/auth/login');
      }
    },
    (error) => {
     
      Swal.fire("Error", "Hubo un error al intentar cerrar sesión.", 'error');
    }
  );
}

  }
  

}
