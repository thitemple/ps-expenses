import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatTabsModule,
  MatTableModule,
  MatIconModule,
  MatSliderModule,
  MatSidenavModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { PsRootComponent } from './root.component';
import { CreateReportComponent } from './create-report.component';
import { CreateReportItemDialogComponent } from './create-report-item.component';
import { ReportsComponent } from './reports.component';
import { AppRoutingModule } from './app-routing.module';
import { ReportDataService} from './services/reportData.service';

@NgModule({
  declarations: [
    PsRootComponent,
    ReportsComponent,
    CreateReportComponent,
    CreateReportItemDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [ReportDataService],
  bootstrap: [PsRootComponent, CreateReportItemDialogComponent]
})
export class PsExpensesModule { }
