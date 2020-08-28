import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicesWebsitesDetailsPageRoutingModule } from './services-websites-details-routing.module';
import { ServicesWebsitesDetailsPage } from './services-websites-details.page';
import { WidgetsModule } from 'src/assets/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesWebsitesDetailsPageRoutingModule,
    WidgetsModule
  ],
  declarations: [ServicesWebsitesDetailsPage]
})
export class ServicesWebsitesDetailsPageModule {}
