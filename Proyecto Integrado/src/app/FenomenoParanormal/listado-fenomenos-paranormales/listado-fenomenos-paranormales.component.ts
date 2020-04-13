import { Component, OnInit } from '@angular/core';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { ListadoFenParService } from './listado-fen-par.service';

@Component({
  selector: 'app-listado-fenomenos-paranormales',
  templateUrl: './listado-fenomenos-paranormales.component.html',
  styleUrls: ['./listado-fenomenos-paranormales.component.css']
})
export class ListadoFenomenosParanormalesComponent implements OnInit {

  public fenomenosParanormales:FenomenoParanormal[];

  constructor(private servicioListarFenPar:ListadoFenParService) { }

  ngOnInit(){
    this.servicioListarFenPar.listarFenPar().subscribe(resultado=>{
      this.fenomenosParanormales = resultado;
    })
  }

}
