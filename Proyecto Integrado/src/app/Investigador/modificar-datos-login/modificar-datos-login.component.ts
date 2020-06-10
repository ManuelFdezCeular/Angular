import { Component, OnInit, Input } from '@angular/core';
import { ModificarDatosLoginService } from './modificar-datos-login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Investigador } from '../investigador';
//import * as CryptoJS from 'crypto-js';
import { LoginService } from 'src/app/login/login.service';
import { UpdateMenuService } from 'src/app/login/update-menu.service';

import { sha3_256 } from 'js-sha3';

@Component({
  selector: 'app-modificar-datos-login',
  templateUrl: './modificar-datos-login.component.html',
  styleUrls: ['./modificar-datos-login.component.css']
})
export class ModificarDatosLoginComponent implements OnInit {

  public investigador:Investigador;
  @Input() idInvestigador:number;
  public modificar;
  public correoCorrecto:boolean = true;
  public checkCorreo:boolean = false;

  constructor(private servicioModificarDatosLogin:ModificarDatosLoginService, private servicioUpdateLogin:UpdateMenuService, private servicioLogin:LoginService, private router:Router, private ruta:ActivatedRoute) {
    this.modificar = {clave: "", clave1_SIN: "", clave2_SIN: ""};
    this.servicioUpdateLogin.comprobarLogin();
  }

  ngOnInit() {
  }
  
  modificarDatos(){
    //this.modificar.clave = CryptoJS.SHA3(this.modificar.clave1_SIN).toString(CryptoJS.enc.Base64);
    this.modificar.clave  =  btoa(sha3_256(this.modificar.clave1_SIN));
    this.servicioModificarDatosLogin.modificarDatosLogin(this.modificar.clave, this.modificar.email).subscribe(resultado=>{
      this.router.navigate(['/investigador/'+this.idInvestigador]);
    },
    error => console.log(error))
  }
}
