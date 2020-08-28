import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicesMobileDetailsPageRoutingModule } from './services-mobile-details-routing.module';
import { ServicesMobileDetailsPage } from './services-mobile-details.page';
import { WidgetsModule } from 'src/assets/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesMobileDetailsPageRoutingModule,
    WidgetsModule
  ],
  declarations: [ServicesMobileDetailsPage]
})
export class ServicesMobileDetailsPageModule {}
