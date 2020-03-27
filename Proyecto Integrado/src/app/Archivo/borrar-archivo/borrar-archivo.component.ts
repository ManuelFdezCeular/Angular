import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Archivo } from '../archivo';
import { BorrarArchivoService } from './borrar-archivo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-borrar-archivo',
  templateUrl: './borrar-archivo.component.html',
  styleUrls: ['./borrar-archivo.component.css']
})
export class BorrarArchivoComponent implements OnInit {

  @Input() archivo:Archivo;

  @Output() noMostrar = new EventEmitter();

  constructor(private servicioBorrar:BorrarArchivoService, private router:Router, private ruta:ActivatedRoute) {}

  ngOnInit() {
  }

  borrarArchivo(){
    this.servicioBorrar.borrar(this.archivo.id).subscribe(resultado=>{
      this.noMostrar.emit(resultado);
    })
  }

  noMostrarDiv(){
    this.noMostrar.emit(null);
  }

}
