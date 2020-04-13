import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Inicio/inicio/inicio.component';
import { ListarInvestigadorComponent } from './Investigador/listar-investigador/listar-investigador.component';
import { DescripcionInvestigadorComponent } from './Investigador/descripcion-investigador/descripcion-investigador.component';
import { AnadirInvestigadorComponent } from './Investigador/anadir-investigador/anadir-investigador.component';
import { AnadirFenomenoParanormalComponent } from './FenomenoParanormal/anadir-fenomeno-paranormal/anadir-fenomeno-paranormal.component';
import { ModificarInvestigadorComponent } from './Investigador/modificar-investigador/modificar-investigador.component';
import { ModificarFenomenoParanormalComponent } from './FenomenoParanormal/modificar-fenomeno-paranormal/modificar-fenomeno-paranormal.component';
import { ArchivarFenomenoParanormalComponent } from './fenomenoParanormal/archivar-fenomeno-paranormal/archivar-fenomeno-paranormal.component';
import { LoginComponent } from './login/login.component';
import { ListarArchivoComponent } from './Archivo/listar-archivo/listar-archivo.component';
import { ModificarDatosLoginComponent } from './Investigador/modificar-datos-login/modificar-datos-login.component';


const routes: Routes = [
  {
    path: "",
    component: InicioComponent
  },
  {
    path: "investigadores",
    component: ListarInvestigadorComponent
  },
  {
    path: "investigador/:id",
    component: DescripcionInvestigadorComponent
  },
  {
    path: "anadir-investigador",
    component: AnadirInvestigadorComponent
  },
  {
    path: "modificar-investigador/:id",
    component: ModificarInvestigadorComponent
  },
  {
    path: "anadir-fenomenoParanormal/:idInvestigador",
    component: AnadirFenomenoParanormalComponent
  },
  {
    path: "modificar-fenomenoParanormal/:idFenPar/:idInvestigador",
    component: ModificarFenomenoParanormalComponent
  },
  {
    path: "archivar-fenomenoParanormal/:idFenPar",
    component: ArchivarFenomenoParanormalComponent
  },
  {
    path: "listar-archivos",
    component: ListarArchivoComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "modificar-login/:id",
    component: ModificarDatosLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
