import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Inicio/inicio/inicio.component';
import { ListarInvestigadorComponent } from './Investigador/listar-investigador/listar-investigador.component';
import { DescripcionInvestigadorComponent } from './Investigador/descripcion-investigador/descripcion-investigador.component';
import { AnadirInvestigadorComponent } from './Investigador/anadir-investigador/anadir-investigador.component';
import { AnadirFenomenoParanormalComponent } from './FenomenoParanormal/anadir-fenomeno-paranormal/anadir-fenomeno-paranormal.component';
import { ModificarInvestigadorComponent } from './Investigador/modificar-investigador/modificar-investigador.component';
import { BorrarInvestigadorComponent } from './Investigador/borrar-investigador/borrar-investigador.component';
import { ModificarFenomenoParanormalComponent } from './FenomenoParanormal/modificar-fenomeno-paranormal/modificar-fenomeno-paranormal.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
