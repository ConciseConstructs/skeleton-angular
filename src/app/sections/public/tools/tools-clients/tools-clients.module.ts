import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToolsClientsPageRoutingModule } from './tools-clients-routing.module';
import { ToolsClientsPage } from './tools-clients.page';
import { WidgetsModule } from 'src/assets/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolsClientsPageRoutingModule,
    WidgetsModule
  ],
  declarations: [ToolsClientsPage]
})
export class ToolsClientsPageModule {}
