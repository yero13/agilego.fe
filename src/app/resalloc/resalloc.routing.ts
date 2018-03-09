import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResAllocComponent } from '@app/resalloc/resalloc.component';

const resallocRoutes: Routes = [
  { path: 'resalloc',  component: ResAllocComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(resallocRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ResAllocRoutingModule { }
