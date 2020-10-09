import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes:Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./sections/public/home/home.module').then( m => m.HomePageModule) },
  { path: 'policies', loadChildren: () => import('./sections/public/policies/policies.module').then( m => m.PoliciesPageModule) },
  { path: 'dashboard', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/dashboard/dashboard.module').then( m => m.DashboardPageModule) },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
