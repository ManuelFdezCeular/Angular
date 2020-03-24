import { Component, OnInit } from '@angular/core';
import { Investigador } from '../investigador';
import { ListarInvestigadorService } from './listar-investigador.service';

@Component({
  selector: 'app-listar-investigador',
  templateUrl: './listar-investigador.component.html',
  styleUrls: ['./listar-investigador.component.css']
})
export class ListarInvestigadorComponent implements OnInit {

  public investigadores:Investigador[];

  constructor(private servicioListar:ListarInvestigadorService) { }

  ngOnInit() {
    this.servicioListar.obtenerInvestigadores().subscribe(resultado=>{
      this.investigadores = resultado;
    })
  }

}