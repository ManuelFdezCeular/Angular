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

  public login: { email: string, clave: string };
  public loginIncorrecto: boolean = false;
  public verRecuperacion: boolean = false;
  public verReenvio: boolean = false;

  constructor(private servicioLogin: LoginService, private servicioUpdateMenu: UpdateMenuService, private router: Router, private ruta: ActivatedRoute) {
    this.login = { email: "", clave: "" };
  }

  ngOnInit() {
  }

  validar(log) {

    //  Generamos el hash para la clave:
    //const claveHash = CryptoJS.SHA3(log.clave).toString(CryptoJS.enc.Base64);
    const claveHash = btoa(sha3_256(log.clave));
    log.clave = claveHash;
    this.servicioLogin.getLogin(log).subscribe(
      res => {
        if ((res.estado) && (res.estado == "NO")) {
          alert("El correo o la clave son incorrectos");
          this.loginIncorrecto = true;
        } else {
          let verificado = (res.verificado == 1);
          if (!verificado) 
            if (confirm("Volver a enviar correo confirmación?"))
              this.reenviarCorreoConfirmacion();
          //else {//  Iniciamos sesión:
            this.loginIncorrecto = false;
            //  Guardamos el JWT en el sesionStorage:
            localStorage.setItem("JWT", res.JWT);
            localStorage.setItem('nombreUsuario', res.nombre + " " + res.apellidos);
            localStorage.setItem('idUsuario', res.id);
            localStorage.setItem('verificado', JSON.stringify(verificado));
            localStorage.setItem('email', res.email);

            this.servicioUpdateMenu.establecerLogin({ login: true, usuario: localStorage.nombreUsuario, idUsuario: res.id, verificado: verificado });
            //  Vamos a inicio: 
            this.router.navigate(['/']);
          }
        },
        error => console.log(error)
    )
  }

  mostrarFormularioContrasena() {
    this.verRecuperacion = !this.verRecuperacion;
  }

  reenviarCorreoConfirmacion() {
    this.servicioLogin.reenviarCorreo(this.login.email).subscribe(resultado => {
      if (resultado.correo == "ERROR") {
        alert("El correo ya ha sido verificado");
      } else {
        alert("Correo enviado con éxito.");
      }
    })
  }

  recuperarContrasena() {
    this.servicioLogin.recuperarContrasena(this.login.email).subscribe(resultado => {
    }, error => console.log(error))
  }
}