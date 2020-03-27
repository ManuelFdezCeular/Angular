import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Archivo } from 'src/app/Archivo/archivo';
import { FenomenoParanormal } from '../fenomeno-paranormal';

@Injectable({
  providedIn: 'root'
})
export class ArchivaFenParService {

  url="http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  archivar(archivo:Archivo){
    let objeto = JSON.stringify({
      accion: "ArchivarFenPar",
      archivo: archivo
    })
    console.log("objeto:", objeto);

    return this.http.post<boolean>(this.url, objeto);
  }

  borrar(id:number){
    let objeto = JSON.stringify({
      accion: "BorrarFenPar",
      id: id
    })

    console.log("borrar");
    
    return this.http.post<boolean>(this.url, objeto);
  }

  obtenerFenPar(id:number){
    let objeto = JSON.stringify({
      accion: 'FenomenoParanormal',
      id: id
    })

    return this.http.post<FenomenoParanormal>(this.url, objeto);
  }
}
