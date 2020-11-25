import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PlatformComponent } from './pages/platform/platform.component';
import { UserComponent } from './pages/user/user.component';
import { HelpdeskComponent } from './pages/helpdesk/helpdesk.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { SystemComponent } from './pages/system/system.component';

const routes: Routes = [
  // menu routers
  { path: '', component: LoginComponent, data: { title: 'ScholarCounter Login' } },
  { path: 'home', component: HomeComponent, data: { title: 'ScholarCounter Home' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'ScholarCounter Dashboard' } },
  { path: 'reports', component: ReportsComponent, data: { title: 'ScholarCounter Reports' } },
  { path: 'analytics', component: AnalyticsComponent, data: { title: 'ScholarCounter Analytics' } },
  { path: 'platform', component: PlatformComponent, data: { title: 'ScholarCounter Platform' } },
  { path: 'account', component: AccountComponent, data: { title: 'ScholarCounter Account' } },
  { path: 'user', component: UserComponent, data: { title: 'ScholarCounter User' } },
  { path: 'settings', component: SettingsComponent, data: { title: 'ScholarCounter Settings' } },
  { path: 'helpdesk', component: HelpdeskComponent, data: { title: 'ScholarCounter Helpdesk' } },
  { path: 'system', component: SystemComponent, data: { title: 'ScholarCounter System' } },
  //
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
