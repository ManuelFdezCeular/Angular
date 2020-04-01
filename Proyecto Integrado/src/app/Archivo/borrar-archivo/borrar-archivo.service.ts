import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BorrarArchivoService {
 
  url = environment.url;

  constructor(private http:HttpClient) { }

  borrar(id:number){
    let objeto = JSON.stringify({
      accion: "BorrarArchivo",
      id: id
    })

    return this.http.post<boolean>(this.url, objeto);
  }
}
