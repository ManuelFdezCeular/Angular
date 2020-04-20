import { Component, OnInit } from '@angular/core';
import { AnadirInvestigadorService } from './anadir-investigador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-anadir-investigador',
  templateUrl: './anadir-investigador.component.html',
  styleUrls: ['./anadir-investigador.component.css']
})
export class AnadirInvestigadorComponent implements OnInit {

  public correoCorrecto:boolean = true;
  public checkCorreo:boolean = false;
  public registro:{nombre:string, apellidos:string, clave:string, clave2:string, email:string, dni:string, telefono:string, residencia:string};

  constructor(private servicioAnadirInvestigador:AnadirInvestigadorService, private servicioLogin:LoginService, private router:Router, private ruta:ActivatedRoute) {
    this.registro = {
      nombre: "",
      apellidos: "",
      clave: "",
      clave2: "",
      email: "",
      dni: "",
      telefono: "",
      residencia: ""
    }
  }

  ngOnInit() {
  }

  anadirInvestigador(){
    if(this.registro.clave == this.registro.clave2){
      const claveHash = CryptoJS.SHA3(this.registro.clave).toString(CryptoJS.enc.Base64);
      this.registro.clave = claveHash;
      console.log("registro");
      this.servicioAnadirInvestigador.anadir(this.registro).subscribe(resultado=>{
        this.router.navigate(["/"]);
      },
      error=>console.log(error));
    }
  }

  checkEmail(email:string){
		this.checkCorreo = true;
		this.servicioLogin.checkCorreo(email).subscribe(
			res=>{
				console.log(res);
				//  Alza la bandera si el correo está libre, o no:
				this.correoCorrecto = (res.estado && res.estado == "libre");
				this.checkCorreo = false;
			},
			error=>console.log(error)
		);
	}
}
