import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { WidgetsModule } from '../../../../assets/widgets/widgets.module'

import { HomePageRoutingModule } from './home-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      { path: '', component: HomePage }
    ]),
    WidgetsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
