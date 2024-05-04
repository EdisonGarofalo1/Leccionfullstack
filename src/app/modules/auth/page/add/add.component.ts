import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Persona, User } from 'src/app/core/model/User';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']

})
export class AddComponent {

 


  constructor( private FB:FormBuilder, private _ActivatedRoute:ActivatedRoute, private _AuthService:AuthService, private _Router:Router){  
   

  }


  
  listaPersona: Persona [] =[];
  rol:any[] = [];
  userData: User = { // Inicializa un nuevo usuario vacío
    idUsuario: 0,
    userName: '',
    password: '',
    mail: '',
    intentosFallidos: 0,
    sessionActive: '',
    persona: {
      idPersona: 0,
      nombres: '',
      apellidos: '',
      identificacion: '',
      fechaNacimiento: new Date()
    },
    status: '',
    roles: [{
       idRol:   0,
    rolName: ''
    }]
  };
 
 

  ngOnInit(): void {
    this.rol = [
      { id: 1, nombre: 'Administrador' },
      { id: 2, nombre: 'Asistente Administrativo' },
  
    ];

    this.cargarPersona();
    

    if(!this._Router.url.includes('edit')){
  
      return;
    }

    this._ActivatedRoute.params.pipe(
      switchMap(({id})=> this._AuthService.getUserid(id))).subscribe( { next:resp=> {
  this.userData= resp;

    },error:error=>{
      Swal.fire("Error",error,'error')
          
          }


    
         } )

  }

  Guardar(){


    if (
      !this.userData.userName||
      !this.userData.persona.idPersona ||
      !this.userData.status ||
      !this.userData.password ||
      !this.userData.roles


  
    ) {

      Swal.fire("Error", "Todos los campos son requeridos", "error");
      return; 
    }
    if(this.userData.idUsuario){
     
      this._AuthService.updateUser(this.userData.idUsuario, this.userData).subscribe(
        { next: resp=>{
        console.log(resp)
          if(resp.code ==='OK'){
          Swal.fire("Exito",resp.message,'success')
          this._Router.navigate(['/auth/auth/list']);
        }else{

          Swal.fire("Error","llenar los datos correctamente",'error')
        }


        },error:error=>{
    Swal.fire("Error",error,'error')
          
      
        }
      })
 
  
    }else{
  
   this._AuthService.createUser(this.userData).subscribe( { next :resp => {
 
    if(resp.code ==='OK'){
      Swal.fire("Exito",resp.message,'success')
      this._Router.navigate(['/auth/auth/list']);
    }else{

      Swal.fire("Error","llenar los datos correctamente",'error')
    }
;
   
   },
   error:error=>{
    Swal.fire("Error",error,'error')
          
        }
  
  }
   )
  
  }

  }
  
  salir(){
  this._Router.navigate(['/auth/auth/list'])
 
    }


    cargarPersona(){

      this._AuthService.getPersona().subscribe( resp=> {this.listaPersona=resp;})
  
     }
   
    
}
