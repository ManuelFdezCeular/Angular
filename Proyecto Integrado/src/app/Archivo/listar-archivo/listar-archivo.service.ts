import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Archivo } from '../archivo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListarArchivoService {

  url = environment.url;

  constructor(private http:HttpClient) { }

  listar(){
    let objeto = JSON.stringify({
      accion: "Archivos"
    })

    return this.http.post<Archivo[]>(this.url, objeto, environment.cabecera());
  }

}
