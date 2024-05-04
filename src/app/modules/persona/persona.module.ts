import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './page/add/add.component';
import { ListComponent } from './page/list/list.component';
import { PersonaRoutingModule } from './persona-routing.module';




@NgModule({
  declarations: [
    AddComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PersonaRoutingModule
  ]
})
export class PersonaModule { }
