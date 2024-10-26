import { Routes } from '@angular/router';
import { AutoComplete2Component } from './auto-complete2/auto-complete2.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

export const routes: Routes = [
  {
    path:'auto2',
    component: AutoComplete2Component
  },
  {
    path:'auto',
    component: AutoCompleteComponent
  }
];
