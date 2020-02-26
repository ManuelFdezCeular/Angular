import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosListadoComponent } from './componentes/alumnos-listado/alumnos-listado.component';
import { EstadoscivilesComponent } from './componentes/estadosciviles/estadosciviles.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AlumnoFormComponent } from './componentes/alumno-form/alumno-form.component';
import { AlumnoDelComponent } from './componentes/alumno-del/alumno-del.component';


const routes: Routes = [
  {
    path: "",
    component: InicioComponent
  },
  {
    path: "alumnos",
    component: AlumnosListadoComponent
  },
  {
    path: "estadoCivil",
    component: EstadoscivilesComponent
  },
  {
    path: "anadirAlumno/:idAlumno",
    component: AlumnoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
