import { Component, OnInit } from '@angular/core';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { ListadoFenParService } from './listado-fen-par.service';
import { ComunidadAutonoma } from '../comunidad-autonoma';
import { Provincia } from '../provincia';
import { Localidad } from '../localidad';

@Component({
  selector: 'app-listado-fenomenos-paranormales',
  templateUrl: './listado-fenomenos-paranormales.component.html',
  styleUrls: ['./listado-fenomenos-paranormales.component.css']
})
export class ListadoFenomenosParanormalesComponent implements OnInit {

  public fenomenosParanormales:FenomenoParanormal[];
  public busqueda: {lugar:string, provincia:string, comunidadAutonoma:string};
  public mostrar:boolean = false;
  public mostrarSelects:boolean = false;
  public comunidades:ComunidadAutonoma[];
  public provincias:Provincia[];
  public localidades:Localidad[];
  public comunidad:ComunidadAutonoma;
  public provincia:Provincia;
  public localidad:Localidad;

  constructor(private servicioListarFenPar:ListadoFenParService) { 
    this.busqueda = {lugar:"", provincia:"", comunidadAutonoma:""};
    this.servicioListarFenPar.listarComunidades().subscribe(resultado=>{
      this.comunidades = resultado;
    },
    error => console.log(error))
    this.comunidad = <ComunidadAutonoma>{};
    this.provincia = <Provincia>{};
    this.localidad = <Localidad>{};
  }

  ngOnInit(){
    this.servicioListarFenPar.listarFenPar().subscribe(resultado=>{
      this.fenomenosParanormales = resultado;
    },
    error => console.log(error))
  }

  buscar(){
    this.servicioListarFenPar.filtrarFenPar(this.busqueda.lugar, this.busqueda.provincia, this.busqueda.comunidadAutonoma).subscribe(resultado=>{
      this.fenomenosParanormales = resultado;
    },
    error => console.log(error))
  }

  cargarProvincias(){
    this.servicioListarFenPar.listarProvinciasDeComunidad(this.comunidad.codigo).subscribe(resultado=>{
      this.provincias = resultado;
      this.localidades = [];
    },
    error => console.log(error))
    this.busqueda.comunidadAutonoma = this.comunidad.nombre;
    this.buscar();
  }

  cargarLocalidades(){
    this.servicioListarFenPar.listarLocalidadesDeProvincia(this.provincia.codigo).subscribe(resultado=>{
      this.localidades = resultado;
    },
    error => console.log(error))
    this.busqueda.provincia = this.provincia.nombre;
    this.buscar();
  }

  busquedaConSelects(){
    this.busqueda.lugar = this.localidad.nombre;
    this.buscar();
  }

  mostrarDiv(){
    if(!this.mostrar){
      this.mostrar = true;
      this.mostrarSelects = false;
      this.provincias = [];
      this.localidades = [];
      this.busqueda = {lugar:"", provincia:"", comunidadAutonoma:""};
      this.buscar();
    }else {
      this.mostrar = false;
    }
  }

  mostrarDivSelects(){
    if(!this.mostrarSelects){
      this.mostrarSelects = true;
      this.mostrar = false;
      this.comunidad = <ComunidadAutonoma>{};
      this.provincia = <Provincia>{};
      this.localidad = <Localidad>{};
      this.busqueda = {lugar:"", provincia:"", comunidadAutonoma:""};
      this.buscar();
    }else {
      this.mostrarSelects = false;
    }
  }
}
