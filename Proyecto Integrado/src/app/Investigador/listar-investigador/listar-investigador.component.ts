import { Component, OnInit } from '@angular/core';
import { Investigador } from '../investigador';
import { ListarInvestigadorService } from './listar-investigador.service';
import { UpdateMenuService } from 'src/app/login/update-menu.service';

@Component({
  selector: 'app-listar-investigador',
  templateUrl: './listar-investigador.component.html',
  styleUrls: ['./listar-investigador.component.css']
})
export class ListarInvestigadorComponent implements OnInit {

  public investigadores:Investigador[];
  public busqueda: {nombre:string, residencia:string};

  constructor(private servicioListar:ListarInvestigadorService, private servicioUpdateLogin:UpdateMenuService) { 
    this.servicioUpdateLogin.comprobarLogin();
    this.busqueda = {nombre:"", residencia:""};
    console.log(this.busqueda);
  }

  ngOnInit() {
    this.servicioListar.obtenerInvestigadores().subscribe(resultado=>{
      this.investigadores = resultado;
    },
    error => console.log(error))
  }

  buscar(){
    console.log("nombre: "+ this.busqueda);
    this.servicioListar.filtrarInvestigador(this.busqueda.nombre, this.busqueda.residencia).subscribe(resultado=>{
      this.investigadores = resultado;
    },
    error=>console.log(error))
  }

}
