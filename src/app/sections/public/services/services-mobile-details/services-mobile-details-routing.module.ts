import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesMobileDetailsPage } from './services-mobile-details.page';

const routes: Routes = [
  { path: '', component: ServicesMobileDetailsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesMobileDetailsPageRoutingModule {}
