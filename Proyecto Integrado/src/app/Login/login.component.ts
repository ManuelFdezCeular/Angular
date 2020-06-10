import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateMenuService } from './update-menu.service';

//import * as CryptoJS from 'crypto-js';
import { sha3_256 } from 'js-sha3';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: {email:string, clave:string};
  public loginIncorrecto:boolean = false;
  public verRecuperacion:boolean = false;

  constructor(private servicioLogin:LoginService, private servicioUpdateMenu:UpdateMenuService, private router:Router, private ruta:ActivatedRoute) { 
    this.login = {email:"", clave: ""};
  }

  ngOnInit() {
  }

  validar(log) {
			
		//  Generamos el hash para la clave:
    //const claveHash = CryptoJS.SHA3(log.clave).toString(CryptoJS.enc.Base64);
    const claveHash =  btoa(sha3_256(log.clave));
    log.clave = claveHash;
    this.servicioLogin.getLogin(log).subscribe(
      res => {
        if ((res.estado) && (res.estado == "NO")) {
            alert("El correo o la clave son incorrectos");
            this.loginIncorrecto = true;
          } else if(res.verificado == 0){
            alert("El correo no ha sido verificado");
            this.loginIncorrecto = true;
          }else{//  Iniciamos sesión:
            this.loginIncorrecto = false;

            //  Guardamos el JWT en el sesionStorage:
						localStorage.setItem("JWT", res.JWT);
            localStorage.setItem('nombreUsuario', res.nombre + " " + res.apellidos);
            localStorage.setItem('idUsuario', res.id);

						this.servicioUpdateMenu.establecerLogin({login: true, usuario: localStorage.nombreUsuario, idUsuario: res.id});
						
            //  Vamos a inicio: 
					  this.router.navigate(['/']);
          }
      },
      error => console.log(error)
    )
  }

  mostrarFormularioContrasena(){
    this.verRecuperacion = !this.verRecuperacion;
  }

  recuperarContrasena(){
    this.servicioLogin.recuperarContrasena(this.login.email).subscribe(resultado=>{
    },error => console.log(error))
  }
}