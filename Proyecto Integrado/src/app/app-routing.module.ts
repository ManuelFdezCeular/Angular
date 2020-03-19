import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Inicio/inicio/inicio.component';
import { ListarInvestigadorComponent } from './Investigador/listar-investigador/listar-investigador.component';
import { ListadoFenomenoParanormalComponent } from './FenomenoParanormal/listado-fenomeno-paranormal/listado-fenomeno-paranormal.component';


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
    path: "fenomenosParanormales",
    component: ListadoFenomenoParanormalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
