import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./sections/public/home/home.module').then( m => m.HomePageModule) },
  { path: 'privacy', loadChildren: () => import('./sections/public/privacy/privacy.module').then( m => m.PrivacyPageModule) },
  { path: 'dashboard', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/dashboard/dashboard.module').then( m => m.DashboardPageModule) },
  { path: 'new', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/new/new.module').then( m => m.NewPageModule) },
  { path: 'search', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/search/search.module').then( m => m.SearchPageModule) },
  { path: 'edit-tag/:id', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/edit/edit-tag/edit-tag.module').then( m => m.EditTagPageModule) },
  { path: 'edit-question/:id', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/edit/edit-question/edit-question.module').then( m => m.EditQuestionPageModule) },
  { path: 'edit-quiz/:id', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/edit/edit-quiz/edit-quiz.module').then( m => m.EditQuizPageModule) },
  { path: 'add-questions', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/add-questions/add-questions.module').then( m => m.AddQuestionsPageModule) },
  { path: 'exam/:id', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/exam/exam.module').then( m => m.ExamPageModule) },
  { path: 'review', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/review/review.module').then( m => m.ReviewPageModule) },
  { path: 'results', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/results/results.module').then( m => m.ResultsPageModule) },
  { path: 'settings', canLoad: [SessionGuard], loadChildren: () => import('./sections/private/settings/settings.module').then( m => m.SettingsPageModule) },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
