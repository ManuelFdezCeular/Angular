import { Injectable } from '@angular/core';
import { Visit } from '../Modelos/visit';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private datos: Visit[];

  constructor() {
    this.datos = [];
  }

  guardarDatos(data){
    this.datos = data;
  }

  leerDatos(){
    return this.datos;
  }

  datosVisit = {
    guardarDatos:(dat)=> this.datos = dat,
    leerDatos:()=> this.datos
  }

}
