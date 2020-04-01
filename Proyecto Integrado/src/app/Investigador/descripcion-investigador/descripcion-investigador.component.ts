import { Component, OnInit } from '@angular/core';
import { DescripcionInvestigadorService } from './descripcion-investigador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Investigador } from '../investigador';
import { UpdateMenuService } from 'src/app/login/update-menu.service';

@Component({
  selector: 'app-descripcion-investigador',
  templateUrl: './descripcion-investigador.component.html',
  styleUrls: ['./descripcion-investigador.component.css']
})
export class DescripcionInvestigadorComponent implements OnInit {

  public investigador:Investigador;
  public mostrar:boolean = false;
  public login: {login: boolean, usuario: string, idUsuario: number};
  public mostrarOpciones: boolean = false;

  constructor(private servicioDescripcionInvestigador:DescripcionInvestigadorService, private servicioUpdateMenu:UpdateMenuService, private router:Router, private ruta:ActivatedRoute) {
    this.investigador = <Investigador>{};
    this.login = this.servicioUpdateMenu.ObtenerInicial();
    console.log("devuelve el servicio:", this.servicioUpdateMenu.ObtenerInicial());
    this.servicioUpdateMenu.ObtenerResLogin$().subscribe(resultado=>{
      console.log("resultado login:", resultado);
      this.login.login = resultado.login;
      this.login.usuario = resultado.usuario;
      this.login.idUsuario = resultado.idUsuario;
      console.log("login asignado: ", this.login);
    })
  }

  ngOnInit(){
    const id:number = this.ruta.snapshot.params["id"];
    console.log("login en on init",this.login);
    this.mostrarOpciones = (this.login.idUsuario == id);
    this.servicioDescripcionInvestigador.obtenerInvestigador(id).subscribe(resultado=>{
      console.log(resultado);
      this.investigador = resultado;
    })

  }

  mostrarDiv(investigadorABorrar:Investigador){
    this.investigador = investigadorABorrar;
    this.mostrar = true;
  }

  cancelarDiv(event){
    this.mostrar = false;
  }
}
