import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';
import { Sesion } from 'src/app/core/model/Sesion';

@Component({
  selector: 'app-historial-sesion',
  templateUrl: './historial-sesion.component.html',
  styleUrls: ['./historial-sesion.component.css']
})
export class HistorialSesionComponent {

  constructor( private _AuthService: AuthService){
  }
  searchTerm:String='';
  listaSesion: Sesion [] =[];



  buscar(){

   
   
      this._AuthService.BuscarporIdentificacion(this.searchTerm).subscribe( 
        
        (resp) => {
          if (resp && resp.length > 0) {
            this.listaSesion = resp;
          } else {
            // Manejo de respuesta vacía
            Swal.fire({
              icon: 'info',
              title: 'Sin resultados',
              text: 'No se encontraron sesiones para la identificación proporcionada.'
            });
          }
        },
        (error) => {
          // Manejo de errores
          console.error('Error al buscar sesiones:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al buscar sesiones. Por favor, inténtalo de nuevo más tarde.'
          });
        }
      );
     

  }
}
