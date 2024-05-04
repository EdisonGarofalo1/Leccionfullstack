import { Component } from '@angular/core';
import Swal from 'sweetalert2'

import { AuthService } from '../../service/auth.service';
import { User } from 'src/app/core/model/User';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'

})
export class ListComponent {

   listaUser: User [] =[];
  logueado: boolean = false;
  estados = [
    { codigo: 'A', significado: 'Activo' },
    { codigo: 'I', significado: 'Inactivo' },
    { codigo: 'B', significado: 'Bloqueado' },
    { codigo: 'E', significado: 'Eliminado' }
  ];
  

   constructor( private _AuthService: AuthService){
   }

   ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.logueado = true;
      
      
    }else{

      return
    }

      this.cargarUsers()
   }
   cargarUsers(){

    this._AuthService.getUser().subscribe( resp=> {this.listaUser=resp;})

   }

   GuardarEstado(data:User){
    
    
   this._AuthService.updateUser(data.idUsuario,data).subscribe({
    next:resp=>{ 
     Swal.fire("Exito",'Los Datos se Actualizado Corretamente','success')
  
   },error:error=>{
Swal.fire("Error",error,'error')
     
    
   }

})

   }




}
