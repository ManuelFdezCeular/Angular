import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from '../Modelos/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  private urlAccion:string = "http://localhost/petClinic/servicios.php";

  constructor(private http:HttpClient) { }

  getEspecialidades(){
    let especialidad = {
      accion: "ListarSpecialties"
    }

    return this.http.post<Especialidad[]>(this.urlAccion, especialidad);
  }
}
