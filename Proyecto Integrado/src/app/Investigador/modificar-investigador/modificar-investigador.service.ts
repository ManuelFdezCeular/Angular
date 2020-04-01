import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Investigador } from '../investigador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModificarInvestigadorService {
  
  url = environment.url;

  constructor(private http:HttpClient) { }

  modificar(investigador:Investigador){
    let objeto = JSON.stringify({
      accion: "ModificarInvestigador",
      investigador: investigador
    })

    return this.http.post<boolean>(this.url, objeto);
  }
}
