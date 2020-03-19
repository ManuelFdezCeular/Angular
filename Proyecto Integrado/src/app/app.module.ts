import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnadirFenomenoParanormalComponent } from './FenomenoParanormal/anadir-fenomeno-paranormal/anadir-fenomeno-paranormal.component';
import { ModificarFenomenoParanormalComponent } from './FenomenoParanormal/modificar-fenomeno-paranormal/modificar-fenomeno-paranormal.component';
import { BorrarFenomenoParanormalComponent } from './FenomenoParanormal/borrar-fenomeno-paranormal/borrar-fenomeno-paranormal.component';
import { ListarInvestigadorComponent } from './Investigador/listar-investigador/listar-investigador.component';
import { AnadirInvestigadorComponent } from './Investigador/anadir-investigador/anadir-investigador.component';
import { ModificarInvestigadorComponent } from './Investigador/modificar-investigador/modificar-investigador.component';
import { BorrarInvestigadorComponent } from './Investigador/borrar-investigador/borrar-investigador.component';
import { ListadoFenomenoParanormalComponent } from './FenomenoParanormal/listado-fenomeno-paranormal/listado-fenomeno-paranormal.component';
import { InicioComponent } from './Inicio/inicio/inicio.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListadoFenomenoParanormalComponent,
    AnadirFenomenoParanormalComponent,
    ModificarFenomenoParanormalComponent,
    BorrarFenomenoParanormalComponent,
    ListarInvestigadorComponent,
    AnadirInvestigadorComponent,
    ModificarInvestigadorComponent,
    BorrarInvestigadorComponent,
    InicioComponent
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
