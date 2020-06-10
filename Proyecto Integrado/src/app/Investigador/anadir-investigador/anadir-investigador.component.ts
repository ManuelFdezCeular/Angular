import { Component, OnInit } from '@angular/core';
import { AnadirInvestigadorService } from './anadir-investigador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

//import * as CryptoJS from 'crypto-js';
import { sha3_256 } from 'js-sha3';

@Component({
  selector: 'app-anadir-investigador',
  templateUrl: './anadir-investigador.component.html',
  styleUrls: ['./anadir-investigador.component.css']
})
export class AnadirInvestigadorComponent implements OnInit {

  public correoCorrecto:boolean = true;
  public checkCorreo:boolean = false;
  public registro:{nombre:string, apellidos:string, clave:string, email:string, dni:string, telefono:string, residencia:string, imagen:string};
  public contrasena:string;

  constructor(private servicioAnadirInvestigador:AnadirInvestigadorService, private servicioLogin:LoginService, private router:Router, private ruta:ActivatedRoute) {
    this.registro = {
      nombre: "",
      apellidos: "",
      clave: "",
      email: "",
      dni: "",
      telefono: "",
      residencia: "",
      imagen: ""
    };
    this.contrasena = "";
  }

  ngOnInit() {
  }

  anadirInvestigador(){
    if(this.contrasena == this.registro.clave){
      //const claveHash = CryptoJS.SHA3(this.registro.clave).toString(CryptoJS.enc.Base64);
      const claveHash =  btoa(sha3_256(this.contrasena));
      this.registro.clave = claveHash;
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
				//  Alza la bandera si el correo está libre, o no:
				this.correoCorrecto = (res.estado && res.estado == "libre");
				this.checkCorreo = false;
			},
			error=>console.log(error)
		);
  }
  
  leerImagen(ficheros){
		// Cogemos el primer archivo
		const archivo = ficheros[0];
		// Creamos la instancia de FileReader
		let reader = new FileReader();
		//  Hacemos un apuntador al registro:
		let imagenPerfil = this.registro;
		let creaImagenRedu = this.creaImagenRedu;
		
		reader.onload = function(){
			imagenPerfil.imagen = (<string>reader.result).split(",")[1];
			//  Creamos la imagen reducida:
			creaImagenRedu(imagenPerfil.imagen, imagenPerfil);
    }
    reader.readAsDataURL(archivo);
	}

	creaImagenRedu(datos, imagenPerfil:any){
		let imagen = new Image();
		imagen.onload = ()=> {
      //  Creamos el canvas:
      let canvasRedu = document.createElement('canvas');
      let ctxRedu = canvasRedu.getContext("2d");
      //  Le damos unas dimensiones:
      canvasRedu.width = 100;
      canvasRedu.height = 100;
      ctxRedu.drawImage(imagen, 0, 0, canvasRedu.width, canvasRedu.height);
      imagenPerfil.imagen = canvasRedu.toDataURL("image/jpeg").split(",")[1];
    }
    imagen.src = "data:image/jpeg;base64," + datos;
	}
}
