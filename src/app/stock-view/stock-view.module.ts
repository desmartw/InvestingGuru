import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockViewPageRoutingModule } from './stock-view-routing.module';

import { StockViewPage } from './stock-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockViewPageRoutingModule
  ],
  declarations: [StockViewPage]
})
export class StockViewPageModule {}
