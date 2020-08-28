import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnershipPageRoutingModule } from './ownership-routing.module';

import { OwnershipPage } from './ownership.page';
import { WidgetsModule } from 'src/assets/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnershipPageRoutingModule,
    WidgetsModule
  ],
  declarations: [OwnershipPage]
})
export class OwnershipPageModule {}
