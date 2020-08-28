import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToolsServersPageRoutingModule } from './tools-servers-routing.module';
import { ToolsServersPage } from './tools-servers.page';
import { WidgetsModule } from 'src/assets/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolsServersPageRoutingModule,
    WidgetsModule
  ],
  declarations: [ToolsServersPage]
})
export class ToolsServersPageModule {}
