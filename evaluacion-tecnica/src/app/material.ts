import {MatMenuModule} from '@angular/material/menu'; 


const MATERIALES = [
    MatMenuModule
]

import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MATERIALES
  ],
  exports: [
      MATERIALES
  ],
})

export class MyMaterialModule {}