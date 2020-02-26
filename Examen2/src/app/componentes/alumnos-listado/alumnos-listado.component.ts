import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/modelos/alumno';
import { AlumnoService } from 'src/app/servicios/alumno.service';

@Component({
  selector: 'app-alumnos-listado',
  templateUrl: './alumnos-listado.component.html',
  styleUrls: ['./alumnos-listado.component.css']
})
export class AlumnosListadoComponent implements OnInit {

  public listaAlumnos:Alumno[];
  public mostrar:boolean = false;
  public alumno:Alumno;

  constructor(private servicioAlumno:AlumnoService) { 
    this.servicioAlumno.listarAlumnos().subscribe(resultado=>{
      console.log(resultado);
      this.listaAlumnos = resultado;
      console.log("alumnos:",this.listaAlumnos)
    })
  }

  ngOnInit() {
  }

  mostrarDiv(alumnoABorrar:Alumno){
    this.alumno = alumnoABorrar;
    console.log("alumno a borrar",this.alumno);
    this.mostrar = true;
  }

  cancelarDiv(event){
    this.mostrar = false;
    if(event != null)
      this.listaAlumnos = event;
  }
}
