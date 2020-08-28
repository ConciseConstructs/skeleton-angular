import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToolsDatabasesPageRoutingModule } from './tools-databases-routing.module';
import { ToolsDatabasesPage } from './tools-databases.page';
import { WidgetsModule } from 'src/assets/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolsDatabasesPageRoutingModule,
    WidgetsModule
  ],
  declarations: [ToolsDatabasesPage]
})
export class ToolsDatabasesPageModule {}
