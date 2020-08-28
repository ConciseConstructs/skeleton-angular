import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes:Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./sections/public/home/home.module').then( m => m.HomePageModule) },
  { path: 'dashboard', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/dashboard/dashboard.module').then( m => m.DashboardPageModule) },
  { path: 'services', loadChildren: () => import('./sections/public/services/services.module').then( m => m.ServicesPageModule) },
  { path: 'tools', loadChildren: () => import('./sections/public/tools/tools.module').then( m => m.ToolsPageModule) },
  { path: 'contact', loadChildren: () => import('./sections/public/contact/contact.module').then( m => m.ContactPageModule) },
  { path: 'estimate', loadChildren: () => import('./sections/public/estimate/estimate.module').then( m => m.EstimatePageModule) },
  { path: 'payment', loadChildren: () => import('./sections/public/payment/payment.module').then( m => m.PaymentPageModule) },
  { path: 'ownership', loadChildren: () => import('./sections/public/ownership/ownership.module').then( m => m.OwnershipPageModule) },
  { path: 'policies', loadChildren: () => import('./sections/public/policies/policies.module').then( m => m.PoliciesPageModule) },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
