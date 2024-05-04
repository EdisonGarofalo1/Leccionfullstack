import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Persona } from 'src/app/core/model/User';
import { PersonaService } from '../../service/persona.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(  private _ActivatedRoute:ActivatedRoute, private _PersonaService:PersonaService, private _Router:Router){  

  }

  nuevaPersona: Persona = {
    idPersona: 0,
    nombres: '',
    apellidos: '',
    identificacion: '',
    fechaNacimiento: new Date()
  };

  ngOnInit(): void {
   
    if( !this._Router.url.includes('edit') ) {
      return;
    }
    this._ActivatedRoute.params.pipe(
      switchMap(({id})=> this._PersonaService.getPersonaid(id))).subscribe( { next:resp=> {
      this.nuevaPersona=resp;
    
   
    },error:error=>{
      Swal.fire("Error",error,'error')
          }
         } )
 }

  Guardar(){


    if (
      !this.nuevaPersona.nombres||
      !this.nuevaPersona.apellidos ||
      !this.nuevaPersona.fechaNacimiento ||
      !this.nuevaPersona.identificacion
  
    ) {

      Swal.fire("Error", "Todos los campos son requeridos", "error");
      return; 
    }
    if(this.nuevaPersona.idPersona){
      this._PersonaService.updatePersona(this.nuevaPersona.idPersona, this.nuevaPersona).subscribe(
        { next: resp=>{
     
          if(resp.code ==='OK'){
          Swal.fire("Exito",resp.message,'success')
          this._Router.navigate(['/home/persona/list']);
        }else{

          Swal.fire("Error","llenar los datos correctamente",'error')
        }


        },error:error=>{
    Swal.fire("Error",error,'error')
          
      
        }
      })
 
  
    }else{
   this._PersonaService.createPersona(this.nuevaPersona).subscribe( { next :resp => {
   
    if(resp.code ==='OK'){
      Swal.fire("Exito",resp.message,'success')
      this._Router.navigate(['/home/persona/list']);
    }else{

      Swal.fire("Error","llenar los datos correctamente",'error')
    }

   
   },
   error:error=>{
    Swal.fire("Error",error,'error')
          
        }
  
  }
   )
  
  }

  }
salir(){
  this._Router.navigate(['/home/persona/list']);
}
}
