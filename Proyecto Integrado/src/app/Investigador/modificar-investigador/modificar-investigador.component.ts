import { Component, OnInit } from '@angular/core';
import { Investigador } from '../investigador';
import { ModificarInvestigadorService } from './modificar-investigador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DescripcionInvestigadorService } from '../descripcion-investigador/descripcion-investigador.service';
import { LoginService } from 'src/app/login/login.service';
import { UpdateMenuService } from 'src/app/login/update-menu.service';

@Component({
  selector: 'app-modificar-investigador',
  templateUrl: './modificar-investigador.component.html',
  styleUrls: ['./modificar-investigador.component.css']
})
export class ModificarInvestigadorComponent implements OnInit {

  public investigador:Investigador;
  public id:number = this.ruta.snapshot.params["id"];


  constructor(private servicioModificarServicio:ModificarInvestigadorService, private servicioUpdateLogin:UpdateMenuService, private servicioDescripcionInvestigador:DescripcionInvestigadorService, private router:Router, private ruta:ActivatedRoute) {
    this.servicioUpdateLogin.comprobarLogin();
    this.servicioDescripcionInvestigador.obtenerInvestigador(this.id).subscribe(resultado=>{
      this.investigador = resultado;
    })
  }

  ngOnInit() {
  }

  modificarInvestigador(){
    this.servicioModificarServicio.modificar(this.investigador).subscribe(resultado=>{
      this.router.navigate(["/investigador/"+this.id]);
    })
  }
}
