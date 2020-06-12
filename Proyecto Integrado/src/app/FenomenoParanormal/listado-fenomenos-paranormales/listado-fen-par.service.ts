import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { environment } from 'src/environments/environment';
import { ComunidadAutonoma } from '../comunidad-autonoma';
import { Provincia } from '../provincia';
import { Localidad } from '../localidad';

@Injectable({
  providedIn: 'root'
})
export class ListadoFenParService {
  
  url = environment.urlAbierta;

  constructor(private http:HttpClient) { }

  listarFenPar(){
    let objeto = JSON.stringify({
      servicio: "FenomenosParanormales"
    })

    return this.http.post<FenomenoParanormal[]>(this.url, objeto);
  }

  filtrarFenPar(lugar:string, provincia:string, comunidad:string){
    let objeto = JSON.stringify({
      servicio: "FiltrarFenPar",
      lugar,
      provincia,
      comunidad
    })

    return this.http.post<FenomenoParanormal[]>(this.url, objeto);
  }

  listarComunidades(){
    let objeto = JSON.stringify({
      servicio: "ListarComunidades"
    })

    return this.http.post<ComunidadAutonoma[]>(this.url, objeto);
  }

  listarProvinciasDeComunidad(codigo:number){
    let objeto = JSON.stringify({
      servicio: "ListarProvincias",
      codigo
    })

    return this.http.post<Provincia[]>(this.url, objeto);
  }

  listarLocalidadesDeProvincia(codigo:number){
    let objeto = JSON.stringify({
      servicio: "ListarLocalidades",
      codigo
    })

    return this.http.post<Localidad[]>(this.url, objeto);
  }
}
