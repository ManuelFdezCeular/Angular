import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../modelos/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private urlAccion:string = "http://localhost/Servicios/servicios.php";

  constructor(private http:HttpClient) { }

  listarAlumnos(){
    let alumnos = JSON.stringify({
      accion: 3
    })

    return this.http.post<Alumno[]>(this.urlAccion, alumnos);
  }

  obtenerAlumno(id:number){
    let al = JSON.stringify({
      accion: 4,
      ID: id
    })

    return this.http.post<Alumno>(this.urlAccion, al);
  }

  anadirAlumno(alumno:Alumno){
    let al = JSON.stringify({
      accion: 0,
      NOMBRE: alumno.NOMBRE,
      APELLIDOS: alumno.APELLIDOS,
      SEXO: alumno.SEXO,
      FECHA_NACIMIENTO: alumno.FECHA_NACIMIENTO,
      ESTADO_CIVIL: alumno.ESTADO_CIVIL
    })

    return this.http.post(this.urlAccion, al);
  }

  modificarAlumno(alumno:Alumno){
    let al = JSON.stringify({
      accion: 1,
      ID: alumno.ID,
      NOMBRE: alumno.NOMBRE,
      APELLIDOS: alumno.APELLIDOS,
      SEXO: alumno.SEXO,
      FECHA_NACIMIENTO: alumno.FECHA_NACIMIENTO,
      ESTADO_CIVIL: alumno.ESTADO_CIVIL
    })

    return this.http.post<Alumno>(this.urlAccion, al);
  }

  borrarAlumno(id:number){
    let al = JSON.stringify({
      accion: 2,
      ID: id
    })

    return this.http.post(this.urlAccion, al);
  }

}
