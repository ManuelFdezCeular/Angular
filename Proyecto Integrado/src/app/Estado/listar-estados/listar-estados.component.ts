import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Estado } from '../estado';
import { ListarEstadosService } from './listar-estados.service';

@Component({
  selector: 'app-listar-estados',
  templateUrl: './listar-estados.component.html',
  styleUrls: ['./listar-estados.component.css']
})
export class ListarEstadosComponent implements OnInit {

  public estados:Estado[];
  @Output() estadoSeleccionado = new EventEmitter();

  constructor(private servicioListar:ListarEstadosService) { }

  ngOnInit(){
    this.servicioListar.listarEstados().subscribe(resultado=>{
      console.log("estados:",resultado);
      this.estados = resultado;
      this.estadoSeleccionado.emit()
    })
  }
}
