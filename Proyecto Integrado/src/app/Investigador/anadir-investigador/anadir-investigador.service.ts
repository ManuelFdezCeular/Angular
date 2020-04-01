import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnadirInvestigadorService {

  url = environment.url;

  constructor(private http:HttpClient) { }

  anadir(investigador:any){
    let objeto = JSON.stringify({
      accion: "AnadirInvestigador",
      investigador: investigador
    })
    console.log("investigador en servicio: ", objeto);
    return this.http.post<boolean>(this.url, objeto);
  }
}
