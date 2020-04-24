import { Component, OnInit } from '@angular/core';
import { AnadirFenomenoParanormalService } from './anadir-fenomeno-paranormal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { DescripcionInvestigadorService } from 'src/app/Investigador/descripcion-investigador/descripcion-investigador.service';
import { Investigador } from 'src/app/Investigador/investigador';
import { Estado } from 'src/app/Estado/estado';
import { ListarEstadosService } from 'src/app/Estado/listar-estados/listar-estados.service';
import { UpdateMenuService } from 'src/app/login/update-menu.service';
@Component({
  selector: 'app-anadir-fenomeno-paranormal',
  templateUrl: './anadir-fenomeno-paranormal.component.html',
  styleUrls: ['./anadir-fenomeno-paranormal.component.css']
})
export class AnadirFenomenoParanormalComponent implements OnInit {

  public fenPar:FenomenoParanormal;
  public investigador:Investigador;
  public estados:Estado[];
  public idInvestigador:number =  this.ruta.snapshot.params["idInvestigador"];

  constructor(private anadirServicio:AnadirFenomenoParanormalService, private servicioUpdateLogin:UpdateMenuService, private servicioListar:ListarEstadosService, private servicioInvestigador:DescripcionInvestigadorService, private router:Router, private ruta:ActivatedRoute) {
    this.servicioUpdateLogin.comprobarLogin();
    this.fenPar = <FenomenoParanormal>{};
    this.investigador = <Investigador>{};
  }

  ngOnInit() {
    this.servicioInvestigador.obtenerInvestigador(this.idInvestigador).subscribe(resultado=>{
      this.investigador = resultado;
    },
    error => console.log(error))
    this.servicioListar.listarEstados().subscribe(resultado=>{
      this.estados = resultado;
    },
    error => console.log(error))
  }

  anadirFenomenoParanormal(){
    this.fenPar.investigador_id = this.idInvestigador;
    this.anadirServicio.anadirFenPar(this.fenPar).subscribe(resultado=>{
      this.router.navigate(["/investigador/"+this.idInvestigador]);
    },
    error => console.log(error))
  }
}
