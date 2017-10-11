import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatTabsModule,
  MatTableModule,
  MatIconModule,
  MatSliderModule,
  MatSidenavModule,
  MatCardModule,
  MatInputModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { PsRootComponent } from './root.component';
import { CreateReportComponent } from './create-report.component';
import { ReportsComponent } from './reports.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    PsRootComponent,
    ReportsComponent,
    CreateReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [PsRootComponent]
})
export class PsExpensesModule { }
