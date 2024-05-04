import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './page/add/add.component';
import { ListComponent } from './page/list/list.component';





const rutas: Routes = [
  {
    path: '',
  
    children: [
  
      { path: 'list', component: ListComponent  },
      { path: 'create', component: AddComponent },
      { path: 'edit/:id', component: AddComponent },
      { path: '**', redirectTo: 'list' }
  
  
    ]
  } 
  
  ];

  @NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(rutas)
    ],
    exports: [
      RouterModule
    ]
  })

export class PersonaRoutingModule { }
