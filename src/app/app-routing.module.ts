import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ConsultaComponent } from './views/consulta/consulta.component';
import { ResultadoComponent } from './views/resultado/resultado.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "consulta",
    component: ConsultaComponent
  },
  {
    path: "consulta/resultado",
    component: ResultadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
