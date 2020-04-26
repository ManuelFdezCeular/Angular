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
  public busqueda: {lugar:string, provincia:string, comunidadAutonoma:string};

  constructor(private servicioListarFenPar:ListadoFenParService) { 
    this.busqueda = {lugar:"", provincia:"", comunidadAutonoma:""};
  }

  ngOnInit(){
    this.servicioListarFenPar.listarFenPar().subscribe(resultado=>{
      this.fenomenosParanormales = resultado;
    },
    error => console.log(error))
  }

  buscar(){
    console.log("buscar:", this.busqueda);
    this.servicioListarFenPar.filtrarFenPar(this.busqueda.lugar, this.busqueda.provincia, this.busqueda.comunidadAutonoma).subscribe(resultado=>{
      console.log("resultado busqueda:", resultado);
      this.fenomenosParanormales = resultado;
    })
  }
}
