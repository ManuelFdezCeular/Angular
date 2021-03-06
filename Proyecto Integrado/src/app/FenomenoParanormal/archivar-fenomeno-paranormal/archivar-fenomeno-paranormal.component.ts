import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { ArchivaFenParService } from './archivar-fen-par.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Archivo } from 'src/app/Archivo/archivo';
import { UpdateMenuService } from 'src/app/login/update-menu.service';
@Component({
  selector: 'app-archivar-fenomeno-paranormal',
  templateUrl: './archivar-fenomeno-paranormal.component.html',
  styleUrls: ['./archivar-fenomeno-paranormal.component.css']
})
export class ArchivarFenomenoParanormalComponent implements OnInit {

  public idFenPar:number = this.ruta.snapshot.params["idFenPar"];
  public fenPar:FenomenoParanormal;
  public archivo:Archivo;

  constructor(private servicioArchivar:ArchivaFenParService, private servicioUpdateLogin:UpdateMenuService, private router:Router, private ruta:ActivatedRoute) {
    this.servicioUpdateLogin.comprobarLogin();
    this.servicioArchivar.obtenerFenPar(this.idFenPar).subscribe(resultado=>{
      this.fenPar = resultado;
    },
    error => console.log(error));
    this.archivo = <Archivo>{};
  }

  ngOnInit() {
  }

  archivarFenomenoParanormal(){
    this.archivo.investigador_id = this.fenPar.investigador_id;
    this.archivo.lugarArchivo = this.fenPar.lugarOcurrencia;
    this.servicioArchivar.archivar(this.archivo).subscribe(resultado=>{
      if(resultado){
        this.servicioArchivar.borrar(this.idFenPar).subscribe(resultado=>{
          this.router.navigate(["/investigador/"+this.fenPar.investigador_id]);
        },
        error => console.log(error))
      }
    })
  }
}
