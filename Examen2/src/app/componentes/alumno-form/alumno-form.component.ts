import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/modelos/alumno';
import { EstadocivilService } from 'src/app/servicios/estadocivil.service';
import { Estadocivil } from 'src/app/modelos/estadocivil';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {

  public idAlumno:number = this.ruta.snapshot.params["idAlumno"];
  public alumno:Alumno;
  public accion:string;
  public sexos:Estadocivil[];
  public estadosCiviles:Estadocivil[];

  constructor(private servicioAlumno:AlumnoService, private servicioEstSex:EstadocivilService, private router:Router, private ruta:ActivatedRoute) { 
    this.alumno = <Alumno>{};
    if(this.idAlumno == -1){
      this.accion = "Añadir";
    }else{
      this.accion = "Modificar";
      this.servicioAlumno.obtenerAlumno(this.idAlumno).subscribe(resultado=>{
        this.alumno = resultado;
      })
    }
    this.servicioEstSex.obtenerSexos().subscribe(resultado=>{
      this.sexos = resultado;
    })
    this.servicioEstSex.listarEstadoCivil().subscribe(resultado=>{
      this.estadosCiviles = resultado;
    })
  }

  ngOnInit() {
  }

  anadirOModificarAlumno(alumno:Alumno){
    if(this.idAlumno == -1){
      this.servicioAlumno.anadirAlumno(alumno).subscribe(resultado=>{
        this.router.navigate(['/alumnos']);
      })
    }else{
      this.servicioAlumno.modificarAlumno(alumno).subscribe(resultado=>{
        this.router.navigate(['/alumnos']);
      })
    }
  }

}
