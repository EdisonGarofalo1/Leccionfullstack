import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [ 
  {
    path:'persona',
    loadChildren:()=> import('../../modules/persona/persona.module').then(m=>m.PersonaModule)

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SharedRoutingModule { }
