import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesPage } from './services.page';

const routes:Routes = [
  { path: '', component: ServicesPage },
  { path: 'services-mobile-details', loadChildren: () => import('./services-mobile-details/services-mobile-details.module').then( m => m.ServicesMobileDetailsPageModule) },
  { path: 'services-websites-details', loadChildren: () => import('./services-websites-details/services-websites-details.module').then( m => m.ServicesWebsitesDetailsPageModule) }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPageRoutingModule {}
