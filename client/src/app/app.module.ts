import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuillModule } from 'ngx-quill'
import { MatTableExporterModule,MAT_TABLE_EXPORTER} from 'mat-table-exporter';




// custom genearted modules
import { FooterComponent } from './pages/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { Counter4ReportsComponent } from './pages/reports/counter4-reports/counter4-reports.component';
import { Counter5ReportsComponent } from './pages/reports/counter5-reports/counter5-reports.component';
import { CustomReportsComponent } from './pages/reports/custom-reports/custom-reports.component';
import { StandardReportsComponent } from './pages/reports/standard-reports/standard-reports.component';
import { DataAnalyticsComponent } from './pages/reports/data-analytics/data-analytics.component';
import { UserDashboardComponent } from './pages/dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard/admin-dashboard.component';
import { PlatformComponent } from './pages/platform/platform.component';
import { UserComponent } from './pages/user/user.component';
import { UserMgmtComponent } from './pages/user/user-mgmt/user-mgmt.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { HelpdeskComponent } from './pages/helpdesk/helpdesk.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserSettingsComponent } from './pages/settings/user-settings/user-settings.component';
import { AppSettingsComponent } from './pages/settings/app-settings/app-settings.component';
import { NotificationsComponent } from './pages/settings/notifications/notifications.component';
import { SchedularComponent } from './pages/settings/schedular/schedular.component';
import { LogoutComponent } from './pages/user/logout/logout.component';
import { PlatformReportsComponent } from './pages/reports/platform-reports/platform-reports.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ExecutiveDashboardComponent } from './pages/dashboard/executive-dashboard/executive-dashboard.component';
import { RootsComponent } from './pages/roots/roots.component';
import { HelpdeskContactUsComponent } from './pages/helpdesk/helpdesk-contact-us/helpdesk-contact-us.component';
import { HelpdeskFaqComponent } from './pages/helpdesk/helpdesk-faq/helpdesk-faq.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { PlatformDetailsComponent } from './pages/platform/platform-details/platform-details.component';
import { PlatformManagementComponent } from './pages/platform/platform-management/platform-management.component';
import { PlatformReportListComponent } from './pages/platform/platform-report-list/platform-report-list.component';
import { PlatformModifierComponent } from './components/platform-modifier/platform-modifier.component';
import { UserSecurityComponent } from './pages/user/user-security/user-security.component';
import { RequestDemoComponent } from './pages/request-demo/request-demo.component';
import { ScDetailsComponent } from './pages/sc-details/sc-details.component';
import { HeaderComponent } from './pages/header/header.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
import { AccountComponent } from './pages/account/account.component';
import { MyAccountComponent } from './pages/account/my-account/my-account.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { CostAnalysisComponent } from './pages/analytics/cost-analysis/cost-analysis.component';
import { SystemComponent } from './pages/system/system.component';
import { MessageDialogComponent } from './components/dialog/message-dialog/message-dialog.component';
import { SysAdminComponent } from './pages/system/sys-admin/sys-admin.component';
import { TicketSystemComponent } from './components/ticket-system/ticket-system.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ForgotComponent,
    ReportsComponent,
    Counter5ReportsComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    CustomReportsComponent,
    StandardReportsComponent,
    DataAnalyticsComponent,
    PlatformComponent,
    UserComponent,
    UserMgmtComponent,
    UserProfileComponent,
    HelpdeskComponent,
    SettingsComponent,
    UserSettingsComponent,
    AppSettingsComponent,
    NotificationsComponent,
    SchedularComponent,
    LogoutComponent,
    Counter4ReportsComponent,
    PlatformReportsComponent,
    LineChartComponent,
    PieChartComponent,
    DataTableComponent,
    ExecutiveDashboardComponent,
    RootsComponent,
    HelpdeskContactUsComponent,
    HelpdeskFaqComponent,
    ImageUploaderComponent,
    PlatformDetailsComponent,
    PlatformReportListComponent,
    PlatformManagementComponent,
    PlatformModifierComponent,
    UserSecurityComponent,
    RequestDemoComponent,
    ScDetailsComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    AccountComponent,
    MyAccountComponent,
    AnalyticsComponent,
    CostAnalysisComponent,
    SystemComponent,
    MessageDialogComponent,
    SysAdminComponent,
    TicketSystemComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatSelectModule,
    MatFormFieldModule,
    QuillModule.forRoot(),
    QuillModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    NgbModule, // Ng BootStarp module
    MatSidenavModule,
    MatNativeDateModule,
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatTreeModule,
    MatDialogModule,
    MatDatepickerModule,
    MatStepperModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MatSnackBarModule,
    MatTooltipModule

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
