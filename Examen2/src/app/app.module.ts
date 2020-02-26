import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AlumnosListadoComponent } from './componentes/alumnos-listado/alumnos-listado.component';
import { EstadoscivilesComponent } from './componentes/estadosciviles/estadosciviles.component';
import { AlumnoFormComponent } from './componentes/alumno-form/alumno-form.component';
import { AlumnoDelComponent } from './componentes/alumno-del/alumno-del.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AlumnosListadoComponent,
    EstadoscivilesComponent,
    AlumnoFormComponent,
    AlumnoDelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
