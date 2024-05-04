import { Component } from '@angular/core';
import { Persona } from 'src/app/core/model/User';
import Swal from 'sweetalert2'
import { PersonaService } from '../../service/persona.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  
  listaPersona: Persona [] =[];
  logueado: boolean = false;

  

   constructor( private _PersonaService: PersonaService){
   }

   ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.logueado = true;
      
      
    }else{

      return
    }

      this.cargarPersona()
   }
   cargarPersona(){

    this._PersonaService.getPersona().subscribe( resp=> {this.listaPersona=resp;})

   }

   
}
