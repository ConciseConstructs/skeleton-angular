import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToolsPlatformsPageRoutingModule } from './tools-platforms-routing.module';
import { ToolsPlatformsPage } from './tools-platforms.page';
import { WidgetsModule } from 'src/assets/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolsPlatformsPageRoutingModule,
    WidgetsModule
  ],
  declarations: [ToolsPlatformsPage]
})
export class ToolsPlatformsPageModule {}
