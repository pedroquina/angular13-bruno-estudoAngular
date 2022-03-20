import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Formulario1Component } from './formulario1/formulario1.component';
import { Formulario2Component } from './formulario2/formulario2.component';
  //      url rota            nome componente

const routes: Routes = [
  { path: '', redirectTo: '/formulario1', pathMatch: 'full' },
  { path: 'formulario1',  component: Formulario1Component },
  { path: 'formulario2',  component: Formulario2Component }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
