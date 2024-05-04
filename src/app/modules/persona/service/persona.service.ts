import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';
import { Persona } from 'src/app/core/model/User';
import { ResponseData } from 'src/app/core/model/Response';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private baseUrl: string = environment.baseUrl;
 

  constructor(private http:HttpClient ) { }

  
  private handleError(error:HttpErrorResponse){

    if(error.error instanceof ErrorEvent){
      console.error('Ocurrió un error:',error.error.message)


    }else {

      console.error(`El backend devolvió el código ${error.status}` +
      
      ` body era: ${error.error}`);

          }
          return throwError ('Algo malo sucedio; Por favor, inténtelo de nuevo más tarde.'

          );
    
  }
 

  

  updatePersona(id:number,data:Persona):Observable<ResponseData>{

    return  this.http.put<ResponseData>(this.baseUrl + 'persona/editar/'+ id, data).pipe(
      catchError(this.handleError)
      );
  }


  createPersona(data:Persona):Observable<ResponseData>{

    return  this.http.post<ResponseData>(this.baseUrl + 'persona/crear/', data).pipe(
      catchError(this.handleError)
      );
  }

  

 




  
  getPersona():Observable<Persona[]>{

  
    return this.http.get<any>(`${this.baseUrl}persona/listar`).pipe(
      map((response) => response.data.listpersonas as Persona[])
    ).pipe(
      catchError(this.handleError)
  );
    }

    getPersonaid(id:number):Observable<Persona>{

  
      return this.http.get<any>(`${this.baseUrl}persona/ver/${id}`).pipe(
        map((response) => response.data.persona as Persona)
      ).pipe(
        catchError(this.handleError)
    );
      }
}
