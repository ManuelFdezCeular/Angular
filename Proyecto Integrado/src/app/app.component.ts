import { Component } from '@angular/core';
import { UpdateMenuService } from './login/update-menu.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    idUsuario: -1
  }

  constructor(private servicioUpdateMenu: UpdateMenuService, private router: Router, private ruta: ActivatedRoute) {
    this.servicioUpdateMenu.ObtenerResLogin$().subscribe(resultado => {
      this.navBar.login = resultado.login;
      this.navBar.usuario = resultado.usuario;
      this.navBar.idUsuario = resultado.id
    })
  }

  cerrarLogin() {
    if (confirm("¿Deseas cerrar sesión?")) {
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

  cerrarLoginAlBorrar() {
    alert('A continuación se le borrará de la base de datos y volverá al inicio de la aplicación.')
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
