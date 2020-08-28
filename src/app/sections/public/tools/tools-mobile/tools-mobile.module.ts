import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToolsMobilePageRoutingModule } from './tools-mobile-routing.module';
import { ToolsMobilePage } from './tools-mobile.page';
import { WidgetsModule } from 'src/assets/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolsMobilePageRoutingModule,
    WidgetsModule
  ],
  declarations: [ToolsMobilePage]
})
export class ToolsMobilePageModule {}
