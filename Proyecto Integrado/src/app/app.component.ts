import { Component } from '@angular/core';
import { UpdateMenuService } from './login/update-menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProyectoIntegrado';

  public navBar = {
    isNavbarCollapsed: true,
    dropdown: true,
    login: false,
    usuario: "",
    idUsuario: -1,
    verificado: false
  }

  constructor(private servicioUpdateMenu: UpdateMenuService, private loginService:LoginService, private router: Router, private ruta: ActivatedRoute) {
    this.servicioUpdateMenu.ObtenerResLogin$().subscribe(resultado => {
      this.navBar.login = resultado.login;
      this.navBar.usuario = resultado.usuario;
      this.navBar.idUsuario = resultado.id;
      this.navBar.verificado = resultado.verificado;
    },error => console.log(error))
    
  }

  reenviarCorreo(){
      this.loginService.reenviarCorreo(localStorage.email).subscribe(resultado => {
        if(resultado.correo != "enviado")
          alert("Se ha enviado a su dirección de correo. La próxima vez que entre en la página podrá acceder a todos los servicios.");
        else
          alert("Error al enviar el correo");
      })
    //this.loginService.reenviarCorreo()
  }

  cerrarLogin() {
    if (confirm("¿Deseas cerrar sesión?")) {
      localStorage.JWT = "";
      localStorage.nombreUsuario = "";
      localStorage.idUsuario = -1;
      this.navBar.login = false;
      this.navBar.usuario = "";
      this.navBar.idUsuario = -1;
      this.navBar.verificado = false;
      //  Vamos a inicio:
      this.router.navigate(['/']);
    }
  }

  cerrarLoginAlBorrar() {
    alert('A continuación se le borrará de la base de datos y volverá al inicio de la aplicación.');
    localStorage.JWT = "";
    localStorage.nombreUsuario = "";
    localStorage.idUsuario = -1;
    this.navBar.login = false;
    this.navBar.usuario = "";
    this.navBar.idUsuario = -1;
    //  Vamos a inicio:
    this.router.navigate(['/']);
  }
}
