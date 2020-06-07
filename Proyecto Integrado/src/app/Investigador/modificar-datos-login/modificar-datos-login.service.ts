import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModificarDatosLoginService {

  url = environment.url

  constructor(private http:HttpClient) { }

  modificarDatosLogin(clave:string, email:string){
    let objeto = JSON.stringify({
      accion: "ModificarDatosLogin",
      clave: clave,
      email: email
    })

    return this.http.put<boolean>(this.url, objeto, environment.cabecera());
  }
}