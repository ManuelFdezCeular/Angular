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
    this.servicioUpdateMenu.comprobarLogin();
    this.investigador = <Investigador>{};
    this.login = this.servicioUpdateMenu.ObtenerInicial();
    const id:number = this.ruta.snapshot.params["id"];
    this.servicioUpdateMenu.ObtenerResLogin$().subscribe(resultado=>{
      this.login.login = resultado.login;
      this.login.usuario = resultado.usuario;
      this.login.idUsuario = resultado.idUsuario;
      this.mostrarOpciones = (this.login.idUsuario == id);
    })
    this.servicioDescripcionInvestigador.obtenerInvestigador(id).subscribe(resultado=>{
      this.investigador = resultado;
    },
    error => console.log(error))
  }

  ngOnInit(){}

  mostrarDiv(investigadorABorrar:Investigador){
    this.investigador = investigadorABorrar;
    this.mostrar = true;
  }

  cancelarDiv(event){
    this.mostrar = false;
  }
}
