import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicesPageRoutingModule } from './services-routing.module';
import { ServicesPage } from './services.page';
import { WidgetsModule } from 'src/assets/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesPageRoutingModule,
    WidgetsModule
  ],
  declarations: [ServicesPage]
})
export class ServicesPageModule {}
