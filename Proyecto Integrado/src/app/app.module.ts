import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnadirFenomenoParanormalComponent } from './FenomenoParanormal/anadir-fenomeno-paranormal/anadir-fenomeno-paranormal.component';
import { ModificarFenomenoParanormalComponent } from './FenomenoParanormal/modificar-fenomeno-paranormal/modificar-fenomeno-paranormal.component';
import { ListarInvestigadorComponent } from './Investigador/listar-investigador/listar-investigador.component';
import { AnadirInvestigadorComponent } from './Investigador/anadir-investigador/anadir-investigador.component';
import { ModificarInvestigadorComponent } from './Investigador/modificar-investigador/modificar-investigador.component';
import { BorrarInvestigadorComponent } from './Investigador/borrar-investigador/borrar-investigador.component';
import { InicioComponent } from './Inicio/inicio/inicio.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DescripcionInvestigadorComponent } from './Investigador/descripcion-investigador/descripcion-investigador.component';
import { ListadoInvestigadorFenParComponent } from './FenomenoParanormal/listado-investigador-fen-par/listado-investigador-fen-par.component';
import { ListadoFenomenosParanormalesComponent } from './FenomenoParanormal/listado-fenomenos-paranormales/listado-fenomenos-paranormales.component';
import { ArchivarFenomenoParanormalComponent } from './fenomenoParanormal/archivar-fenomeno-paranormal/archivar-fenomeno-paranormal.component';

@NgModule({
  declarations: [
    AppComponent,
    AnadirFenomenoParanormalComponent,
    ModificarFenomenoParanormalComponent,
    ListarInvestigadorComponent,
    AnadirInvestigadorComponent,
    ModificarInvestigadorComponent,
    BorrarInvestigadorComponent,
    InicioComponent,
    DescripcionInvestigadorComponent,
    ListadoInvestigadorFenParComponent,
    ListadoFenomenosParanormalesComponent,
    ArchivarFenomenoParanormalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    //NgbModule
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
