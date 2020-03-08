import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FenomenoParanormalComponent } from './fenomeno-paranormal/fenomeno-paranormal.component';
import { ListadoFenomenoParanormalComponent } from './listado-fenomeno-paranormal/listado-fenomeno-paranormal.component';
import { AnadirFenomenoParanormalComponent } from './FenomenoParanormal/anadir-fenomeno-paranormal/anadir-fenomeno-paranormal.component';
import { ModificarFenomenoParanormalComponent } from './FenomenoParanormal/modificar-fenomeno-paranormal/modificar-fenomeno-paranormal.component';
import { BorrarFenomenoParanormalComponent } from './FenomenoParanormal/borrar-fenomeno-paranormal/borrar-fenomeno-paranormal.component';

@NgModule({
  declarations: [
    AppComponent,
    FenomenoParanormalComponent,
    ListadoFenomenoParanormalComponent,
    AnadirFenomenoParanormalComponent,
    ModificarFenomenoParanormalComponent,
    BorrarFenomenoParanormalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
