import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/modelos/alumno';

@Component({
  selector: 'app-alumno-del',
  templateUrl: './alumno-del.component.html',
  styleUrls: ['./alumno-del.component.css']
})
export class AlumnoDelComponent implements OnInit {

  @Input() alumno:Alumno;

  @Output() noMostrar = new EventEmitter();

  constructor(private servicioAlumno:AlumnoService, private router:Router, private ruta:ActivatedRoute) {}

  ngOnInit() {
    console.log("alumno:", this.alumno);
  }

  borraAlumno(){
    this.servicioAlumno.borrarAlumno(this.alumno.ID).subscribe(resultado=>{
      this.noMostrar.emit(resultado);
    })
  }

  noMostrarDiv(){
    this.noMostrar.emit(null);
  }
}
