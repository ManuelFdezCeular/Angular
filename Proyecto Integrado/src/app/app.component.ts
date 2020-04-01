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
    investigadores: {
      dropdown: true
    },
    archivos: {
      dropdown: true
    },
    login: false,
    usuario: "",
    perfil: -1
  }

  constructor(private servicioUpdateMenu:UpdateMenuService, private router:Router, private ruta:ActivatedRoute){
    this.servicioUpdateMenu.ObtenerResLogin$().subscribe(resultado=>{
      this.navBar.login = resultado.login;
      this.navBar.usuario = resultado.usuario;
    })
  }

  cerrarLogin(){
		if (confirm("¿Deseas cerrar sesión?")) {
			localStorage.JWT = "";
			localStorage.nombreUsuario = "";
			this.navBar.login = false;
			this.navBar.usuario = "";
			 //  Vamos a inicio:
			 this.router.navigate(['/']);
		}
	}
}
