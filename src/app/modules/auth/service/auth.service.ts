import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environments';


import { ResponseData } from 'src/app/core/model/Response';
import { Persona, User } from 'src/app/core/model/User';
import { Sesion } from 'src/app/core/model/Sesion';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


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
  Login(username:string,password:string){
    const requestData = { usuariomail: username ,
      password:password
    }; 
    return this.http.post<ResponseData>(this.baseUrl + 'sesion/login', requestData).pipe(
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


  updateUser(id:number,data:User):Observable<ResponseData>{

    return  this.http.put<ResponseData>(this.baseUrl + 'usuario/editar/'+ id, data).pipe(
      catchError(this.handleError)
      );
  }


  createUser(data:User):Observable<ResponseData>{

    return  this.http.post<ResponseData>(this.baseUrl + 'usuario/crear', data).pipe(
      catchError(this.handleError)
      );
  }

  

  
  validarToken(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) {
      return of(false);
    }else{
      return of(true);

    }

  
  }




  
  getUser():Observable<User[]>{

  
    return this.http.get<any>(`${this.baseUrl}usuario/listar`).pipe(
      map((response) => response.data.listusuario as User[])
    ).pipe(
      catchError(this.handleError)
  );
    }

    getUserid(id:number):Observable<User>{

  
      return this.http.get<any>(`${this.baseUrl}usuario/ver/${id}`).pipe(
        map((response) => response.data.usuario as User)
      ).pipe(
        catchError(this.handleError)
    );
      }

      BuscarporIdentificacion(identificacion:String):Observable<Sesion[]>{
        const requestData = { identificacion: identificacion }; 
  
        return this.http.post<any>(this.baseUrl +'sesion/buscarHistorialSesiones',requestData).pipe(
          map((response) => response.data.Usuario as Sesion[])
        ).pipe(
          catchError(this.handleError)
      );
        }

  

      recuperarpassword(username: string): Observable<ResponseData> {
        const requestData = { userName: username }; 
      
        return this.http.post<ResponseData>(this.baseUrl + 'sesion/password', requestData).pipe(
          catchError(this.handleError)
        );
      }

      logout(username:string){
        const requestData = { usuariomail: username 
        }; 
        return this.http.post<ResponseData>(this.baseUrl + 'sesion/logout', requestData).pipe(
              catchError(this.handleError)
              );
      }
  
}
